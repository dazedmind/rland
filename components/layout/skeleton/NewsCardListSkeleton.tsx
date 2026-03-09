import React from "react";

function NewsCardListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col bg-white rounded-md overflow-hidden border border-neutral-100 shadow-sm"
        >
          <div className="h-48 bg-neutral-200 animate-pulse" />
          <div className="p-6 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="h-3 w-20 bg-neutral-200 rounded animate-pulse" />
              <div className="h-3 w-16 bg-neutral-200 rounded animate-pulse" />
            </div>
            <div className="h-6 w-full bg-neutral-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-neutral-200 rounded animate-pulse" />
            <div className="h-10 w-24 bg-neutral-200 rounded-full animate-pulse mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsCardListSkeleton;
