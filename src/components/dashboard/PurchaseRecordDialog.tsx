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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { trpc } from "~/server/api/trpc/client";
import type { EnrichedOrganization } from "~/server/api/routers/organization";
import type { EnrichedProduct } from "~/server/api/routers/products";

import type { Product, Pu } from "~/server/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";

export default function PurchaseRecordDialog({
    organizations,
    products,
}: {
    organizations: EnrichedOrganization[];
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
        console.log("checking");
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId],
        );
    };

    const handleCreatePurchaseRecords = async () => {
        const purchasedProducts = products
            .filter((product) => selectedProducts.includes(product.id))
            .map((product) => ({
                supplierOrgId: product.Supplier.id,
                customerOrgId: product.Supplier.OrgRelation[0].Customer.id,
                productId: product.id,
                quantity: 0,
                purchaseDate: new Date().toISOString(),
                comment: "",
            }))

        try {
            await createPurchaseRecord.mutateAsync(
                purchasedProducts,
            );
            alert("Purchase records created successfully!");
        } catch (error) {
            console.error("Error creating purchase records:", error);
            alert("Failed to create purchase records.");
        }
    };

    const columns: ColumnDef<Product>[] = [
        { accessorKey: "name", header: "Product" },
        { accessorKey: "supplierName", header: "Organization" },
        {
            accessorKey: "select",
            header: "Select",
            cell: ({ row }) => (
                <Checkbox
                    checked={selectedProducts.includes(row.original.id)}
                    onCheckedChange={() => handleProductCheckboxChange(row.original.id)}
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
            <DialogContent className="min-w-[1000px] h-[800]  text-cyan-900 font-sans flex flex-col">
                <DialogHeader className="flex-none">
                    <DialogTitle className="text-5xl">
                        Add new purchase record
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-row flex-grow gap-10 overflow-hidden">
                    <div className="flex flex-col flex-grow gap-2 mt-2 max-h-full">
                        {organizations?.map((org: EnrichedOrganization) => (
                            <label key={org.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedOrganizations.includes(org.supplierOrgId)}
                                    onChange={() =>
                                        handleOrganizationCheckboxChange(org.supplierOrgId)
                                    }
                                />
                                <span className="text-2xl">{org.Organization.name}</span>
                            </label>
                        ))}
                    </div>
                    <div className="overflow-y-scroll scrollbar-hidden overflow-x-hidden flex flex-col flex-grow gap-2 mt-2 table-fixed max-h-[calc(100vh-300px)]">
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
