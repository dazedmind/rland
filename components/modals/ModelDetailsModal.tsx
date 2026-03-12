"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Bed,
  Bath,
  Car,
  LandPlot,
  Utensils,
  Scan,
  PhilippinePeso,
} from "lucide-react";
import ModelGalleryCarousel from "@/components/layout/ModelGalleryCarousel";
import { priceFormatter } from "@/app/utils/priceFormatter";
import type { ProjectModel, ProjectBase } from "@/app/utils/types";
import { Button } from "../ui/button";

type InventoryItem = {
  modelId?: string;
  model?: { id: string };
  sellingPrice: number;
};

type GalleryItem = { imageUrl: string; modelId: string | null };

type ModelDetailsModalProps = {
  model: ProjectModel | null;
  project: ProjectBase | null;
  inventory: InventoryItem[];
  gallery?: GalleryItem[];
  isOpen: boolean;
  onClose: () => void;
};

const specIcons = [
  { icon: Bed, label: "Bedrooms", key: "livingRoom" as const },
  { icon: Bath, label: "Bathrooms", key: "bathroom" as const },
  { icon: Car, label: "Carports", key: "carport" as const },
  { icon: LandPlot, label: "Lot Area", key: "lotArea" as const },
  { icon: Scan, label: "Floor Area", key: "floorArea" as const },
  { icon: Utensils, label: "Kitchen", key: "kitchen" as const },
];

function ModelDetailsModal({
  model,
  project,
  inventory,
  gallery = [],
  isOpen,
  onClose,
}: ModelDetailsModalProps) {
  const modelUnits = inventory.filter(
    (u) => (u.modelId ?? u.model?.id) === model?.id,
  );
  const { minPrice, maxPrice } =
    modelUnits.length > 0
      ? {
          minPrice: Math.min(...modelUnits.map((u) => u.sellingPrice)),
          maxPrice: Math.max(...modelUnits.map((u) => u.sellingPrice)),
        }
      : { minPrice: 0, maxPrice: 0 };

  /** Main photo = model photoUrl; other photos = project_gallery (model-specific or project-level) */
  const modelGallery = gallery.filter(
    (g) => g.modelId === null || g.modelId === model?.id,
  );
  const mainPhoto = model?.details?.photoUrl;
  const galleryPhotos = modelGallery.map((g) => g.imageUrl);
  const images = [...(mainPhoto ? [mainPhoto] : []), ...galleryPhotos];

  if (!model) return null;

  const details = model.details;
  const amenities = project?.amenities ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="w-[calc(100%-2rem)] max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0"
        showCloseButton={true}
      >
        <DialogHeader className="px-6 pt-6 pb-2 shrink-0 text-start">
          <DialogTitle className="text-2xl font-bold text-primary">
            {model.modelName} Unit
            <p className="text-sm text-neutral-600 font-normal">
              {project?.projectName}
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 px-4 md:px-6 pb-6 overflow-y-auto flex-1">
          {/* Gallery - full width on mobile, 1/3 on desktop */}
          <div className="relative w-full md:w-1/3 md:shrink-0 rounded-md overflow-visible">
            {images.length > 0 ? (
              <ModelGalleryCarousel images={images} alt={model.modelName} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                <span className="text-sm">No image available</span>
              </div>
            )}
          </div>

          {/* HOUSE MODEL DETAILS */}
          <div className="space-y-6 w-full md:w-2/3 min-w-0">
            {/* Description */}
            {details?.description && (
              <div>
                <h3 className="text-lg font-bold text-neutral-800 mb-2">
                  Description
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {details.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-bold text-neutral-800 mb-3">
                Specifications
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {specIcons.map(({ icon: Icon, label, key }) => {
                  const val = details?.[key];
                  const display =
                    key === "lotArea" || key === "floorArea"
                      ? `${val ?? 0} sqm`
                      : (val ?? 0);
                  return (
                    <div
                      key={key}
                      className="flex items-center gap-2 p-3 rounded-md border border-border bg-neutral-50"
                    >
                      <Icon className="size-5 text-neutral-400 shrink-0" />
                      <span>
                        <p className="text-xs text-neutral-500">{label}</p>
                        <p className="text-sm font-semibold text-neutral-800">
                          {display}
                        </p>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-neutral-800 mb-3">
                  Project Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((a) => (
                    <span
                      key={a}
                      className="px-3 py-1.5 bg-neutral-100 rounded-md text-sm font-medium text-neutral-700"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            {(minPrice > 0 || maxPrice > 0) && (
              <div className="rounded-md border border-border bg-primary/5 p-4">
                <h3 className="text-lg font-bold text-neutral-800 mb-2 flex items-center gap-2">
                  <PhilippinePeso className="size-5 text-primary" />
                  Starts at
                </h3>
                <p className="text-xl font-bold text-primary">
                  {minPrice === maxPrice
                    ? priceFormatter(minPrice)
                    : `${priceFormatter(minPrice)} – ${priceFormatter(maxPrice)}`}
                </p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="px-6 py-6 md:pb-6 md:pt-0">
          <Button variant="secondary" size="sm" onClick={onClose}>
            {" "}
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModelDetailsModal;
