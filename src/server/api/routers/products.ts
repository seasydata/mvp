import { currentUser } from "@clerk/nextjs/server";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../../trpc";
import type { Organization, OrgRelation, Product, User, UserOrganization } from "~/server/types";

export type EnrichedProduct = Product & {
  Organization: Pick<Organization, "name" | "id">,
  Supplier: Pick<Organization, "id" | "name">;
  OrgRelation: Pick<OrgRelation, "supplierOrgId" | "customerOrgId">;
  Customer: Pick<Organization, "id" | "name">;
  UserOrganization: Pick<UserOrganization, "userId" | "organizationId">;
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
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("No active Clerk session");
    }
    
    const {data: supaUser, error: userError} = await ctx.supabase
    .from("User")
    .select("*")
    .eq("authId", clerkUser.id)
    .single<User>();
    if (!supaUser || userError) {
      throw new Error("User not activated")
    }
    
    const { data: products, error: queryError } = await ctx.supabase
      .from("Product")
      .select(`
        *, Supplier:Organization!inner!organizationId(
        *, OrgRelation!inner!supplierOrgId(
        *, Customer:Organization!inner!customerOrgId(
        *, UserOrganization!inner!organizationId(
        *))))
      `)
      .eq("Supplier.OrgRelation.Customer.UserOrganization.userId", supaUser.id)

    if (queryError) {
      throw new Error(queryError.message);
    }
    return products as EnrichedProduct[];
  })
});
