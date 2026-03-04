import React from "react";
import NewsCardSkeleton from "./NewsCardSkeleton";
import NewsCardListSkeleton from "./NewsCardListSkeleton";

function NewsPageSkeleton() {
  return (
    <main>
      {/* Featured Story section */}
      <section className="px-8 md:px-16 xl:px-44 py-16">
        <div className="h-9 w-48 bg-neutral-200 rounded animate-pulse mb-4" />
        <NewsCardSkeleton />
      </section>

      {/* Latest News section */}
      <section className="px-8 md:px-16 xl:px-44 py-16 bg-neutral-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="h-9 w-48 bg-neutral-200 rounded animate-pulse" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 bg-neutral-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>
        <NewsCardListSkeleton />
      </section>
    </main>
  );
}

export default NewsPageSkeleton;
