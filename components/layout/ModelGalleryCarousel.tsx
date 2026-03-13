"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ModelGalleryCarouselProps = {
  images: string[];
  alt?: string;
  className?: string;
};

function ModelGalleryCarousel({
  images,
  alt = "Project",
  className = "",
}: ModelGalleryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {/* Main image - no arrows */}
      <div className="overflow-hidden rounded-md" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {images.map((src, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 pl-4">
              <div className="relative aspect-square bg-neutral-200 rounded-md overflow-hidden">
                <Image
                  src={src}
                  alt={`${alt} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail strip - hide scroll arrows when only one image */}
      {images.length >= 1 && (
        <div className="relative">
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md hover:bg-neutral-50 transition-all border border-border cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-4 text-neutral-800" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md hover:bg-neutral-50 transition-all border border-border cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="size-4 text-neutral-800" />
              </button>
            </>
          )}

          <div
            className={`overflow-hidden bg-white ${images.length > 1 ? "px-10" : ""}`}
          >
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-hidden">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(i);
                  }}
                  className={`relative shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    i === selectedIndex
                      ? "border-primary ring-1 ring-primary"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === selectedIndex}
                >
                  <Image
                    src={src}
                    alt={`${alt} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelGalleryCarousel;
