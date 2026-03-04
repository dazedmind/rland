import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Fullscreen, GalleryVerticalEnd } from "lucide-react";
import aeMeadowUnit from "@/public/ae-meadow-unit.jpg";
import floorPlan from "@/public/ground floor.jpg";
import { useState } from "react";
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

/** Grouped model card (one per model, starting price only) */
export type SearchModelItem = {
  project: {
    id: string;
    projectName: string;
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
  /** One card per model (Gold, Platinum, etc.) with starting price */
  modelCard?: SearchModelItem;
};

function HouseSearchCard({ price, unit, modelCard }: HouseSearchCardProps) {
  const [cardView, setCardView] = useState<string>("default");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Resolve display values from unit, modelCard, or legacy price
  const displayPrice = modelCard
    ? modelCard.startingPrice
    : unit
      ? unit.inventory.sellingPrice
      : price
        ? parseInt(price, 10)
        : 0;
  const projectName = modelCard?.project.projectName ?? unit?.project.projectName ?? "Arcoe Estates";
  const modelName = modelCard?.modelName ?? unit?.inventory.modelName ?? "Meadow Unit";
  const location = modelCard?.project.location ?? unit?.project.location ?? "Angeles City, Pampanga";
  const typeLabel =
    (modelCard?.project.type ?? unit?.project.type) === "houselot"
      ? "House & Lot"
      : (modelCard?.project.type ?? unit?.project.type) === "condo"
        ? "Condo"
        : "House & Lot";
  const lotArea = modelCard?.details?.lotArea ?? unit?.details?.lotArea ?? 1000;
  const floorArea = modelCard?.details?.floorArea ?? unit?.details?.floorArea ?? 1000;
  const photoUrl =
    modelCard?.details?.photoUrl ??
    unit?.details?.photoUrl ??
    (unit?.project ?? modelCard?.project)?.photoUrl ??
    null;
  const projectId = modelCard?.project.id ?? unit?.project.id;
  const inventoryCode = unit?.inventory.inventoryCode;

  const detailsUrl = projectId
    ? inventoryCode
      ? `/projects/${projectId}?inventory=${inventoryCode}`
      : `/projects/${projectId}`
    : "#";

  return (
    <div className="flex flex-col lg:flex-row w-full justify-between border-border border rounded-lg overflow-hidden bg-white">
      {/* DETAILS PART - Using a grid container to hold both views in the same space */}
      <div className="grid grid-cols-1 flex-1">
        {/* DEFAULT VIEW */}
        <div
          className={cn(
            "col-start-1 row-start-1 flex flex-row gap-4 p-4 transition-opacity duration-300",
            cardView === "default"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          )}
          style={{ minHeight: "220px" }}
        >
          <div className="shrink-0">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={modelName}
                width={180}
                height={180}
                className="rounded-md object-cover aspect-square border-border border shadow-sm"
              />
            ) : (
              <Image
                src={aeMeadowUnit}
                alt="Residential Icon"
                width={180}
                height={180}
                className="rounded-md object-cover aspect-square border-border border shadow-sm"
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-neutral-800">
              {projectName}
            </h1>
            <p className="bg-primary px-2 py-0.5 rounded text-sm text-white font-bold w-fit">
              {modelName}
            </p>
            <p className="text-sm text-muted-foreground">{location}</p>
            <p className="text-sm text-muted-foreground">{typeLabel}</p>

            <div className="mt-2 space-y-0.5">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">Lot Area:</span>{" "}
                {lotArea} sqm
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">Floor Area:</span>{" "}
                {floorArea} sqm
              </p>
            </div>

            <button
              onClick={() => setCardView("floorplan")}
              className="mt-auto flex flex-row items-center gap-1 text-sm text-primary font-bold hover:underline"
            >
              <Fullscreen className="size-4" />
              Show Floor Plan
            </button>
          </div>
        </div>

        {/* FLOORPLAN VIEW */}
        <div
          className={cn(
            "col-start-1 row-start-1 flex flex-row gap-4 p-4 transition-opacity duration-300",
            cardView === "floorplan"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          )}
        >
          <div className="shrink-0">
            <Image
              src={floorPlan}
              alt="Floor Plan"
              width={180}
              height={180}
              className="rounded-md object-cover aspect-square border-border border shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-neutral-800">
              {projectName}
            </h1>
            <p className="bg-primary px-2 py-0.5 rounded text-sm text-white font-bold w-fit">
              {modelName}
            </p>
            <div className="max-w-[300px]">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">Includes:</span> Living
                Area, Dining Area, Kitchen, 2 T&B, Carport, Service Area
              </p>
            </div>

            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">GF Total Area:</span>{" "}
                34.50 sqm
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">Floor Area:</span>{" "}
                {floorArea} sqm
              </p>
            </div>

            <button
              onClick={() => setCardView("default")}
              className="mt-auto flex flex-row items-center gap-1 text-sm text-primary font-bold hover:underline"
            >
              <GalleryVerticalEnd className="size-4" />
              Show Unit Photo
            </button>
          </div>
        </div>
      </div>

      {/* BLUE PART */}
      <div className="flex flex-col justify-between bg-primary text-white p-6 w-full lg:w-[280px] shrink-0 lg:border-l border-white/10">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider opacity-80">
            Price starts at
          </p>
          <p className="text-3xl font-bold text-secondary">
            {formatCurrency(displayPrice)}
          </p>
          <p className="text-[10px] leading-tight opacity-70">
            Eligible for Loan and Installment Plan
          </p>
        </div>

        <Link href={detailsUrl}>
          <Button
            variant="outline"
            className="w-full mt-6 bg-transparent hover:bg-white hover:text-primary text-white border-white"
          >
            View Full Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HouseSearchCard;
