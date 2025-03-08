import { auth } from "@clerk/nextjs/server";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { SuperJSON } from "superjson";
import { appRouter } from "~/server/api/routers/_app";
import { supabase } from "~/server/supabase";

export const helper =   createServerSideHelpers({
    router: appRouter,
    ctx: { supabase }, // Pass your Supabase instance
    transformer: SuperJSON,
      

  });