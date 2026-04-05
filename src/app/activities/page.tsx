import { Suspense } from "react";
import { ActivitiesTabs } from "../../components/activities/ActivitiesTabs";

export default function ActivitiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory px-4 py-10 text-gray">
          <div className="mx-auto max-w-6xl animate-pulse">
            <div className="h-10 w-48 rounded bg-silver/30" />
            <div className="mt-4 h-6 w-2/3 max-w-md rounded bg-silver/20" />
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="aspect-[4/3] rounded-2xl bg-silver/25" />
              <div className="aspect-[4/3] rounded-2xl bg-silver/25" />
              <div className="aspect-[4/3] rounded-2xl bg-silver/25" />
            </div>
          </div>
        </div>
      }
    >
      <ActivitiesTabs />
    </Suspense>
  );
}
