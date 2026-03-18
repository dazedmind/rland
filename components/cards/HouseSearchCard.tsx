import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { MapPin, GalleryVerticalEnd, LayoutTemplate } from "lucide-react";
import aeMeadowUnit from "@/public/ae-meadow-unit.jpg";
import floorPlan from "@/public/ground floor.jpg";
import { cn } from "@/lib/utils";

export type SearchUnit = {
  inventory: {
    id: string;
    projectCode: string;
    inventoryCode: string;
    modelName: string;
    block: number;
    lot: number;
    sellingPrice: number;
  };
  project: {
    id: string;
    projectName: string;
    slug: string;
    location: string | null;
    type: string;
    photoUrl?: string | null;
  };
  details: {
    lotArea: number;
    floorArea: number;
    photoUrl: string | null;
  } | null;
};

export type SearchModelItem = {
  project: {
    id: string;
    projectName: string;
    slug: string;
    location: string | null;
    type: string;
    photoUrl?: string | null;
  };
  modelName: string;
  startingPrice: number;
  details: { lotArea: number; floorArea: number; photoUrl: string | null } | null;
};

type HouseSearchCardProps = {
  /** @deprecated Use unit prop instead */
  price?: string;
  unit?: SearchUnit;
  modelCard?: SearchModelItem;
};

function HouseSearchCard({ price, unit, modelCard }: HouseSearchCardProps) {
  const [cardView, setCardView] = useState<"default" | "floorplan">("default");

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0,
    }).format(amount);

  const displayPrice = modelCard
    ? modelCard.startingPrice
    : unit
      ? unit.inventory.sellingPrice
      : price
        ? parseInt(price, 10)
        : 0;

  const projectName   = modelCard?.project.projectName ?? unit?.project.projectName ?? "Arcoe Estates";
  const modelName     = modelCard?.modelName ?? unit?.inventory.modelName ?? "Meadow Unit";
  const location      = modelCard?.project.location ?? unit?.project.location ?? "Angeles City, Pampanga";
  const typeLabel     =
    (modelCard?.project.type ?? unit?.project.type) === "houselot"
      ? "House & Lot"
      : (modelCard?.project.type ?? unit?.project.type) === "condo"
        ? "Condo"
        : "House & Lot";
  const lotArea       = modelCard?.details?.lotArea ?? unit?.details?.lotArea ?? 1000;
  const floorArea     = modelCard?.details?.floorArea ?? unit?.details?.floorArea ?? 1000;
  const photoUrl      =
    modelCard?.details?.photoUrl ??
    unit?.details?.photoUrl ??
    (unit?.project ?? modelCard?.project)?.photoUrl ??
    null;
  const project       = modelCard?.project ?? unit?.project;
  const inventoryCode = unit?.inventory.inventoryCode;

  const detailsUrl = project
    ? inventoryCode
      ? `/projects/${project.slug}?inventory=${inventoryCode}`
      : `/projects/${project.slug}`
    : "#";

  return (
    <div className="flex flex-col lg:flex-row w-full justify-between border border-border rounded-md overflow-hidden bg-white hover:shadow-md transition-all duration-300">

      <div className="flex flex-col md:flex-row">
        {/* LEFT — image */}
        <div className="relative w-full aspect-square lg:h-auto md:w-[200px] lg:w-[200px] shrink-0 overflow-hidden bg-neutral-100">
          <div className="grid grid-cols-1 w-full h-full">
            {/* Unit photo */}
            <div
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-300 w-full h-full",
                cardView === "default" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              <Image
                src={photoUrl ?? aeMeadowUnit}
                alt={modelName}
                fill
                className="object-cover"
              />
            </div>

            {/* Floor plan */}
            <div
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-300 w-full h-full",
                cardView === "floorplan" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              <Image
                src={floorPlan}
                alt="Floor Plan"
                fill
                className="object-cover p-4"
              />
            </div>
          </div>

          {/* Type badge */}
          <div className="absolute top-3 left-0 z-20  bg-linear-to-t from-secondary to-yellow-600 px-2.5 py-1 rounded-r-lg">
            <p className="text-[10px] tracking-[0.12em] uppercase font-semibold text-primary-foreground">
              {typeLabel}
            </p>
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setCardView(cardView === "default" ? "floorplan" : "default")}
            className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-primary px-2.5 py-1.5 rounded-sm text-primary-foreground text-[11px] font-medium hover:bg-primary/80 transition-colors duration-200 cursor-pointer"
          >
            {cardView === "default"
              ? <><LayoutTemplate className="size-3.5" /> Floor Plan</>
              : <><GalleryVerticalEnd className="size-3.5" /> Unit Photo</>
            }
          </button>
        </div>

        {/* MIDDLE — details */}
        <div className="flex flex-col justify-between flex-1 p-6 gap-4">
          <div className="flex flex-col gap-3">
            {/* Project + model */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-primary leading-tight">{projectName}</h2>
                <span className="text-[10px] tracking-[0.12em] uppercase font-semibold bg-primary text-white px-2 py-0.5 rounded-[3px]">
                  {modelName}
                </span>
              </div>
              <p className="text-sm text-neutral-500 flex items-center gap-1">
                <MapPin className="size-3.5 shrink-0" />
                {location}
              </p>
            </div>

            {/* Amber rule */}
            <span className="block w-7 h-[1.5px] bg-amber-400" />

            {/* Specs */}
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <div className="flex flex-col">
                <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-400 font-medium">Lot Area</p>
                <p className="text-sm font-semibold text-primary">{lotArea} sqm</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-400 font-medium">Floor Area</p>
                <p className="text-sm font-semibold text-primary">{floorArea} sqm</p>
              </div>
              {cardView === "floorplan" && (
                <div className="flex flex-col">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-400 font-medium">GF Total</p>
                  <p className="text-sm font-semibold text-primary">34.50 sqm</p>
                </div>
              )}
            </div>

            {cardView === "floorplan" && (
              <p className="text-xs text-neutral-500 leading-relaxed">
                <span className="font-semibold text-neutral-700">Includes:</span>{" "}
                Living Area, Dining Area, Kitchen, 2 T&B, Carport, Service Area
              </p>
            )}
            {cardView === "default" && (
                  <p className="text-xs text-neutral-500 leading-relaxed">
                  <span className="font-semibold text-neutral-700">Amenities:</span>{" "}
                  Swimming Pool, Basketball Court, Jogging Trail, Glamping Hub
                </p>
            )}
          </div>
        </div>
      </div>


      {/* RIGHT — price + CTA */}
      <div className="flex flex-col md:flex-row lg:flex-col items-start md:items-center justify-between lg:items-start bg-primary text-white p-6 w-full lg:w-[220px] shrink-0 lg:border-l border-t lg:border-t-0 border-white/10 gap-4">
      
        <div className="flex flex-col gap-1">
          <p className="text-[10px] tracking-[0.14em] uppercase text-white/60 font-medium">
            {modelCard ? "Starts at" : "Price"}
          </p>
          <p className="text-2xl font-bold text-secondary leading-tight">
            {formatCurrency(displayPrice)}
          </p>
          <p className="text-xs text-neutral-300">Eligible for Loan and Installment Plan</p>

        </div>

        <Link href={detailsUrl} className="w-full md:w-auto lg:w-full shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="w-full md:w-auto bg-transparent hover:bg-white hover:text-primary text-white border-white/50 rounded-md"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HouseSearchCard;