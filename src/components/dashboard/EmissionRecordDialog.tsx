"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "../ui/data-table";
import { Button } from "../ui/button";
import { useState } from "react";
import { trpc } from "~/server/api/trpc/client";

import type { EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

export default function EmissionRecordDialog({
  purchaseRecords,
}: {
  purchaseRecords: EnrichedPurchaseRecord[];
}) {
  const utils = trpc.useUtils()
  const createEmissionRecord = trpc.emissionRecord.create.useMutation({
    async onSuccess() {
      await utils.emissionRecord.getFiltered.invalidate();
    },
  })

  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  // const [source, setSource] = useState<string>("");

  const handleCheckboxChange = (recordId: string) => {
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(recordId)
        ? prevSelected.filter((id) => id !== recordId)
        : [...prevSelected, recordId],
    );
  };

  const columns: ColumnDef<EnrichedPurchaseRecord>[] = [
    { accessorKey: "productName", header: "Product" },
    { accessorKey: "purchaseDate", header: "Purchase date" },
    { accessorKey: "supplierName", header: "Supplier" },
    {
      accessorKey: "select",
      header: "Select",
      cell: ({ row }) => (
        <Checkbox
          checked={selectedRecords.includes(row.original.productId)}
          onCheckedChange={() => handleCheckboxChange(row.original.productId)}
        />
      ),
    },
  ];

  const handleCreateEmissionRecords = async () => {
    const newEmissionRecords = purchaseRecords
      .filter((record) => selectedRecords.includes(record.productId))
      .map((record) => ({
        productId: record.productId,
        status: "requested" as const,
        recordDate: null,
        source: null,
        CO2e: null,
        calculationMethod: null,
        comment: null,
      }));

    try {
      await createEmissionRecord.mutateAsync(newEmissionRecords);
      toast.success("Emission records created successfully");
    } catch (error) {
      console.error("Error creating purchase records:", error);
      toast.error("Failed to create purchase records.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="h-4 w-4" />
          Request emission record
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row">
          <DialogTitle>Request emissions data</DialogTitle>
        </DialogHeader>
        <div className="flex flex-grow gap-10 align-top ">
          <div className="flex flex-col flex-grow gap-2 overflow-y-auto max-h-full ">
            <DataTable
              columns={columns}
              data={purchaseRecords.map((record) => ({
                ...record,
                selected: selectedRecords.includes(record.productId),
              }))}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end w-auto">
          <Button onClick={handleCreateEmissionRecords} className="w-auto">
            Request records
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const statusEnum = {
  draft: "draft",
  requested: "requested",
  fulfilled: "fulfilled",
} as const;
