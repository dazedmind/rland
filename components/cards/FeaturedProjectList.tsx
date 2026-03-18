"use client";

import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FeaturedUnitCard, type FeaturedUnit, type FeaturedProject } from "./FeaturedUnitCard";

type FeaturedItem = {
  project: FeaturedProject;
  featuredUnits: FeaturedUnit[];
};

const fetchFeaturedProjects = async (): Promise<FeaturedItem[]> => {
  const res = await fetch("/api/projects/featured");
  if (!res.ok) throw new Error("Failed to fetch featured projects");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

function FeaturedProjectList() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnapCount, setScrollSnapCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["projects", "featured"],
    queryFn: fetchFeaturedProjects,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnapCount(emblaApi.scrollSnapList().length);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      void emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const allFeaturedUnits = items.flatMap((item) =>
    item.featuredUnits.map((unit) => ({ unit, project: item.project }))
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-80 bg-neutral-200 rounded-md animate-pulse" />
        ))}
      </div>
    );
  }

  if (allFeaturedUnits.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y -ml-4">
            {allFeaturedUnits.map(({ unit, project }) => (
              <div
                key={unit.id}
                className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <FeaturedUnitCard unit={unit} project={project} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 hidden xl:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-border hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="size-6 text-neutral-800" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute -right-20 top-1/2 -translate-y-1/2 z-10 hidden xl:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-border hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          aria-label="Next"
        >
          <ChevronRight className="size-6 text-neutral-800" />
        </button>
      </div>

      {scrollSnapCount > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: scrollSnapCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === selectedIndex ? "w-6 bg-primary" : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selectedIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedProjectList;
