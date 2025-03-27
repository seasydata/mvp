"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/ui/data-table";
import EmissionRecordDialog from "~/components/dashboard/EmissionRecordDialog";
import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";
import { type EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { capitalize } from "~/lib/utils";

const columns: ColumnDef<EnrichedEmissionRecord>[] = [
  {
    accessorKey: "organizationName",
    header: "Supplier",
    cell: ({ row }) => {
      const name: string = row.getValue("organizationName");
      return name ? (
        <div className="max-w-[100px] truncate" title={name}>
          {name}
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("productName")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge
          className={
            status === "requested"
              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
              : status === "fulfilled"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-blue-100 text-blue-800 hover:bg-blue-100"
          }
        >
          {capitalize(status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "CO2e",
    header: "CO2e",
    cell: ({ row }) => {
      const value = row.getValue("CO2e");
      return value ? (
        <div className="text-left font-medium">{value as number}</div>
      ) : (
        <div className="text-left text-gray-500">-</div>
      );
    },
  },
  {
    accessorKey: "calculationMethod",
    header: "Calculation Method",
    cell: ({ row }) => {
      const method = row.getValue("calculationMethod");
      return method ? (
        <div className="text-left font-medium">{method as string}</div>
      ) : (
        <div className="text-left text-gray-500">-</div>
      );
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const source: string = row.getValue("source");
      return source ? (
        <div className="xl:max-w-[300px] truncate" title={source}>
          {source}
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "consumerComment",
    header: "Consumer comment",
    cell: ({ row }) => {
      const comment: string = row.getValue("consumerComment");
      return comment ? (
        <div
          className="lg-and-up:max-w-[250px] truncate"
          title={comment}
        >
          {comment}
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "producerComment",
    header: "Producer comment",
    cell: ({ row }) => {
      const producerComment: string = row.getValue("producerComment");
      return producerComment ? (
        <div
          className="lg:max-w-[250px] xl:max-w-[250px] truncate"
          title={producerComment}
        >
          {producerComment}
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "recordDate",
    header: "Date recorded",
    cell: ({ row }) => {
      const date = row.getValue("recordDate");  
      return date ? (
        <div className="text-sm text-gray-500">
          {new Date(date as string).toLocaleDateString()}
        </div>
      ) : null;
    },
  },
];

const requestedColumns = columns.filter(
  (column) => ["organizationName", "productName", "consumerComment", "recordDate"].includes(column.accessorKey)
);


const fulfilledColumns = columns.filter(
  (column) => ["organizationName", "productName", "CO2e", "calculationMethod", "source", "consumerComment", "producerComment", "recordDate"].includes(column.accessorKey)
);

export default function EmissionRecords({
  emissionRecords,
  purchaseRecords,
}: {
  emissionRecords: EnrichedEmissionRecord[];
  purchaseRecords: EnrichedPurchaseRecord[];
}) {
  emissionRecords.sort((a, b) => {
    if (a.organizationName < b.organizationName) return -1;
    else if (a.organizationName > b.organizationName) return 1;
    else if (a.status == "fulfilled") return -1;
    else if (b.status == "fulfilled") return 1;
    else return 0;
  });

  const requestedRecords = emissionRecords.filter(
    (record) => record.status === "requested",
  );
  const fulfilledRecords = emissionRecords.filter(
    (record) => record.status === "fulfilled",
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4">
        <h2 className="text-xl font-semibold text-cyan-900">
          Emission Records
        </h2>
        <EmissionRecordDialog purchaseRecords={purchaseRecords} />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 text-xs">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-blue-100"
          >
            All ({emissionRecords.length})
          </TabsTrigger>
          <TabsTrigger
            value="requested"
            className="data-[state=active]:bg-amber-100"
          >
            Requested ({requestedRecords.length})
          </TabsTrigger>
          <TabsTrigger
            value="fulfilled"
            className="data-[state=active]:bg-green-100"
          >
            Fulfilled ({fulfilledRecords.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="overflow-x-auto">
            {emissionRecords.length > 0 ? (
              <DataTable columns={columns} data={emissionRecords} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                No emission records records found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="requested" className="mt-0">
          <div className="overflow-x-auto">
            {requestedRecords.length > 0 ? (
              <DataTable columns={requestedColumns} data={requestedRecords} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                No requested emission records found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="fulfilled" className="mt-0">
          <div className="overflow-x-auto">
            {fulfilledRecords.length > 0 ? (
              <DataTable columns={fulfilledColumns} data={fulfilledRecords} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                No fulfilled emission records found
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
