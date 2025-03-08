import { z } from "zod";
import { publicProcedure, protectedProcedure, createTRPCRouter } from "../../trpc";
import type {EmissionRecord} from "~/server/types";

export const emissionRecordRouter = createTRPCRouter({

  getAll: publicProcedure
  .query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.from("EmissionRecord").select();
    if (error) {
      throw new Error(error.message);
    }
    return data as EmissionRecord[];
  }),

  create: publicProcedure
  .input(z.object({
    status: z.enum(["fulfilled", "draft", "requested"]).default("draft"),
    productId: z.string(),
    quantityValue: z.number(),
    quantityUnit: z.string(),
    recordDate: z.string(),
  }))
  .mutation(async({ctx, input}) => {

  // Ensure the productId is provided
  if (!input.productId) {
    throw new Error("Product ID is required");
  }

  // Check if the recordDate is in the future
  const recordDate = new Date(input.recordDate);
  const currentDate = new Date();
  
  if (recordDate > currentDate && input.status === "fulfilled") {
    throw new Error("Record date cannot be in the future for fulfilled records");
  }

  // Ensure quantityValue and quantityUnit are filled out for fulfilled status
  if (input.status === "fulfilled") {
    if (!input.quantityValue || !input.quantityUnit) {
      throw new Error("Quantity value and unit are required for fulfilled status");
    }
  }
    const {data, error} = await ctx.supabase.from("EmissionRecord").insert(input);
  })

});
