'use server'
import { createServerSideHelpers } from "@trpc/react-query/server";
import { SuperJSON } from "superjson";
import { appRouter } from "~/server/api/routers/_app";
import { supabase } from "~/server/supabase";
import { auth } from '@clerk/nextjs/server'

export async function getHelper() {
  const helper = createServerSideHelpers({
    router: appRouter,
    ctx: { supabase: supabase, auth: await auth() }, // Pass your Supabase instance
    transformer: SuperJSON,

  });
  return helper
}



