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
        <div className="max-w-[100px] sm:max-w-[150px] truncate" title={name}>
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
        <div className="sm:max-w-[200px] xl:max-w-[300px] truncate" title={source}>
          {source}
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const comment: string = row.getValue("comment");
      return comment ? (
        <div
          className=" sm:max-w-[200px] lg:max-w-[250px] xl:max-w-[250px] truncate"
          title={comment}
        >
          {comment}
        </div>
      ) : null;
    },
  },
];

export default function EmissionRecords({
  emissionRecords,
  purchaseRecords,
}: {
  emissionRecords: EnrichedEmissionRecord[];
  purchaseRecords: EnrichedPurchaseRecord[];
}) {
  emissionRecords.sort((a, b) => {
    if (a.organizationName < b.organizationName) return -1;
    if (a.organizationName > b.organizationName) return 1;
    if (a.status == "fulfilled") return -1;
    if (b.status == "fulfilled") return 1;
    return 0;
  });

  const requestedRecords = emissionRecords.filter(
    (record) => record.status === "requested",
  );
  const fulfilledRecords = emissionRecords.filter(
    (record) => record.status === "fulfilled",
  );
  const draftRecords = emissionRecords.filter(
    (record) => record.status === "draft",
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-cyan-900">
          Request Emissions Data
        </h2>
        <EmissionRecordDialog purchaseRecords={purchaseRecords} />
      </div>

      <Tabs defaultValue="fulfilled" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 text-xs sm:text-sm">
          <TabsTrigger
            value="requested"
            className="data-[state=active]:bg-amber-300"
          >
            Requested ({requestedRecords.length})
          </TabsTrigger>
          <TabsTrigger
            value="fulfilled"
            className="data-[state=active]:bg-green-300"
          >
            Gathered data ({fulfilledRecords.length})
          </TabsTrigger>
          <TabsTrigger
            value="draft"
            className="data-[state=active]:bg-blue-300"
          >
            Drafts ({draftRecords.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requested" className="mt-0">
          <div className="overflow-x-auto">
            {requestedRecords.length > 0 ? (
              <DataTable columns={columns} data={requestedRecords} />
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
              <DataTable columns={columns} data={fulfilledRecords} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                No fulfilled emission records found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="mt-0">
          <div className="overflow-x-auto">
            {draftRecords.length > 0 ? (
              <DataTable columns={columns} data={draftRecords} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                No draft emission records found
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
