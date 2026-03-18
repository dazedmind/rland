import React from "react";
import PromoListSkeleton from "./PromoListSkeleton";

function PromoPageSkeleton() {
  return (
    <>
      <main>
        <section className="flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center py-16 space-y-8">
          <span className="flex flex-col gap-4 w-full">
            <span className="flex flex-col gap-2">
              <div className="h-10 w-80 bg-neutral-200 rounded animate-pulse" />
              <div className="h-5 w-96 bg-neutral-200 rounded animate-pulse" />
            </span>

            <PromoListSkeleton />
          </span>

          {/* CTA banner skeleton */}
          <div className="p-8 md:p-12 rounded-md bg-neutral-200 animate-pulse flex flex-col md:flex-row items-center justify-between gap-8 w-full">
            <div className="space-y-2 flex-1">
              <div className="h-8 w-64 bg-neutral-300 rounded animate-pulse" />
              <div className="h-5 w-80 bg-neutral-300 rounded animate-pulse" />
            </div>
            <div className="h-12 w-32 bg-neutral-300 rounded-md animate-pulse shrink-0" />
          </div>
        </section>
      </main>
    </>
  );
}

export default PromoPageSkeleton;
