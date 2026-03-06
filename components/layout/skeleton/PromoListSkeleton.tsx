import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function PromoListSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="
            flex flex-col md:flex-row w-full
            bg-white dark:bg-neutral-900
            rounded-[6px] overflow-hidden
            shadow-[0_2px_24px_rgba(0,0,0,0.07)]
          "
        >
          {/* Image skeleton */}
          <Skeleton className="w-full md:w-1/2 lg:w-1/3 xl:w-1/5 aspect-square shrink-0 rounded-l-lg overflow-hidden" />

          {/* Content skeleton */}
          <div className="flex flex-col justify-between flex-1 px-8 py-8 gap-4">
            <div className="flex flex-col gap-4">
              {/* Gold rule skeleton */}
              <Skeleton className="w-7 h-[1.5px] rounded-none" />

              {/* Title */}
              <Skeleton className="w-2/3 h-7 rounded-[3px]" />

              {/* Date row */}
              <Skeleton className="w-32 h-3 rounded-[3px]" />

              <hr className="border-neutral-100 dark:border-neutral-800" />

              {/* Description lines */}
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-3 rounded-[3px]" />
                <Skeleton className="w-5/6 h-3 rounded-[3px]" />
                <Skeleton className="w-4/6 h-3 rounded-[3px]" />
              </div>
            </div>

            {/* CTA button */}
            <div className="mt-4">
              <Skeleton className="w-36 h-10 rounded-[3px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PromoListSkeleton