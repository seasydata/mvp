"use server";

import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";
import EmissionRecords from "./emissionrecords";
import PurchaseRecords from "./purchaserecords";
import { helper } from "@/app/_trpc/helper";
import { type EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import Stats from "./stats";

export default async function Dashboard() {
  const emissionRecords: EnrichedEmissionRecord[] =
    await helper.emissionRecord.getFiltered.fetch();
  const purchaseRecords: EnrichedPurchaseRecord[] =
    await helper.purchaseRecord.getFiltered.fetch();

  return (
    <div className="max-w-screen flex min-h-screen flex-col text-cyan-900 pb-10 font-sans text-2xl">
      <Stats
        emissionRecords={emissionRecords}
        purchaseRecords={purchaseRecords}
      />
      <EmissionRecords
        emissionRecords={emissionRecords}
        purchaseRecords={purchaseRecords}
      />
      <PurchaseRecords purchaseRecords={purchaseRecords} />
    </div>
  );
}
