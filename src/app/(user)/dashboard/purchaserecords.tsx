"use client";

import { DataTable } from "~/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import PurchaseRecordDialog from "~/components/dashboard/PurchaseRecordDialog";
import type { EnrichedProduct } from "~/server/api/routers/products";
import { type Organization } from "~/server/types";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";

const columns: ColumnDef<EnrichedPurchaseRecord>[] = [
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("productName")}</div>
    ),
  },
  {
    accessorKey: "organizationName",
    header: "Supplier",
    cell: ({ row }) => {
      const name: string = row.getValue("organizationName");
      return name ? (
        <div className="max-w-[120px] text-wrap sm:max-w-full truncate" title={name}>
          {name}
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description: string = row.getValue("description");
      return description ? (
        <div
          className="text-wrap truncate lg-and-up:max-w-[300px]"
          title={description}
        >
          {description}
        </div>
      ) : (
        <div className="text-gray-500 italic">No description</div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("unit")}</div>
    ),
  },
  {
    accessorKey: "purchaseDate",
    header: "Date Purchased",
    cell: ({ row }) => {
      const date = row.getValue("purchaseDate");
      return date ? (
        <div className="text-sm text-gray-500">
          {new Date(date as string).toLocaleDateString()}
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const comment: string = row.getValue("comment");
      return comment ? (
        <div
          className="lg-and-up:max-w-[250px] truncate"
          title={comment}
        >
          {comment}
        </div>
      ) : null;
    }
  },
];

export default function PurchaseRecords({
  purchaseRecords,
  organizations,
  products,
}: {
  purchaseRecords: EnrichedPurchaseRecord[];
  organizations: Organization[];
  products: EnrichedProduct[];
}) {
  const [filteredRecords, setFilteredRecords] = useState(purchaseRecords);
  const [searchTerm, setSearchTerm] = useState("");
  filteredRecords.sort((a, b) => {
    if (a.organizationName < b.organizationName) return -1;
    if (a.organizationName > b.organizationName) return 1;
    if (a.productName < b.productName) return 1;
    if (a.productName > b.productName) return -1;
    return 0;
  });


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredRecords(purchaseRecords);
      return;
    }

    const filtered = purchaseRecords.filter(
      (record) =>
        record.productName?.toLowerCase().includes(value) ||
        record.description?.toLowerCase().includes(value) ||
        record.organizationName?.toLowerCase().includes(value),
    );

    setFilteredRecords(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-cyan-900">
          Purchase Records
        </h2>
        <PurchaseRecordDialog
          organizations={organizations}
          products={products}
        />
      </div>

      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search products, descriptions or suppliers..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="overflow-x-auto">
            {filteredRecords.length > 0 ? (
              <DataTable columns={columns} data={filteredRecords} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                {searchTerm
                  ? "No records match your search"
                  : "No purchase records found"}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
