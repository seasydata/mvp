import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthed = t.middleware(async ({ next, ctx }) => {
  console.log(ctx.auth.userId)
  if (!ctx.auth.userId) { throw new TRPCError({ code: 'UNAUTHORIZED' }) }

  return next({ ctx: { auth: ctx.auth, supabase: ctx.supabase } })
})

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed)