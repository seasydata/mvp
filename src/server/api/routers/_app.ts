import { emissionRecordRouter } from "./emissionrecords";
import { purchaseRecordRouter } from "./purchaserecords";
import {
  createTRPCRouter,
  createCallerFactory,
} from "../../trpc";
import { organizationRouter } from "./organizations";
import { productRouter } from "./products";

export const appRouter = createTRPCRouter({
  emissionRecord: emissionRecordRouter,
  purchaseRecord: purchaseRecordRouter,
  organization: organizationRouter,
  product: productRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
