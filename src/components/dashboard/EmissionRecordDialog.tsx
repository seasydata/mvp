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

const columns: ColumnDef<EnrichedPurchaseRecord>[] = [
    { accessorKey: "productName", header: "Product" },
    { accessorKey: "purchaseDate", header: "Purchase date" },
    { accessorKey: "supplierName", header: "Supplier" },
];

export default function EmissionRecordDialog({ purchaseRecords }:
    { purchaseRecords: EnrichedPurchaseRecord[] }) {
    // const createPurchaseRecord = trpc.purchaseRecord.create.useMutation();
    const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<EnrichedProduct[]>([]);
    // const [selectedProduct, setSelectedProduct] = useState("");
    // const [purchaseDate, setPurchaseDate] = useState("");
    // const [quantityValue, setQuantityValue] = useState<number | null>(null);
    // const [quantityUnit, setQuantityUnit] = useState<string | null>(null);
    // const [open, setOpen] = useState(false);

    // const { data: organizations, isLoading } = trpc.organization.getFiltered.useQuery();

    // useEffect(() => {

    //     if (selectedOrganizations.length > 0) {
    //         const filtered = products.filter(product =>
    //             selectedOrganizations.includes(product.organizationId)
    //         );
    //         console.log(selectedOrganizations)
    //         console.log(filtered)
    //         setFilteredProducts(filtered);
    //     } else {
    //         setFilteredProducts(products);
    //     }
    // }, [products, selectedOrganizations]);

    // const handleCheckboxChange = (organizationId: string) => {
    //     setSelectedOrganizations(prevSelected =>
    //         prevSelected.includes(organizationId)
    //             ? prevSelected.filter((id: string) => id !== organizationId)
    //             : [...prevSelected, organizationId]
    //     );
    // };
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     await createPurchaseRecord.mutateAsync({
    //         organizationId: selectedOrganizations[0], // Assuming one organization for simplicity
    //         productId: selectedProduct,
    //         purchaseDate,
    //         quantityValue,
    //         quantityUnit,
    //     });
    //     handleClose();
    // };
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (< Dialog >
        <DialogTrigger asChild>
            <Button className='bg-blue-300 hover:bg-blue-700' >Add purchase record</Button>
        </DialogTrigger>
        <DialogContent className="min-w-[1000px] min-h-[800] text-cyan-900 bg-green-200 font-sans flex flex-col">
            <DialogHeader className="flex flex-row bg-red-200">
                <DialogTitle className='text-5xl'>Request emissions data</DialogTitle>
            </DialogHeader>
            <div className='flex flex-grow gap-10 align-top bg-red-200'>
                <div className='flex flex-col flex-grow gap-2 overflow-y-auto max-h-full '>
                    <DataTable columns={columns} data={purchaseRecords} />
                </div>
            </div>
            <DialogFooter className="sm:justify-start bg-red-200">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog >)
} 