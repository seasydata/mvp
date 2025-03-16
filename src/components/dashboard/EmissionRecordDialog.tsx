"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "./data-table";
import { Button } from "../ui/button";
import { useState } from "react";
import { trpc } from "~/server/api/trpc/client";
import type { EnrichedOrganization } from "~/server/api/routers/organizations";
import type { EnrichedProduct } from "~/server/api/routers/products";
import type { EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import type { EmissionRecord, Product } from "~/server/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";

export default function EmissionRecordDialog({
  purchaseRecords,
}: {
  purchaseRecords: EnrichedPurchaseRecord[];
}) {
  const createEmissionRecord = trpc.emissionRecord.create.useMutation();

  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);

  const handleCheckboxChange = (recordId: string) => {
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(recordId)
        ? prevSelected.filter((id) => id !== recordId)
        : [...prevSelected, recordId],
    );
  };

  const handleRunFunction = () => {
    console.log("Selected Records:", selectedRecords);
  };

  const columns: ColumnDef<EnrichedPurchaseRecord>[] = [
    { accessorKey: "productName", header: "Product" },
    { accessorKey: "purchaseDate", header: "Purchase date" },
    { accessorKey: "supplierName", header: "Supplier" },
    {
      accessorKey: "select",
      header: "Select",
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.selected}
          onChange={() => handleCheckboxChange(row.original.id)}
        />
      ),
    },
  ];

  const handleCreateEmissionRecords = async () => {
    // console.log(purchaseRecords)
    const newEmissionRecords: EmissionRecord = purchaseRecords
      .filter((record) => selectedRecords.includes(record.id))
      .map((record) => ({
        productId: record.productId,
        status: "requested",
        recordDate: new Date(), //.toISOString(),
        source: "internjet",
        CO2e: 1,
        calculationMethod: "AR4",
        comment: "a comment",
      }));

    try {
      const returnEmails =
        await createEmissionRecord.mutateAsync(newEmissionRecords);
      console.log(returnEmails);
      alert("Emission records created successfully");
    } catch (error) {
      console.error("Error creating purchase records:", error);
      alert("Failed to create purchase records.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-300 hover:bg-blue-700">
          Request emission record
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[1000px] min-h-[800] text-cyan-900 font-sans flex flex-col">
        <DialogHeader className="flex flex-row">
          <DialogTitle className="text-5xl">Request emissions data</DialogTitle>
        </DialogHeader>
        <div className="flex flex-grow gap-10 align-top ">
          <div className="flex flex-col flex-grow gap-2 overflow-y-auto max-h-full ">
            <DataTable
              columns={columns}
              data={purchaseRecords.map((record) => ({
                ...record,
                selected: selectedRecords.includes(record.id),
              }))}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end ">
          <Button
            onClick={handleCreateEmissionRecords}
            className="bg-blue-300 hover:bg-blue-700"
          >
            Request records
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
