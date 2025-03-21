"use server";

import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";
import EmissionRecords from "./emissionrecords";
import PurchaseRecords from "./purchaserecords";
import { getHelper, } from "@/app/_trpc/helper";
import { type EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import Stats from "./stats";

import { type EnrichedProduct } from "~/server/api/routers/products";
import { type Organization } from "~/server/types";

export default async function Dashboard() {
  const helper = await getHelper();
  const emissionRecords: EnrichedEmissionRecord[] = await helper.emissionRecord.getFiltered.fetch();
  const purchaseRecords: EnrichedPurchaseRecord[] = await helper.purchaseRecord.getFiltered.fetch();
  const organizations: Organization[] = await helper.organization.getSuppliers.fetch();
  const products: EnrichedProduct[] = await helper.product.getFiltered.fetch();
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
      <PurchaseRecords
        purchaseRecords={purchaseRecords}
        organizations={organizations}
        products={products}
      />
    </div>
  );
}
