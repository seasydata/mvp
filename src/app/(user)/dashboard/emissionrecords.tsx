"use server";
import Stats from "./stats";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/dashboard/data-table";
import type { EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import type { EmissionRecord } from "~/server/types";
import { helper } from "~/app/_trpc/helper";
import EmissionRecordDialog from "~/components/dashboard/EmissionRecordDialog";
import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";

const columns: ColumnDef<EnrichedEmissionRecord>[] = [
  {
    accessorKey: "productId",
    header: "Product",
  },
  {
    accessorKey: "recordDate",
    header: "Date recorded",
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
  // {
  //     accessorKey: "productName",
  //     header: "Product"
  // }
];

export default async function EmissionRecords() {
  const emissionRecords: EmissionRecord[] =
    await helper.emissionRecord.getAll.fetch();

  const purchaseRecords: EnrichedPurchaseRecord[] =
    await helper.purchaseRecord.getFiltered.fetch();
  const transformedRecords = purchaseRecords.map((purchaseRecord) => ({
    ...purchaseRecord,
    productName: purchaseRecord.Product.name,
    productDescription: purchaseRecord.Product.description,
    supplierName: purchaseRecord.Organization.name,
    supplierCountry: purchaseRecord.Organization.country,
    purchaseDate: purchaseRecord.purchaseDate.slice(0, 10),
  }));
  return (
    <>
      <div className="flex flex-row items-center space-x-10  pt-10">
        <div className="font-bold">EMISSION RECORDS</div>
        <div>
          <EmissionRecordDialog purchaseRecords={transformedRecords} />
        </div>
        <Stats />
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
