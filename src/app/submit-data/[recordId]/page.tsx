"use server";

import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";
import SubmitData from "../submit-data";
import { helper } from "~/app/_trpc/helper";

// { onClose }: { onClose: () => void }
export default async function DataSubmission({
    params
}: { params: Promise<string> }) {
    const emissionRecordId = (await params).recordId;

    const emissionRecord: EnrichedEmissionRecord =
        await helper.emissionRecord.getSingle.fetch({ emissionRecordId: emissionRecordId })
    return (
        <div>
            <SubmitData emissionRecord={emissionRecord} />
        </div>
    )
}