import { publicProcedure, createTRPCRouter, protectedProcedure } from "../../trpc";
import type { Organization, Product } from "~/server/types";

export type EnrichedProduct = Product & {
  Organization: Pick<Organization, "name" | "id">;
};


export const productRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
    .from("Product").select();
    if (error) {
      throw new Error(error.message);
    }
    return data as Product[];
  }),

  getFiltered: publicProcedure.query(async({ctx}) => {
    const {data, error} = await ctx.supabase
    .from("OrgRelation")
    .select(`customerOrgId, supplierOrgId`)
    .eq('customerOrgId', "46cb01fa-e136-4de3-ab3f-074a244c88eb");
    if (error) {
      throw new Error(error.message);
    }

    const supplierIds = data?.map(relation => relation.supplierOrgId) ?? [];

    if (supplierIds.length > 0) {
        const {data: products, error: productsError} = await ctx.supabase
        .from("Product")
        .select(`
          *,
          Organization(name)
          `)
        .in("organizationId", supplierIds);
        if (productsError) {
            console.error("Failed to fetch products from suppliers", productsError);
        } else {
            return products as EnrichedProduct[]; 
        }
    }
    return [] as EnrichedProduct[];
  })
});
