"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/dashboard/data-table";
import EmissionRecordDialog from "~/components/dashboard/EmissionRecordDialog";
import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";
import { type EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
const columns: ColumnDef<EnrichedEmissionRecord>[] = [
  {
    accessorKey: "productName",
    header: "Product"
  },
  {
    accessorKey: "recordDate",
    header: "Date recorded",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "CO2e",
    header: "CO2e",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    accessorKey: "organizationName",
    header: "Supplier",
  },
];

export default function EmissionRecords(
  { emissionRecords, purchaseRecords }: {
    emissionRecords: EnrichedEmissionRecord[],
    purchaseRecords: EnrichedPurchaseRecord[]
  }) {

  return (
    <>
      <div className="flex flex-row items-center space-x-10  pt-10">
        <div className="font-bold">EMISSION RECORDS</div>
        <div>
          <EmissionRecordDialog purchaseRecords={purchaseRecords} />
        </div>

      </div>

      <div className="pt-10 flex flex-col gap-10">
        <div>
          <div className="pb-5">Requested</div>
          <DataTable
            columns={columns}
            data={emissionRecords.filter(
              (record) => record.status == "requested",
            )}
          />
        </div>
        <div>
          <div>Completed</div>
          <DataTable
            columns={columns}
            data={emissionRecords.filter(
              (record) => record.status == "completed",
            )}
          />
        </div>
        <div>
          <div>Drafts</div>
          <DataTable
            columns={columns}
            data={emissionRecords.filter((record) => record.status == "draft")}
          />
        </div>
      </div>
    </>
  );
}
