"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProjectImageCarouselProps = {
  images: string[];
  alt?: string;
  className?: string;
};

function ProjectImageCarousel({ images, alt = "Project", className = "" }: ProjectImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!images.length) return null;

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      <div className="relative">
        <div className="overflow-hidden rounded-md" ref={emblaRef}>
          <div className="flex touch-pan-y -ml-4">
            {images.map((src, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] min-w-0 pl-4
                  md:flex-[0_0_50%]
                  lg:flex-[0_0_33.333%]"
              >
                <div className="relative h-80 bg-neutral-200 rounded-md overflow-hidden">
                  <Image
                    src={src}
                    alt={`${alt} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33.333vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows - hidden on mobile */}
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-lg hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-6 text-neutral-800" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-lg hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="size-6 text-neutral-800" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === selectedIndex
                ? "w-6 bg-primary"
                : "w-2 bg-neutral-300 hover:bg-neutral-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectImageCarousel;
