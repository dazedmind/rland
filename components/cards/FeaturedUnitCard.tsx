"use client";

import React from "react";
import Image from "next/image";
import { Bath, Bed, Car, LandPlot, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { priceFormatter } from "@/app/utils/priceFormatter";
import { DetailBadge } from "./DetailBadge";

export type FeaturedUnit = {
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

export type FeaturedProject = {
  id: string;
  projectCode: string;
  projectName: string;
  slug: string;
  location: string | null;
  photoUrl: string | null;
  type?: string;
};

type FeaturedUnitCardProps = {
  unit: FeaturedUnit;
  project: FeaturedProject;
};

export function FeaturedUnitCard({ unit, project }: FeaturedUnitCardProps) {
  const imageUrl = unit.model.photoUrl ?? project.photoUrl ?? null;

  return (
    <div className="group relative w-full bg-white rounded-xl overflow-hidden hover:shadow-sm transition-all duration-500">
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
            <span className="text-neutral-500 text-sm">{project.projectName}</span>
          </div>
        )}

        {/* Floating Price Tag */}
        {/* <div className="absolute top-4 left-0 backdrop-blur-md bg-linear-to-t from-secondary to-yellow-600 px-3 p-1.5 rounded-r-md shadow-sm z-10">
          <p className="text-xs font-semibold text-white uppercase tracking-wide">
            {unit.model.modelName} Unit
          </p>
        </div> */}

        {/* DETAILS OVERLAY */}
        <div className="absolute inset-0 z-20 bg-linear-to-t from-primary-fg to-transparent flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="grid grid-cols-2 gap-4">
            <DetailBadge icon={Bed} value={unit.model.livingRoom} label="Living" />
            <DetailBadge icon={Bath} value={unit.model.bathroom} label="Baths" />
            <DetailBadge icon={Car} value={unit.model.carport} label="Carport" />
            <DetailBadge icon={LandPlot} value={`${unit.model.lotArea}sqm`} label="Area" />
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-bold text-neutral-800 line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {project.projectName}
          </h1>
          <p className="text-sm text-neutral-500 flex items-center gap-1">
            <MapPin className="size-4" /> {project.location ?? "-"} •{" "} 
            {project.type === "houselot"
              ? "House & Lot"
              : project.type === "townhouse"
                ? "Townhouse"
                : "Condo"} {" "}
            •{" "} {unit.model.modelName} Unit

          </p>
          <span className="flex flex-col mt-3">
            <p className="text-xs uppercase text-muted-foreground font-medium">Starts at</p>
            <p className="text-primary text-2xl font-bold">{priceFormatter(unit.sellingPrice)}</p>
          </span>
        </div>
        <Link href={`/projects/${project.slug}?inventory=${unit.inventoryCode}`} aria-label="Explore Unit">
          <Button variant="primary" size="sm" className="w-full">
            <Search className="size-4" strokeWidth={3} /> Explore Unit
          </Button>
        </Link>
      </div>
    </div>
  );
}
