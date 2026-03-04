import React from "react";

function NewsCardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
      <div className="h-64 lg:min-h-[400px] bg-neutral-200 animate-pulse" />
      <div className="p-8 flex flex-col gap-4">
        <div className="h-3 w-24 bg-neutral-200 rounded animate-pulse" />
        <div className="h-10 w-3/4 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-neutral-200 rounded animate-pulse" />
        <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse mt-4" />
      </div>
    </div>
  );
}

export default NewsCardSkeleton;
