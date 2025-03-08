import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context";

export const createTRPCContext = async () => {

  return { supabase: supabase, auth: await auth()};
};

const t = initTRPC.context< Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthed = t.middleware(({next, ctx}) => {
  // console.log(ctx)
  if (!ctx.auth.userId) {
    throw new TRPCError({code: 'UNAUTHORIZED'})
  }
  return next({ctx: {auth: ctx.auth, supabase: ctx.supabase}})
})

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed)