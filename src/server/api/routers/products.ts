import { currentUser } from "@clerk/nextjs/server";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import type { Product } from "~/server/types";

export type EnrichedProduct = Product & {
  organizationName: string;
  organizationId: string;
};

export const productRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.from("Product").select();
    if (error) {
      throw new Error(error.message);
    }
    return data as Product[];
  }),

  getFiltered: protectedProcedure.query(async ({ ctx }) => {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("No active Clerk session");
    }

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
        .eq("UserOrganization.User.authId", clerkUser.id)
        .returns<{ organizationId: string; OrgRelation: { supplierOrgId: string }[] }[]>();
    if (!organizations || organizationsError) {
      throw new Error(organizationsError.message);
    }
    // eslint-disable-next-line no-use-before-define
    const orgIds = organizations.map((organization) =>
      organization.OrgRelation.map((relation: { supplierOrgId: string }) => relation.supplierOrgId)// eslint-disable-line

    );
    const flatIds = orgIds.flat();

    const { data: products, error: queryError } = await ctx.supabase
      .from("Product")
      .select(
        `
        *, 
        ...Organization!inner(organizationId, organizationName)
      `,
      )
      .in("Organization.organizationId", flatIds);
    if (queryError) {
      throw new Error(queryError.message);
    }
    return products as EnrichedProduct[];
  }),
});
