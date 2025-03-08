"use client";

import { useState, useEffect } from "react";
import { type EnrichedOrganization } from "~/server/api/routers/organization";
import { trpc } from "~/server/api/trpc/client";
import { type Product } from "~/server/types";

// { onClose }: { onClose: () => void }
export default function PurchaseRecordForm() {
    const [selectedOrganization, setSelectedOrganization] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [quantityValue, setQuantityValue] = useState<number | undefined>(undefined);
    const [quantityUnit, setQuantityUnit] = useState<string | undefined>(undefined);

    const { data: organizations, isLoading } = trpc.organization.getFiltered.useQuery();
    const createPurchaseRecord = trpc.purchaseRecord.create.useMutation();



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createPurchaseRecord.mutateAsync({
            organizationId: selectedOrganization,
            productId: selectedProduct,
            purchaseDate,
            quantityValue,
            quantityUnit,
        });
        onClose();
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <select
                value={selectedOrganization}
                onChange={(e) => setSelectedOrganization(e.target.value)}
                className="border p-2"
            >
                <option value="">Select Organization</option>
                {organizations?.map((org) => (
                    <option key={org.id} value={org.id}>
                        {org.Organization.name}
                    </option>
                ))}
            </select>
            <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="border p-2"
                disabled={!selectedOrganization}
            >
                <option value="">Select Product</option>
                {selectedOrganization &&
                    organizations
                        ?.find((org: EnrichedOrganization) => org.Organization.name === selectedOrganization)
                        ?.products.map((product: Product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
            </select>
            <input
                type="date"
                placeholder="Purchase Date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="border p-2"
            />
            <input
                type="number"
                placeholder="Quantity Value"
                value={quantityValue ?? ""}
                onChange={(e) => setQuantityValue(Number(e.target.value))}
                className="border p-2"
            />
            <input
                type="text"
                placeholder="Quantity Unit"
                value={quantityUnit ?? ""}
                onChange={(e) => setQuantityUnit(e.target.value)}
                className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Submit
            </button>
        </form>
    );
}