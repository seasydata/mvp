"use server";

import Pending from "./pending"
import Purchased from "./purchased"

import type { EmissionRecord } from "~/server/types";
import type { EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import { helper } from "@/app/_trpc/helper"

export default async function Dashboard() {
  const pendingRecords: EmissionRecord[] = await helper.emissionRecord.getAll.fetch();
  const purchaseRecords: EnrichedPurchaseRecord[] = await helper.purchaseRecord.getFiltered.fetch();

  return (
    <div className='max-w-screen flex min-h-screen flex-col text-cyan-900 pb-10 font-sans text-2xl'>
      <Pending records={pendingRecords} />
      <Purchased records={purchaseRecords} />
    </div>
  );
}
