import { createContext } from "../../server/context";
import { appRouter } from "../../server/api/routers/_app";
import { t } from "../..//server/trpc";

const createCaller = t.createCallerFactory(appRouter);
export const serverClient = createCaller(await createContext());