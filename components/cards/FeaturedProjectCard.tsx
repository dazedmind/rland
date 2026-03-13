"use client";

import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Bath, Bed, Car, LandPlot, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { urlNameToSlug } from "@/lib/utils";

interface ProjectDetailProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

type ProjectType = {
  houselot: string;
  condo: string;
};

type FeaturedUnit = {
  id: string;
  inventoryCode: string;
  block: number;
  lot: number;
  sellingPrice: number;
  model: {
    id: string;
    modelName: string;
    projectId: string;
    bathroom: number;
    carport: number;
    livingRoom: number;
    kitchen: number;
    lotArea: number;
    floorArea: number;
    photoUrl: string | null;
  };
};

type FeaturedItem = {
  project: {
    id: string;
    projectCode: string;
    projectName: string;
    location: string | null;
    photoUrl: string | null;
  };
  featuredUnits: FeaturedUnit[];
};

const DetailBadge = ({ icon: Icon, label, value }: ProjectDetailProps) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white backdrop-blur-md">
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex flex-col leading-tight text-white">
      <span className="text-sm font-bold">{value}</span>
      <span className="text-[10px] uppercase tracking-wider opacity-80">
        {label}
      </span>
    </div>
  </div>
);

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);

function FeaturedProjectCard() {
  const [items, setItems] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(true);
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
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/projects/featured");
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching featured projects:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Flatten all featured units across all projects into a single renderable list
  const allFeaturedUnits = items.flatMap((item: any) =>
    item.featuredUnits.map((unit: any) => ({ unit, project: item.project }))
  );

  if (loading) {
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
            {allFeaturedUnits.map(({ unit, project }: any) => {
              const imageUrl = unit.model.photoUrl ?? project.photoUrl ?? null;
              return (
                <div
                  key={unit.id}
                  className="flex-[0_0_100%] min-w-0 pl-4
                    md:flex-[0_0_50%]
                    lg:flex-[0_0_33.333%]"
                >
                  <div className="group relative w-full bg-white rounded-md overflow-hidden border border-border hover:shadow-sm transition-all duration-500">
            {/* IMAGE SECTION */}
            <div className="relative overflow-hidden aspect-video">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={project.projectName}
                  fill
                  className="object-cover transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-neutral-300 flex items-center justify-center">
                  <span className="text-neutral-500 text-sm">
                    {project.projectName}
                  </span>
                </div>
              )}

              {/* Floating Price Tag */}
              <div className="absolute top-4 left-0 backdrop-blur-md bg-linear-to-t from-secondary to-yellow-600 px-3 p-1.5  rounded-r-md shadow-sm z-10">
                <p className="text-xs font-semibold text-white uppercase tracking-wide">
                  {unit.model.modelName} Unit
                </p>
              </div>

              {/* DETAILS OVERLAY */}
              <div className="absolute inset-0 z-20 bg-linear-to-t from-primary-fg to-transparent flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="grid grid-cols-2 gap-4">
                  <DetailBadge icon={Bed}      value={unit.model.livingRoom}            label="Living"  />
                  <DetailBadge icon={Bath}     value={unit.model.bathroom}              label="Baths"   />
                  <DetailBadge icon={Car}      value={unit.model.carport}               label="Carport" />
                  <DetailBadge icon={LandPlot} value={`${unit.model.lotArea}sqm`}       label="Area"    />
                </div>
              </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="p-5 flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-800 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                  {project.projectName}
                </h3>
                <p className="text-sm text-neutral-500 flex items-center gap-1">
                  <MapPin className="size-4" /> {project.location ?? "-"} • {project.type === "houselot" ? "House & Lot" : "Condo"}
                </p>
                {/* <p className="text-xs text-neutral-400 mt-1">
                  {unit.model.modelName} Unit • Block {unit.block}, Lot {unit.lot}
                </p> */}
                <span className="flex flex-col mt-3">
                  <p className="text-xs uppercase text-muted-foreground font-medium">Starts at</p>
                  <p className="text-secondary text-2xl font-bold">{formatPrice(unit.sellingPrice)}</p>
                </span>
               
              </div>
              <Link href={`/projects/${urlNameToSlug(project.projectName)}?inventory=${unit.inventoryCode}`}>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Explore Unit
                </Button>
              </Link>
            </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrows - hidden on mobile */}
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

      {/* Indicators */}
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

export default FeaturedProjectCard;