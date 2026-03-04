"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bath, Bed, Car, LandPlot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProjectDetailProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

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
          <div key={i} className="h-80 bg-neutral-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (allFeaturedUnits.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4">
      {allFeaturedUnits.map(({ unit, project }: any) => {
        const imageUrl = unit.model.photoUrl ?? project.photoUrl ?? null;

        return (
          <div
            key={unit.id}
            className="group relative w-full bg-white rounded-lg overflow-hidden border border-border hover:shadow-sm transition-all duration-500"
          >
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
              <div className="absolute top-4 left-4 backdrop-blur-md bg-linear-to-br from-secondary to-yellow-600 px-3 py-1.5 rounded-lg shadow-sm z-10">
                <p className="text-sm font-bold text-white uppercase tracking-tight">
                  {formatPrice(unit.sellingPrice)}
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
                <p className="text-sm text-neutral-500 italic">
                  {project.location ?? "-"}
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  {unit.model.modelName} Unit • Block {unit.block}, Lot {unit.lot}
                </p>
              </div>
              <Link href={`/projects/${project.id}?inventory=${unit.inventoryCode}`}>
                <Button
                  variant="default"
                  className="w-full rounded-full bg-primary hover:bg-primary/90 text-white py-4 font-semibold transition-all active:scale-95"
                >
                  Explore Unit
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FeaturedProjectCard;