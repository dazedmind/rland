import React from "react";

function SearchResultsSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-48 bg-neutral-200 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}

export default SearchResultsSkeleton;
