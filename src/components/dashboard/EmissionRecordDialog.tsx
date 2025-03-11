"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DataTable } from "./data-table";
import { Button } from "../ui/button";
import { useState } from "react";
import { trpc } from "~/server/api/trpc/client";
import type { EnrichedOrganization } from "~/server/api/routers/organization";
import type { EnrichedProduct } from "~/server/api/routers/products"
import type { EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import type { Product } from "~/server/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect } from 'react'



export default function EmissionRecordDialog({ purchaseRecords }:
    { purchaseRecords: EnrichedPurchaseRecord[] }) {
    // const createPurchaseRecord = trpc.purchaseRecord.create.useMutation();
    const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
 
    const handleCheckboxChange = (recordId: string) => {
        setSelectedRecords((prevSelected) =>
            prevSelected.includes(recordId)
                ? prevSelected.filter((id) => id !== recordId)
                : [...prevSelected, recordId]
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

    return (< Dialog >
        <DialogTrigger asChild>
            <Button className='bg-blue-300 hover:bg-blue-700' >Request emission record</Button>
        </DialogTrigger>
        <DialogContent className="min-w-[1000px] min-h-[800] text-cyan-900 font-sans flex flex-col">
            <DialogHeader className="flex flex-row">
                <DialogTitle className='text-5xl'>Request emissions data</DialogTitle>
            </DialogHeader>
            <div className='flex flex-grow gap-10 align-top '>
                <div className='flex flex-col flex-grow gap-2 overflow-y-auto max-h-full '>
                    <DataTable columns={columns} data={purchaseRecords.map(record => ({
                            ...record,
                            selected: selectedRecords.includes(record.id),
                        }))} />
                </div>
            </div>
            <DialogFooter className="sm:justify-end ">
            <Button onClick={handleRunFunction} className='bg-blue-300 hover:bg-blue-700'>Request records</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog >)
} 