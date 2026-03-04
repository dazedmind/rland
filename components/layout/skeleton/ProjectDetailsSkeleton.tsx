import React from "react";

function ProjectDetailsSkeleton() {
  return (
    <main className="relative">
      {/* Side nav placeholder */}
      <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg w-32">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 bg-neutral-200 rounded animate-pulse" />
          ))}
        </div>
      </nav>

      <div className="flex flex-col items-start px-8 md:px-16 lg:px-44 xl:px-64">
        {/* Back link */}
        <div className="pt-16 w-full">
          <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse" />
        </div>

        {/* Specification section */}
        <section className="flex flex-col gap-8 w-full pt-8">
          <div className="h-48 w-120 bg-neutral-200 rounded-xl animate-pulse" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
            <div className="space-y-2">
              <div className="h-10 w-64 bg-neutral-200 rounded animate-pulse" />
              <div className="h-6 w-40 bg-neutral-200 rounded animate-pulse" />
            </div>
            <div className="h-10 w-40 bg-neutral-200 rounded animate-pulse" />
          </div>
          <div className="space-y-2 w-full max-w-2xl">
            <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-neutral-200 rounded animate-pulse" />
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full border border-border rounded-lg p-8">
            <div className="h-8 w-48 bg-neutral-200 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-2">
                  <div className="h-10 w-10 bg-neutral-200 rounded animate-pulse shrink-0" />
                  <div className="space-y-1 flex-1">
                    <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse" />
                    <div className="h-6 w-24 bg-neutral-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-80 bg-neutral-200 rounded-xl animate-pulse" />
        </section>

        {/* Amenities section */}
        <section className="flex flex-col gap-8 w-full py-16">
          <div className="h-10 w-48 bg-neutral-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-neutral-200 rounded-md animate-pulse" />
            ))}
          </div>
        </section>

        {/* Landmarks section */}
        <section className="flex flex-col gap-8 w-full py-16 bg-neutral-100 -mx-8 md:-mx-16 lg:-mx-44 xl:-mx-64 px-8 md:px-16 lg:px-44 xl:px-64">
          <div className="h-10 w-56 bg-neutral-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col gap-2 p-4">
                <div className="h-8 w-32 bg-neutral-200 rounded animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 bg-neutral-200 rounded animate-pulse" style={{ width: `${80 - j * 10}%` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* House Models section */}
        <section className="flex flex-col gap-8 w-full py-16">
          <div className="h-10 w-48 bg-neutral-200 rounded animate-pulse" />
          <div className="flex flex-col gap-8 w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border rounded-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-4 p-4">
                  <div className="h-48 w-full lg:w-1/2 bg-neutral-200 rounded-lg animate-pulse" />
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-8 w-3/4 bg-neutral-200 rounded animate-pulse" />
                    <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
                    <div className="h-10 w-48 bg-neutral-200 rounded animate-pulse mt-auto" />
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:flex justify-between gap-4 p-8 border-t border-border">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex gap-2">
                      <div className="h-8 w-8 bg-neutral-200 rounded animate-pulse shrink-0" />
                      <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reserve section */}
        <section className="w-full py-16">
          <div className="rounded-lg overflow-hidden">
            <div className="h-24 bg-neutral-200 rounded-t-lg animate-pulse" />
            <div className="h-32 bg-neutral-300 rounded-b-lg animate-pulse" />
          </div>
        </section>

        {/* Contact section */}
        <section className="w-full py-16">
          <div className="flex flex-col xl:flex-row gap-8 w-full">
            <div className="flex flex-col gap-4 flex-1">
              <div className="h-12 w-3/4 bg-neutral-200 rounded animate-pulse" />
              <div className="h-5 w-1/2 bg-neutral-200 rounded animate-pulse" />
              <div className="h-24 w-full lg:w-1/2 bg-neutral-200 rounded-lg animate-pulse" />
            </div>
            <div className="h-96 w-full lg:w-1/2 bg-neutral-200 rounded-lg animate-pulse" />
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProjectDetailsSkeleton;
