import { DataTable } from "~/components/dashboard/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import PurchaseRecordDialog from "~/components/dashboard/PurchaseRecordDialog";
import { helper } from "~/app/_trpc/helper";
import type { EnrichedOrganization } from "~/server/api/routers/organizations";
import type { EnrichedProduct } from "~/server/api/routers/products";

const columns: ColumnDef<EnrichedPurchaseRecord>[] = [
  {
    accessorKey: "productName",
    header: "Product",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "purchaseDate",
    header: "Date Purchased",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "organizationName",
    header: "Supplier",
  },
];

export default async function PurchaseRecords({
  purchaseRecords,
}: {
  purchaseRecords: EnrichedPurchaseRecord[];
}) {
  const organizations: EnrichedOrganization[] =
    await helper.organization.getFiltered.fetch();
  const products: EnrichedProduct[] = await helper.product.getFiltered.fetch();

  return (
    <>
      <div className="flex flex-row items-center space-x-10  pt-10">
        <div className=" font-bold">PURCHASE RECORDS</div>
        <div className="ml-10">
          <PurchaseRecordDialog
            organizations={organizations}
            products={products}
          />
        </div>
      </div>
      <div className="pt-10">
        <DataTable columns={columns} data={purchaseRecords} />
      </div>
    </>
  );
}
