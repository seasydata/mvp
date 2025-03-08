import { z } from "zod";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../../trpc";
import type { PurchaseRecord, Organization, Product } from "~/server/types";

export type EnrichedPurchaseRecord = PurchaseRecord & {
    Organization: Pick<Organization, "name" | "country">;  // Only pick 'id' and 'name' from Organization
    Product: Pick<Product, "name" | "description">;            // Only pick 'id' and 'name' from Product
  };

export const purchaseRecordRouter = createTRPCRouter({

  getAll: publicProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.from("PurchaseRecord").select();
    if (error) {
      throw new Error(error.message);
    }
    return data as PurchaseRecord[];
  }),

  getFiltered: publicProcedure.query(async ({ctx}) => {
    const {data, error} = await ctx.supabase
    .from('PurchaseRecord')
    .select(`
        *,
        Product(name, description),
        Organization!supplierOrgId(name, country)
    `)
    // .eq('customerOrgId', ctx.orgId); // Filter on customerOrgId
    if (error) {
        throw new Error(error.message);
    }
    return data as EnrichedPurchaseRecord[];
  }),

  // TODO: Needs further validation so that only purchaserecords with valid 
  // product/supplier ids can be created
  create: publicProcedure
    .input(z.object({
      supplierOrgId: z.string(),
      customerOrgId: z.string(),
      productId: z.string(),
      quantityValue: z.number(),
      quantityUnit: z.string(),
      purchaseDate: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase.from("PurchaseRecord").insert(input);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }),

});
