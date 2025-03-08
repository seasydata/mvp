"use server"
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/dashboard/data-table";
import type { EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import type { EmissionRecord } from "~/server/types";
import { helper } from "~/app/_trpc/helper";
import EmissionRecordDialog from "~/components/dashboard/EmissionRecordDialog";

const columns: ColumnDef<EmissionRecord>[] = [
    {
        accessorKey: "productId",
        header: "Product"
    },
    {
        accessorKey: "recordDate",
        header: "Date recorded",
    },
    {
        accessorKey: "quantityValue",
        header: "Quantity",
    },
    {
        accessorKey: "quantityUnit",
        header: "Unit",
    },

];

export default async function Pending({ records }: { records: EmissionRecord[] }) {

    // TODO Transform emissionrecords if needed

    const purchaseRecords: EnrichedPurchaseRecord[] = await helper.purchaseRecord.getFiltered.fetch();
    const transformedRecords = purchaseRecords.map(purchaseRecord => ({
        ...purchaseRecord,
        productName: purchaseRecord.Product.name,
        productDescription: purchaseRecord.Product.description,
        supplierName: purchaseRecord.Organization.name,
        supplierCountry: purchaseRecord.Organization.country,
        purchaseDate: purchaseRecord.purchaseDate.slice(0, 10)
    }));
    return (
        <>
            <div className="flex flex-row items-center space-x-10  pt-10">
                <div className='font-bold pt-10'>
                    PENDING REQUESTS
                </div>
                <div className='ml-10'>
                    <EmissionRecordDialog purchaseRecords={transformedRecords} />
                </div>
            </div>

            <div className='pt-10'>
                <DataTable columns={columns} data={records} />
            </div>
        </>
    )
}

