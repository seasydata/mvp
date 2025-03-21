"use server";

import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";
import SubmitData from "../submit-data";
import { getHelper } from "~/app/_trpc/helper";

// { onClose }: { onClose: () => void }
export default async function DataSubmission({
  params,
}: {
  params: Promise<string>;
}) {
  const emissionRecordId: string = await params;
  const helper = await getHelper();
  const emissionRecord: EnrichedEmissionRecord = await
    helper.emissionRecord.getSingle.fetch({
      emissionRecordId: emissionRecordId
    });

  if (!emissionRecord) {
    return <h1>404 - Page Not Found</h1>;
  }
  return (
    <div>
      <SubmitData emissionRecord={emissionRecord} />
    </div>
  );
}
