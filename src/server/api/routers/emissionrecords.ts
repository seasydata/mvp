import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../../trpc";
import type { CreateEmissionRecord, EmissionRecord } from "~/server/types";
import { Resend } from "resend";
import { TRPCError } from "@trpc/server";

export type EnrichedEmissionRecord = EmissionRecord & {
  productId: string;
  productName: string;
  organizationName: string;
};

export const emissionRecordRouter = createTRPCRouter({
  getSingle: protectedProcedure
    .input(z.object({ emissionRecordId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { data: emissionRecordData, error: emissionRecordError } =
        await ctx.supabase
          .from("EmissionRecord")
          .select(
            `*, ...Product(productId, productName, ...Organization(organizationName))`,
          )
          .eq("emissionId", input.emissionRecordId)
          .single<EnrichedEmissionRecord>();
      if (emissionRecordError) {
        throw new TRPCError({
          message: emissionRecordError.message,
          code: "NOT_FOUND",
        });
      }
      return emissionRecordData;
    }),

  getFiltered: protectedProcedure.query(async ({ ctx }) => {
    const { data: supaUser, error: userError } = await ctx.supabase
      .from("User")
      .select("id, authId, UserOrganization(organizationId)")
      .eq("authId", ctx.auth.userId)
      .single();
    if (!supaUser || userError) {
      throw new Error("User not activated");
    }
    const userOrgIds = supaUser.UserOrganization.map(
      (userOrg: { organizationId: string }) => userOrg.organizationId,
    );
    console.log(userOrgIds);

    const { data: organizations, error: organizationsError } =
      await ctx.supabase
        .from("Organization")
        .select(
          `
        organizationId, 
        OrgRelation!inner!supplierOrgId(customerOrgId)
        `,
        )
        .in("OrgRelation.customerOrgId", userOrgIds)
        .returns<{ organizationId: string; OrgRelation: never }[]>();
    if (!organizations || organizationsError) {
      throw new Error(organizationsError.message);
    }
    const orgIds = organizations.map(
      (organization: { organizationId: string }) => organization.organizationId,
    );
    console.log(orgIds);

    const { data: emissionRecords, error } = await ctx.supabase
      .from("EmissionRecord")
      .select(
        `
      *,
      ...Product!inner (
        productName,
        productId,
      ...Organization!inner(organizationId, organizationName)
      )`,
      )
      .in("Product.Organization.organizationId", orgIds);

    if (error) {
      throw new TRPCError({ message: error.message, code: "NOT_FOUND" });
    }

    return emissionRecords as EnrichedEmissionRecord[];
  }),

  create: protectedProcedure
    .input(
      z
        .object({
          productId: z.string(),
          status: z
            .string()
            .pipe(z.enum(["fulfilled", "draft", "requested"]))
            .default("draft"),
          recordDate: z.string().datetime(),
          source: z.string().nullable(),
          CO2e: z.number(),
          calculationMethod: z
            .string()
            .pipe(z.enum(["AR4", "AR5", "AR6"]))
            .nullable(),
          comment: z.string().nullable(),
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
          .map((record: CreateEmissionRecord) => record.productId);

        // console.log(requestedProductIds)

        const { data: emailData, error: emailError } = await ctx.supabase
          .from("Product")
          .select(
            `
        productId, productName, Organization(email, organizationName)
        `,
          )
          .in("productId", requestedProductIds)
          .returns<
            {
              productId: string;
              productName: string;
              Organization: { email: string; organizationName: string };
            }[]
          >();

        if (emailError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch contact emails.",
            cause: emailError,
          });
        }

        const testHTML = newEmissionRecords
          .map((record: EmissionRecord) => {
            const emailObj = emailData.find(
              (email) => email.productId === record.productId,
            );
            if (emailObj) {
              return `<p>Please submit your data at the following link: 
          <a href="https://seasydata.com/submit-data/${record.id}">Submit Data</a>
          </p>`;
            }
            return null;
          })
          .filter(Boolean);

        return testHTML;

        // const resend = new Resend(process.env.RESEND_API_KEY);

        // await Promise.all(
        //   newEmissionRecords.map(async (record: EmissionRecord) => {
        //     const emailObj: {
        //       id: string;
        //       name: string;
        //       Organization: { email: string };
        //     } = emailData.find((email) => email.id === record.productId);
        //     if (emailObj) {
        //       await resend.emails.send({
        //         from: "no-reply@seasydata.com",
        //         to: emailObj.Organization.email,
        //         subject: `Request for emission records on product ${emailObj.name}`,
        //         html: `<p>Please submit your data at the following link:
        //               <a href="https://seasydata.com/submit-data/${record.id}">Submit Data</a>
        //           </p>`,
        //       });
        //     }
        //   }),
        // );
      }
    }),
});
