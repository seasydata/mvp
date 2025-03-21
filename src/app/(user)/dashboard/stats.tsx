import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";
import { type EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";

export default async function Stats({
  emissionRecords,
  purchaseRecords,
}: {
  emissionRecords: EnrichedEmissionRecord[];
  purchaseRecords: EnrichedPurchaseRecord[];
}) {
  const purchasedProducts = new Set(
    purchaseRecords.map((record) => record.productId),
  );

  const productsWithEmissions = new Set(
    emissionRecords.map((record) => record.productId),
  );

  const intersection = Array.from(purchasedProducts).filter((id) =>
    productsWithEmissions.has(id),
  ).length;

  const percentage = (intersection / purchasedProducts.size) * 100;

  return <div>{percentage}% of products covered</div>;
}
