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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { trpc } from "~/server/api/trpc/client";
import type { EnrichedProduct } from "~/server/api/routers/products";
import type { Organization, Product } from "~/server/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";

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
    if (selectedProducts.length === 0) {
      toast.warning("Please select at least one product");
      return;
    }

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
      toast.success("Purchase records created successfully!");
    } catch (error) {
      console.error("Error creating purchase records:", error);
      toast.error("Failed to create purchase records.");
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "productName",
      header: "Product",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("productName")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div
          className="max-w-[200px] truncate"
          title={row.getValue("description")}
        >
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "unit",
      header: "Unit",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("unit")}</div>
      ),
    },
    {
      accessorKey: "organizationName",
      header: "Organization",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("organizationName")}</div>
      ),
    },
    {
      accessorKey: "purchaseDate",
      header: "Purchased on",
      cell: ({ row }) => {
        const date = row.getValue("purchaseDate");
        return date ? (
          <div className="text-muted-foreground">
            {new Date(date as string).toLocaleDateString()}
          </div>
        ) : null;
      },
    },
    {
      id: "select",
      header: ({ table }) => <div className="text-center">Select</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <Checkbox
            checked={selectedProducts.includes(row.original.productId)}
            onCheckedChange={() =>
              handleProductCheckboxChange(row.original.productId)
            }
            className="data-[state=checked]:bg-primary"
          />
        </div>
      ),
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusIcon className="h-4 w-4" />
          <span>Add purchase record</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add new purchase record</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 py-4">
          <Card className="w-full md:w-72 flex-shrink-0">
            <CardContent className="pt-6">
              <h3 className="text-sm font-medium mb-3">
                Filter by organizations
              </h3>
              <div className="max-h-[200px] md:max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
                <div className="space-y-2">
                  {organizations?.map((org) => (
                    <label
                      key={org.organizationId}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                    >
                      <Checkbox
                        checked={selectedOrganizations.includes(
                          org.organizationId,
                        )}
                        onCheckedChange={() =>
                          handleOrganizationCheckboxChange(org.organizationId)
                        }
                      />
                      <span className="text-sm font-medium">
                        {org.organizationName}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full flex-1 min-w-0">
            <CardContent className="pt-6">
              <h3 className="text-sm font-medium mb-3">Select products</h3>
              <div className="overflow-hidden h-[300px] md:h-[calc(100vh-400px)]">
                <DataTable columns={columns} data={filteredProducts} />
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="default"
            onClick={handleCreatePurchaseRecords}
            disabled={selectedProducts.length === 0}
          >
            Create Purchase Records
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
