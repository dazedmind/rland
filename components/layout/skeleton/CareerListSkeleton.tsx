import React from "react";

function CareerListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 border border-border rounded-lg p-4 w-full"
        >
          <div className="h-6 w-3/4 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-neutral-200 rounded animate-pulse" />
          <div className="h-9 w-24 bg-neutral-200 rounded animate-pulse mt-2" />
        </div>
      ))}
    </div>
  );
}

export default CareerListSkeleton;
