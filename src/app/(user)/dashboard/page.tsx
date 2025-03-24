"use client";

import EmissionRecords from "./emissionrecords";
import PurchaseRecords from "./purchaserecords";
import { helper } from "~/app/_trpc/helper";
import { type EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import Stats from "./stats";
import { trpc } from "~/server/api/trpc/client";
import InternalError from "~/app/internal-error";
import Skeleton from "@mui/material/Skeleton";

export default function Dashboard() {

  const { data: emissionRecords = [], isLoading: emissionLoading, isError: emissionError } = trpc.emissionRecord.getFiltered.useQuery();
  const { data: purchaseRecords = [], isLoading: purchaseLoading, isError: purchaseError } = trpc.purchaseRecord.getFiltered.useQuery();
  const { data: organizations = [], isLoading: organizationLoading, isError: organizationError } = trpc.organization.getSuppliers.useQuery();
  const { data: products = [], isLoading: productLoading, isError: productError } = trpc.product.getFiltered.useQuery();

  if (emissionError || purchaseError || organizationError || productError) {
    return InternalError()
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-full sm:max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-cyan-900 mb-6 sm:mb-8">
        Dashboard
      </h1>

      <div className="grid gap-6 sm:gap-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 overflow-hidden">
          {emissionLoading || purchaseLoading ? (
            <Skeleton height={200} />
          ) : (
            <Stats
              emissionRecords={emissionRecords}
              purchaseRecords={purchaseRecords}
            />
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 overflow-hidden">
          {emissionLoading || purchaseLoading ? (
            <Skeleton height={200} />
          ) : (
            <EmissionRecords
              emissionRecords={emissionRecords}
              purchaseRecords={purchaseRecords}
            />
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 overflow-hidden">
          {purchaseLoading || organizationLoading || productLoading ? (
            <Skeleton height={200} />
          ) : (
            <PurchaseRecords
              purchaseRecords={purchaseRecords}
              organizations={organizations}
              products={products}
            />
          )}
        </div>
      </div>
    </div>
  );
}
