"use server";

import EmissionRecords from "./emissionrecords";
import Purchased from "./purchased";

export default async function Dashboard() {
  return (
    <div className="max-w-screen flex min-h-screen flex-col text-cyan-900 pb-10 font-sans text-2xl">
      <EmissionRecords />
      <Purchased />
    </div>
  );
}
