import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";
import SubmitData from "../submit-data";
import { getHelper } from "~/app/_trpc/helper";
import { notFound } from "next/navigation";

export default async function DataSubmission({
  params,
}: {
  params: Promise<{ recordId: string }>;
}) {
  const { recordId } = await params;

  const helper = await getHelper();

  try {
    const emissionRecord: EnrichedEmissionRecord =
      await helper.emissionRecord.getSingle.fetch({
        emissionRecordId: recordId,
      });

    if (!emissionRecord) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <SubmitData emissionRecord={emissionRecord} />
      </div>
    );
  } catch (error) {
    // Handle any errors by redirecting to 404 page
    console.error("Error fetching emission record:", error);
    notFound();
  }
}
