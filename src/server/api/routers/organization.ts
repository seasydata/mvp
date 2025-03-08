import { publicProcedure, createTRPCRouter, protectedProcedure } from "../../trpc";
import type { Organization, OrgRelation } from "~/server/types";

export type EnrichedOrganization = OrgRelation & {
  Organization: Pick<Organization, "name" | "organizationNumber">;
};


export const organizationRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
    .from("Organization").select();
    if (error) {
      throw new Error(error.message);
    }
    return data as Organization[];
  }),

  getFiltered: publicProcedure.query(async({ctx}) => {
    const {data, error} = await ctx.supabase
    .from("OrgRelation")
    .select(`
      *,
      Organization!supplierOrgId(name, organizationNumber)
    `);
    // .eq('customerOrgId', ctx.orgId);
    if (error) {
      throw new Error(error.message);
    }
    return data as EnrichedOrganization[];
  })
});
