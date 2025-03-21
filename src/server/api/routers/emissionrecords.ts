import { z } from "zod";
import { publicProcedure, protectedProcedure, createTRPCRouter } from "../../trpc";
import type {
  EmissionRecord,
} from "~/server/types";
import { currentUser } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { TRPCError } from "@trpc/server";

export type EnrichedEmissionRecord = EmissionRecord & {
  productId: string;
  productName: string;
  organizationName: string;
}

export const emissionRecordRouter = createTRPCRouter({
  getSingle: publicProcedure
    .input(z.object({ emissionRecordId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { data: emissionRecordData, error: emissionRecordError } = await ctx.supabase
        .from("EmissionRecord")
        .select(`*, ...Product(productId, productName, ...Organization(organizationName))`)
        .eq("id", input.emissionRecordId)
        .single();
      if (emissionRecordError) {
        throw new TRPCError({ message: emissionRecordError.message, code: "NOT_FOUND" });
      }
      return emissionRecordData as EnrichedEmissionRecord;
    }),

  getFiltered: protectedProcedure.query(async ({ ctx }) => {
    const { data: supaUser, error: userError } = await ctx.supabase
      .from("User")
      .select("id, authId")
      .eq("authId", ctx.user.id)
      .single();
    if (!supaUser || userError) {
      throw new Error("User not activated");
    }

    const { data: emissionRecords, error } = await ctx.supabase
      .from("EmissionRecord")
      .select(
        `
      *,
      ...Product!inner (
        productName, productId,
        ...Organization!inner (
          organizationName,
          OrgRelation!inner!supplierOrgId (
            supplierOrgId,
            customerOrgId,
            Organization!inner!customerOrgId (
              UserOrganization!inner (
                userId
              )
            )
          )
        )
      )
    `,
      )
      .eq(
        "Product.Organization.OrgRelation.Organization.UserOrganization.userId",
        supaUser.id,
      );

    if (error) {
      throw new TRPCError({ message: error.message, code: "NOT_FOUND" })
    }

    return emissionRecords as EnrichedEmissionRecord[];
  }),

  create: publicProcedure
    .input(
      z
        .object({
          productId: z.string(),
          status: z.enum(["fulfilled", "draft", "requested"]).default("draft"),
          recordDate: z.date().optional(),
          source: z.string().optional(),
          CO2e: z.number().optional(),
          calculationMethod: z.enum(["AR4", "AR5", "AR6"]).optional(),
          comment: z.string().optional(),
        })
        .array(),
    )
    .mutation(async ({ ctx, input }) => {
      // Insert EmissionRecords into Supabase, then collect ids from response.
      // Use ids to populate email links
      const { data: newEmissionRecords, error: newEmissionRecordsError } =
        await ctx.supabase.from("EmissionRecord").insert(input).select();

      if (newEmissionRecordsError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create new emission records.",
          cause: newEmissionRecordsError,
        });
      } else {
        // Remove draft productIds before generating emails
        const requestedProductIds = input
          .filter((record) => record.status == "requested")
          .map((record: EmissionRecord) => record.productId);

        // console.log(requestedProductIds)

        const { data: emailData, error: emailError } = await ctx.supabase
          .from("Product")
          .select(
            `
        productId, productName, Organization(email, organizationName)
        `,
          )
          .in("productId", requestedProductIds);

        if (emailError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch contact emails.",
            cause: emailError,
          });
        }

        const testHTML = newEmissionRecords
          .map((record: EmissionRecord) => {
            const emailObj: {
              productId: string;
              productName: string;
              Organization: { email: string, organizationName: string };
            } = emailData.find((email) => email.productId === record.productId);
            if (emailObj) {
              return `<p>Please submit your data at the following link: 
          <a href="https://seasydata.com/submit-data/${record.id}">Submit Data</a>
          </p>`;
            }
            return null;
          })
          .filter(Boolean);

        return testHTML;

        const resend = new Resend(process.env.RESEND_API_KEY);

        await Promise.all(
          newEmissionRecords.map(async (record: EmissionRecord) => {
            const emailObj: {
              id: string;
              name: string;
              Organization: { email: string };
            } = emailData.find((email) => email.id === record.productId);
            if (emailObj) {
              await resend.emails.send({
                from: "no-reply@seasydata.com",
                to: emailObj.Organization.email,
                subject: `Request for emission records on product ${emailObj.name}`,
                html: `<p>Please submit your data at the following link: 
                      <a href="https://seasydata.com/submit-data/${record.id}">Submit Data</a>
                  </p>`,
              });
            }
          }),
        );
      }
    }),
});
