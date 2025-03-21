"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "./data-table";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { trpc } from "~/server/api/trpc/client";
import type { EnrichedProduct } from "~/server/api/routers/products";

import type { Organization, Product } from "~/server/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";

export default function PurchaseRecordDialog({
    organizations,
    products,
}: {
    organizations: Organization[];
    products: EnrichedProduct[];
}) {

    const createPurchaseRecord = trpc.purchaseRecord.create.useMutation();

    const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>(
        [],
    );
    const [filteredProducts, setFilteredProducts] = useState<EnrichedProduct[]>(
        [],
    );
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    useEffect(() => {
        if (selectedOrganizations.length > 0) {
            const filtered = products.filter((product) =>
                selectedOrganizations.includes(product.organizationId),
            );

            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [products, selectedOrganizations]);

    const handleOrganizationCheckboxChange = (organizationId: string) => {
        setSelectedOrganizations((prevSelected) =>
            prevSelected.includes(organizationId)
                ? prevSelected.filter((id) => id !== organizationId)
                : [...prevSelected, organizationId],
        );
    };

    const handleProductCheckboxChange = (productId: string) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId],
        );
    };

    // Only supports creating for one customer org.
    // i.e. if user is part of multiple organizations,
    // the purchaserecord might be created for the wrong one
    const handleCreatePurchaseRecords = async () => {
        const purchasedProducts = products
            .filter((product) => selectedProducts.includes(product.productId))
            .map((product) => ({
                supplierOrgId: product.organizationId,
                productId: product.productId,
                quantity: 0,
                purchaseDate: new Date().toISOString(),
                comment: "",
            }));

        try {
            await createPurchaseRecord.mutateAsync(purchasedProducts);
            alert("Purchase records created successfully!");
        } catch (error) {
            console.error("Error creating purchase records:", error);
            alert("Failed to create purchase records.");
        }
    };

    const columns: ColumnDef<Product>[] = [
        { accessorKey: "productName", header: "Product" },
        { accessorKey: "description", header: "Description" },
        { accessorKey: "unit", header: "Unit" },
        { accessorKey: "organizationName", header: "Organization" },
        { accessorKey: "purchaseDate", header: "Purchased on" },
        {
            accessorKey: "select",
            header: "Select",
            cell: ({ row }) => (
                <Checkbox
                    checked={selectedProducts.includes(row.original.productId)}
                    onCheckedChange={() =>
                        handleProductCheckboxChange(row.original.productId)
                    }
                />
            ),
        },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-300 hover:bg-blue-700">
                    Add purchase record
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-fit min-w-[1000px] h-[1000] text-cyan-900 font-sans flex flex-col">
                <DialogHeader className="flex-none">
                    <DialogTitle className="text-5xl">
                        Add new purchase record
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-row flex-grow gap-10 w-max ">
                    <div className="flex flex-col flex-grow gap-2 mt-2 max-h-full w-max">
                        {organizations?.map((org: Organization) => (
                            <label
                                key={org.organizationId}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedOrganizations.includes(org.organizationId)}
                                    onChange={() =>
                                        handleOrganizationCheckboxChange(org.organizationId)
                                    }
                                />
                                <span className="text-2xl">{org.organizationName}</span>
                            </label>
                        ))}
                    </div>
                    <div className="overflow-y-scroll  overflow-x-hidden flex flex-col flex-grow gap-2 mt-2 table-fixed max-h-[calc(100vh-300px)]">
                        <div className="h-full">
                            <DataTable columns={columns} data={filteredProducts} />
                        </div>
                    </div>
                </div>
                <DialogFooter className="sm:justify-end">
                    <Button
                        type="button"
                        className="bg-green-500 text-white p-2 rounded"
                        onClick={handleCreatePurchaseRecords}
                    >
                        Create Purchase Records
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// scrollbar-hidden