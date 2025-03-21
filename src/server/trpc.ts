import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context";
import { currentUser } from "@clerk/nextjs/server";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthed = t.middleware(async ({next, ctx}) => {

  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new Error("No active Clerk session");
  }
  return next({ctx: {user: clerkUser, supabase: ctx.supabase}})
})

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed)