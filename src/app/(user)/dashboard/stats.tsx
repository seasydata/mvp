import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";
import { type EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import { BarChartIcon, LayersIcon, PercentIcon } from "lucide-react";

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

  const percentage =
    Math.round((intersection / purchasedProducts.size) * 100) || 0;

  // Get total number of products
  const totalProducts = purchasedProducts.size;

  // Get total records
  const totalRecords = emissionRecords.length;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-cyan-900">Overview</h2>

      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-6 shadow-sm border border-cyan-200">
          <div className="flex items-center gap-4">
            <div className="bg-cyan-600 text-white p-3 rounded-full">
              <PercentIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-cyan-700 font-medium">
                Products Covered
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-cyan-900">
                  {percentage}%
                </h3>
                <span className="text-sm text-cyan-600">of products</span>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-cyan-600 h-2.5 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 shadow-sm border border-emerald-200">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-600 text-white p-3 rounded-full">
              <LayersIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-emerald-700 font-medium">
                Total Products
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-emerald-900">
                  {totalProducts}
                </h3>
                <span className="text-sm text-emerald-600">
                  products purchased
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-3 rounded-full">
              <BarChartIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">
                Emission Records
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-blue-900">
                  {totalRecords}
                </h3>
                <span className="text-sm text-blue-600">total records</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
