import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "../../trpc";
import type { PurchaseRecord } from "~/server/types";
import { TRPCError } from "@trpc/server";

export type EnrichedPurchaseRecord = PurchaseRecord & {
  organizationName: string;
  organizationId: string;
  productId: string;
  productName: string;
  description: string;
};

export const purchaseRecordRouter = createTRPCRouter({

  getFiltered: protectedProcedure.query(async ({ ctx }) => {
    // const { data: supaUser, error: userError } = await ctx.supabase
    //   .from("User")
    //   .select("id, authId, UserOrganization!userId(organizationId)")
    //   .eq("authId", ctx.auth.userId)
    //   .single();
    // if (!supaUser || userError) {
    //   throw new Error(userError.message);
    // }

    const { data: organizations, error: organizationsError } =
      await ctx.supabase
        .from("Organization")
        .select(
          `
          organizationId, 
          UserOrganization!inner(
            User!inner(authId)
          ),
          OrgRelation!inner!customerOrgId(supplierOrgId)`,
        )
        .eq("UserOrganization.User.authId", ctx.auth.userId)
        .returns<{ organizationId: string; OrgRelation: { supplierOrgId: string }[] }[]>();
    if (!organizations || organizationsError) {
      throw new Error(organizationsError.message);
    }
    // eslint-disable-next-line no-use-before-define
    const orgIds = organizations.map((organization) =>
      organization.OrgRelation.map((relation: { supplierOrgId: string }) => relation.supplierOrgId)// eslint-disable-line

    );
    const flatIds = orgIds.flat();

    const { data: purchaseRecords, error: purchaseRecordsError } = await ctx.supabase
      .from("PurchaseRecord")
      .select(`
      *,
      ...Product!inner(productId, productName, description,
        ...Organization!inner(organizationId, organizationName)
        )`)
      .in("Product.Organization.organizationId", flatIds)
      .returns();
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
        .single<{ organizationId: string; UserOrganization: { userId: string, User: { authId: string } } }>()
      if (orgError) {
        throw new TRPCError({ message: orgError.message, code: 'INTERNAL_SERVER_ERROR' })
      }

      const completeInput = input.map((record) => ({ ...record, customerOrgId: orgData.organizationId })) // eslint-disable-line


      // const { data, error } = await ctx.supabase
      //   .from("PurchaseRecord")
      //   .insert(input);
      // if (error) {
      //   throw new Error(error.message);
      // }
      // return data;
    }),
});
