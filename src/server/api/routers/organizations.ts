import { currentUser } from "@clerk/nextjs/server";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../../trpc";
import type { Organization, OrgRelation, User } from "~/server/types";

export type EnrichedOrganization = Organization


export const organizationRouter = createTRPCRouter({

  getAll: publicProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from("Organization").select();
    if (error) {
      throw new Error(error.message);
    }
    return data as Organization[];
  }),

  getFiltered: publicProcedure.query(async ({ ctx }) => {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("No active Clerk session");
    }

    const { data: supaUser, error: userError } = await ctx.supabase
      .from("User")
      .select("*")
      .eq("authId", clerkUser.id)
      .single<User>();
    if (!supaUser || userError) {
      throw new Error("User not activated")
    }

    const { data, error } = await ctx.supabase
      .from("OrgRelation")
      .select(`
      *,
      ...Organization!inner!supplierOrgId(*),
      customer:Organization!inner!customerOrgId(UserOrganization!inner(userId))
    `)
      .eq('customer.UserOrganization.userId', supaUser.id);
    if (error) {
      throw new Error(error.message);
    }
    return data as EnrichedOrganization[];
  })
});
