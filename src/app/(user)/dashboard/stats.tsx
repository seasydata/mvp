import { type EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";
import { type EnrichedPurchaseRecord } from "~/server/api/routers/purchaserecords";
import { PercentIcon } from "lucide-react";

export default function Stats({
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg-and-up:grid-cols-2 px-40 gap-6">
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-6 shadow-sm border border-cyan-200">
          <div className="flex items-center gap-4">
            <div className="bg-cyan-600 text-white p-3 rounded-full">
              <PercentIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-cyan-700 font-medium">
                Answer Rate
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

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-3 rounded-full">
              Todays date:
            </div>
            <div className="text-2xl font-bold text-cyan-900">
              {new Date().toDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
