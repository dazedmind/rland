import React from "react";

function CareerDetailsSkeleton() {
  return (
    <section className="flex flex-col items-start justify-center space-y-8 w-full lg:w-2/3">
      <span className="flex flex-col gap-4 w-full">
        {/* Title & Location */}
        <span className="space-y-2">
          <div className="h-10 w-3/4 bg-neutral-200 rounded animate-pulse" />
          <div className="h-6 w-1/2 bg-neutral-200 rounded animate-pulse" />
        </span>

        {/* Purpose and Scope */}
        <div className="space-y-2">
          <div className="h-7 w-48 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-neutral-200 rounded animate-pulse" />
        </div>

        {/* Responsibilities */}
        <div className="space-y-3">
          <div className="h-7 w-72 bg-neutral-200 rounded animate-pulse" />
          <div className="space-y-2 pl-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-4 bg-neutral-200 rounded animate-pulse"
                style={{ width: `${80 - i * 5}%` }}
              />
            ))}
          </div>
        </div>

        {/* Qualifications */}
        <div className="space-y-3">
          <div className="h-7 w-40 bg-neutral-200 rounded animate-pulse" />
          <div className="space-y-2 pl-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 bg-neutral-200 rounded animate-pulse"
                style={{ width: `${85 - i * 8}%` }}
              />
            ))}
          </div>
        </div>

        {/* Required Skills */}
        <div className="space-y-3">
          <div className="h-7 w-44 bg-neutral-200 rounded animate-pulse" />
          <div className="space-y-2 pl-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-4 bg-neutral-200 rounded animate-pulse"
                style={{ width: `${75 - i * 10}%` }}
              />
            ))}
          </div>
        </div>
      </span>

      {/* Apply button */}
      <div className="h-10 w-32 bg-neutral-200 rounded-md animate-pulse" />
    </section>
  );
}

export default CareerDetailsSkeleton;
