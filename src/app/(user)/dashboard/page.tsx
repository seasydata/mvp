"use server";

import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";
import EmissionRecords from "./emissionrecords";
import PurchaseRecords from "./purchaserecords";
import { getHelper } from "@/app/_trpc/helper";
import { type EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import Stats from "./stats";

import { type EnrichedProduct } from "~/server/api/routers/products";
import { type Organization } from "~/server/types";

export default async function Dashboard() {
  const helper = await getHelper();
  const emissionRecords: EnrichedEmissionRecord[] =
    await helper.emissionRecord.getFiltered.fetch();
  const purchaseRecords: EnrichedPurchaseRecord[] =
    await helper.purchaseRecord.getFiltered.fetch();
  const organizations: Organization[] =
    await helper.organization.getSuppliers.fetch();
  const products: EnrichedProduct[] = await helper.product.getFiltered.fetch();
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-cyan-900 mb-8">Dashboard</h1>

      <div className="grid gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <Stats
            emissionRecords={emissionRecords}
            purchaseRecords={purchaseRecords}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <EmissionRecords
            emissionRecords={emissionRecords}
            purchaseRecords={purchaseRecords}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <PurchaseRecords
            purchaseRecords={purchaseRecords}
            organizations={organizations}
            products={products}
          />
        </div>
      </div>
    </div>
  );
}
