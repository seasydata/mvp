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
import type { Product } from "~/server/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect } from 'react'

const columns: ColumnDef<Product>[] = [
    { accessorKey: "name", header: "Product" },
    { accessorKey: "supplierName", header: "Organization" },
];

export default function PurchaseRecordDialog({ organizations, products }:
    { organizations: EnrichedOrganization[], products: EnrichedProduct[] }
) {
    // const createPurchaseRecord = trpc.purchaseRecord.create.useMutation();

    const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<EnrichedProduct[]>([]);

    // const [selectedProduct, setSelectedProduct] = useState("");
    // const [purchaseDate, setPurchaseDate] = useState("");
    // const [quantityValue, setQuantityValue] = useState<number | null>(null);
    // const [quantityUnit, setQuantityUnit] = useState<string | null>(null);
    // const [open, setOpen] = useState(false);

    // const { data: organizations, isLoading } = trpc.organization.getFiltered.useQuery();

    useEffect(() => {

        if (selectedOrganizations.length > 0) {
            const filtered = products.filter(product =>
                selectedOrganizations.includes(product.organizationId)
            );

            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [products, selectedOrganizations]);

    const handleCheckboxChange = (organizationId: string) => {
        setSelectedOrganizations(prevSelected =>
            prevSelected.includes(organizationId)
                ? prevSelected.filter((id: string) => id !== organizationId)
                : [...prevSelected, organizationId]
        );
    };
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
        <DialogContent className="min-w-[1000px] min-h-[800] max-h-[800] text-cyan-900 bg-green-200 font-sans flex flex-col">
            <DialogHeader>
                <DialogTitle className='text-5xl'>Add new purchase record</DialogTitle>
            </DialogHeader>
            <div className='flex flex-row flex-grow gap-10 align-top'>
                <div className="flex flex-col flex-grow gap-2 mt-2 max-h-full bg-red-200">
                    {organizations?.map((org: EnrichedOrganization) => (
                        <label key={org.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedOrganizations.includes(org.supplierOrgId)}
                                onChange={() => handleCheckboxChange(org.supplierOrgId)}
                            />
                            <span className='text-2xl'>{org.Organization.name}</span>
                        </label>
                    ))}
                </div>
                <div className='flex flex-col flex-grow gap-2 mt-2 overflow-y-auto max-h-full bg-red-200 '>
                    <DataTable columns={columns} data={filteredProducts} />
                </div>
            </div>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog >)
} 