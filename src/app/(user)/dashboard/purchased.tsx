"use server"
import { DataTable } from "~/components/dashboard/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import PurchaseRecordDialog from "~/components/dashboard/PurchaseRecordDialog";
import { helper } from "~/app/_trpc/helper";
import type { EnrichedOrganization } from "~/server/api/routers/organization";
import type { EnrichedProduct } from "~/server/api/routers/products";

const columns: ColumnDef<EnrichedPurchaseRecord>[] = [
    {
        accessorKey: "productName",
        header: "Product"
    },
    {
        accessorKey: "productDescription",
        header: "Description"
    },
    {
        accessorKey: "supplierName",
        header: "Supplier"
    },
    {
        accessorKey: "purchaseDate",
        header: "Date Purchased",
    },
    {
        accessorKey: "quantityValue",
        header: "Quantity",

    },
    {
        accessorKey: "quantityUnit",
        header: "Unit",
    }
];

export default async function Purchases({ records }: { records: EnrichedPurchaseRecord[] }) {
    // console.log(records);
    const transformedRecords = records.map(record => ({
        ...record,
        supplierName: record.Organization.name,
        supplierCountry: record.Organization.country,
        productName: record.Product.name,
        productDescription: record.Product.description,
        purchaseDate: record.purchaseDate.slice(0, 10)
    }))
    const organizations: EnrichedOrganization[] = await helper.organization.getFiltered.fetch();
    const products: EnrichedProduct[] = await helper.product.getFiltered.fetch();
    const transformedProducts = products.map(product => ({
        ...product,
        supplierName: product.Organization.name,
    }))
    // console.log(organizations);
    return (
        <><div className="flex flex-row items-center space-x-10  pt-10">
            <div className=' font-bold'>
                PURCHASE RECORDS
            </div>
            <div className='ml-10'>
                <PurchaseRecordDialog organizations={organizations} products={transformedProducts} />
            </div>
        </div>
            <div className='pt-10'>
                <DataTable columns={columns} data={transformedRecords} />
            </div>
        </>
    )
}
