import React from "react";

function NewsArticleSkeleton() {
  return (
    <section className="px-8 md:px-16 lg:px-44 py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-6 mb-6">
          <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse" />
        </div>

        <article className="space-y-8">
          <div className="h-12 w-full max-w-2xl bg-neutral-200 rounded animate-pulse" />
          <div className="flex flex-wrap items-center gap-6">
            <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
            <div className="h-6 w-20 bg-neutral-200 rounded-full animate-pulse" />
          </div>

          <div className="w-full h-[400px] rounded-2xl bg-neutral-200 animate-pulse" />

          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-4 bg-neutral-200 rounded animate-pulse"
                style={{ width: `${100 - i * 5}%` }}
              />
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-neutral-100 flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-16 bg-neutral-200 rounded animate-pulse" />
              ))}
            </div>
            <div className="h-6 w-28 bg-neutral-200 rounded animate-pulse" />
          </div>
        </article>
      </div>
    </section>
  );
}

export default NewsArticleSkeleton;
