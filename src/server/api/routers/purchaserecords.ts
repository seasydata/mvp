import { z } from "zod";
import {
  publicProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "../../trpc";
import type { PurchaseRecord, Organization, Product } from "~/server/types";
import { TRPCError } from "@trpc/server";

export type EnrichedPurchaseRecord = PurchaseRecord & {
  organizationName: string;
  organizationCountry: string;
  productId: string;
  productName: string;
  description: string;
};

export const purchaseRecordRouter = createTRPCRouter({

  getFiltered: protectedProcedure.query(async ({ ctx }) => {
    const { data: supaUser, error: userError } = await ctx.supabase
      .from("User")
      .select("id, authId, UserOrganization!userId(organizationId)")
      .eq("authId", ctx.user.id)
      .single();
    if (!supaUser || userError) {
      throw new Error(userError.message);
    }

    const { data: purchaseRecords, error: purchaseRecordsError } = await ctx.supabase
      .from("PurchaseRecord")
      .select(
        `
      *,
      ...Product!inner (
         productId, productName, description,
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
    if (purchaseRecordsError) {
      throw new Error(purchaseRecordsError.message);
    }

    return purchaseRecords as EnrichedPurchaseRecord[];
  }),

  // TODO: Needs further validation so that only purchaserecords with valid
  // product/supplier ids can be created
  create: protectedProcedure
    .input(
      z
        .object({
          supplierOrgId: z.string(),
          productId: z.string(),
          quantity: z.number(),
          purchaseDate: z.string(),
          comment: z.string(),
        })
        .array(),
    )
    .mutation(async ({ ctx, input }) => {

      const { data: orgData, error: orgError } = await ctx.supabase
        .from("Organization")
        .select("organizationId, UserOrganization!inner!organizationId(userId, User!inner!userId(authId))")
        .eq("UserOrganization.User.authId", ctx.auth.userId)
        .single()
      if (orgError) {
        throw new TRPCError({ message: orgError.message, code: 'INTERNAL_SERVER_ERROR' })
      }

      console.log(orgData)
      const completeInput = input.map((record) => ({ ...record, customerOrgId: orgData.organizationId }))
      console.log(completeInput)

      // const { data, error } = await ctx.supabase
      //   .from("PurchaseRecord")
      //   .insert(input);
      // if (error) {
      //   throw new Error(error.message);
      // }
      // return data;
    }),
});
