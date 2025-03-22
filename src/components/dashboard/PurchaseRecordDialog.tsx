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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, PlusIcon, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [filteredProducts, setFilteredProducts] =
    useState<EnrichedProduct[]>(products);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [orgSearchTerm, setOrgSearchTerm] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");

  // Filter organizations for display based on search
  const filteredOrganizations = organizations.filter(
    (org) =>
      !orgSearchTerm ||
      org.organizationName.toLowerCase().includes(orgSearchTerm.toLowerCase()),
  );

  useEffect(() => {
    let filtered = products;

    // Filter by selected organizations
    if (selectedOrganizations.length > 0) {
      filtered = filtered.filter((product) =>
        selectedOrganizations.includes(product.organizationId),
      );
    }

    // Filter by product search term
    if (productSearchTerm) {
      const term = productSearchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.productName?.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.organizationName?.toLowerCase().includes(term),
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedOrganizations, productSearchTerm]);

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
        quantity: 1, // Default to 1 instead of 0
        purchaseDate: new Date().toISOString(),
        comment: "",
      }));

    try {
      await createPurchaseRecord.mutateAsync(purchasedProducts);
      toast.success(
        `${purchasedProducts.length} purchase record${purchasedProducts.length > 1 ? "s" : ""} created successfully!`,
      );
      setSelectedProducts([]);
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
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return description ? (
          <div className="max-w-[200px] truncate" title={description}>
            {description}
          </div>
        ) : (
          <span className="text-gray-400 italic">No description</span>
        );
      },
    },
    {
      accessorKey: "unit",
      header: "Unit",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("unit") || "-"}</div>
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
      id: "select",
      header: ({ table }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={
              selectedProducts.length > 0 &&
              selectedProducts.length === filteredProducts.length
            }
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedProducts(filteredProducts.map((p) => p.productId));
              } else {
                setSelectedProducts([]);
              }
            }}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={selectedProducts.includes(row.original.productId)}
            onCheckedChange={() =>
              handleProductCheckboxChange(row.original.productId)
            }
            className="data-[state=checked]:bg-cyan-600"
          />
        </div>
      ),
    },
  ];

  // Get count of organizations and organization names for the filter summary
  const organizationCount = selectedOrganizations.length;
  const organizationNames = organizations
    .filter((org) => selectedOrganizations.includes(org.organizationId))
    .map((org) => org.organizationName)
    .join(", ");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-white hover:bg-gray-50">
          <PlusIcon className="h-4 w-4" />
          <span>Add purchase record</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-7xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl text-cyan-900 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Add new purchase record
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-130px)]">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 p-6">
            <div className="flex flex-col gap-4">
              <Card className="border-cyan-100">
                <CardHeader className="pb-3 pt-4 px-4">
                  <CardTitle className="text-sm text-cyan-900 font-medium flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Filter by organizations
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-0">
                  {/* Filter summary */}
                  {organizationCount > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
                      <Badge
                        variant="outline"
                        className="bg-cyan-50 border-cyan-200 text-cyan-900"
                      >
                        {organizationCount} selected
                      </Badge>
                      <p
                        className="text-xs text-gray-500 mt-1 w-full truncate"
                        title={organizationNames}
                      >
                        {organizationNames}
                      </p>
                    </div>
                  )}

                  <div className="relative mb-3">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search organizations..."
                      className="pl-8 h-9 text-sm"
                      value={orgSearchTerm}
                      onChange={(e) => setOrgSearchTerm(e.target.value)}
                    />
                  </div>

                  <ScrollArea className="h-[250px]">
                    <div className="pr-3 space-y-1">
                      {filteredOrganizations.map((org) => (
                        <label
                          key={org.organizationId}
                          className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors ${
                            selectedOrganizations.includes(org.organizationId)
                              ? "bg-cyan-50 text-cyan-900"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <Checkbox
                            checked={selectedOrganizations.includes(
                              org.organizationId,
                            )}
                            onCheckedChange={() =>
                              handleOrganizationCheckboxChange(
                                org.organizationId,
                              )
                            }
                            className="data-[state=checked]:bg-cyan-600"
                          />
                          <span className="text-sm">
                            {org.organizationName}
                          </span>
                        </label>
                      ))}

                      {filteredOrganizations.length === 0 && (
                        <div className="text-center py-4 text-sm text-gray-500">
                          No organizations found
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Selected products counter for desktop */}
              <div className="hidden md:block px-4">
                <div className="text-sm mb-2">Selected products</div>
                <div className="text-2xl font-bold text-cyan-900">
                  {selectedProducts.length}
                </div>
                {selectedProducts.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-cyan-800 hover:text-cyan-900 p-0 h-auto"
                    onClick={() => setSelectedProducts([])}
                  >
                    Clear selection
                  </Button>
                )}
              </div>
            </div>

            <Card className="border-cyan-100">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm text-cyan-900 font-medium">
                  Available products
                </CardTitle>

                <div className="flex flex-col md:flex-row justify-between gap-3 mt-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      className="pl-8 h-9 text-sm"
                      value={productSearchTerm}
                      onChange={(e) => setProductSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="md:hidden">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm">Selected products</div>
                        <div className="text-xl font-bold text-cyan-900">
                          {selectedProducts.length}
                        </div>
                      </div>
                      {selectedProducts.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-cyan-800 hover:text-cyan-900"
                          onClick={() => setSelectedProducts([])}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[420px]">
                  <div className="overflow-hidden">
                    <DataTable columns={columns} data={filteredProducts} />

                    {filteredProducts.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-[200px] text-center p-4">
                        <p className="text-gray-500 mb-2">No products found</p>
                        <p className="text-sm text-gray-400">
                          {selectedOrganizations.length > 0 &&
                          !productSearchTerm
                            ? "Try selecting different organizations or clearing your filters"
                            : productSearchTerm
                              ? "Try using different search terms"
                              : "Select organizations to filter the products"}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-2">
          <div className="w-full flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {selectedProducts.length > 0
                ? `You've selected ${selectedProducts.length} product${
                    selectedProducts.length > 1 ? "s" : ""
                  }`
                : "Select products to add as purchase records"}
            </div>
            <Button
              type="button"
              variant="default"
              className="bg-cyan-700 hover:bg-cyan-800"
              onClick={handleCreatePurchaseRecords}
              disabled={selectedProducts.length === 0}
            >
              Create Purchase Records
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
