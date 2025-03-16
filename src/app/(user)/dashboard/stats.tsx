import { helper } from "~/app/_trpc/helper";

export default async function Stats() {
  const purchaseRecords = await helper.purchaseRecord.getFiltered.fetch();
  const emissionRecords = await helper.emissionRecord.getAll.fetch();

  const purchasedProducts = new Set(
    purchaseRecords.map((record) => record.Product.id),
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
