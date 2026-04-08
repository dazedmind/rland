"use client";

import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

/** Slightly longer than motion transition so Radix exit can finish before we drop displayModel */
const CLOSE_CLEAR_MS = 400;

function ModelDetailsModal({
  model,
  project,
  inventory,
  gallery = [],
  isOpen,
  onClose,
}: ModelDetailsModalProps) {
  const reduceMotion = useReducedMotion();
  const lastModelRef = useRef<ProjectModel | null>(null);
  if (model) lastModelRef.current = model;
  const displayModel = model ?? lastModelRef.current;

  const transitionDuration = reduceMotion ? 0.05 : 0.35;

  useEffect(() => {
    if (!isOpen) {
      const id = window.setTimeout(() => {
        lastModelRef.current = null;
      }, CLOSE_CLEAR_MS);
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

  const modelUnits = inventory.filter(
    (u) => (u.modelId ?? u.model?.id) === displayModel?.id,
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
    (g) => g.modelId === null || g.modelId === displayModel?.id,
  );

  const amenities = project?.amenities ?? [];
  const mainPhoto = displayModel?.details?.photoUrl;
  const galleryPhotos = modelGallery.map((g) => g.imageUrl);

  const images = [...(mainPhoto ? [mainPhoto] : []), ...galleryPhotos];

  if (!displayModel) return null;

  const details = displayModel.details;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="w-full h-dvh max-h-dvh overflow-hidden flex flex-col p-0 gap-0 max-w-[100vw] border-0 bg-transparent shadow-none sm:max-w-[100vw] animate-none data-[state=closed]:pointer-events-none"
        showCloseButton={false}
      >
        <motion.div
          key={displayModel.id}
          className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background"
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={
            isOpen
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.94, y: 28 }
          }
          transition={{
            duration: transitionDuration,
            ease: [0.32, 0.72, 0, 1],
          }}
          style={{ transformOrigin: "center center" }}
        >
        <DialogHeader className="px-6 pt-6 pb-2 shrink-0 text-start">
          <DialogTitle className="text-2xl font-bold text-primary">
            {displayModel.modelName} Unit
            <p className="text-sm text-neutral-600 font-normal">
              {project?.projectName}
            </p>
          </DialogTitle>
          <DialogDescription className="sr-only">
            House model details, specifications, and pricing for {displayModel.modelName} at {project?.projectName}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 px-4 md:px-6 pb-6 overflow-y-auto flex-1 min-h-0">
          {/* Gallery - full width on mobile, 1/3 on desktop */}
          <div className="relative w-full md:w-1/3 md:shrink-0 rounded-xl overflow-visible">
            {images.length > 0 ? (
              <ModelGalleryCarousel images={images} alt={displayModel.modelName} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                <span className="text-sm">No image available</span>
              </div>
            )}
          </div>

          {/* HOUSE MODEL DETAILS */}
          <div className="space-y-4 w-full md:w-2/3 min-w-0">
            {/* Pricing */}
            {(minPrice > 0 || maxPrice > 0) && (
              <div className="rounded-xl">
                  {/* <PhilippinePeso className="size-5 text-primary" /> */}
                <span className="text-sm text-neutral-500">Starts at</span>
                <p className="text-3xl font-bold text-primary">
                  {minPrice === maxPrice
                    ? priceFormatter(minPrice)
                    : `${priceFormatter(minPrice)} – ${priceFormatter(maxPrice)}`}
                </p>
              </div>
            )}
            
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
                      className="flex items-center gap-2 p-3 rounded-xl border border-border bg-neutral-50"
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
                      key={a.name}
                      className="px-3 py-1.5 bg-neutral-100 rounded-xl text-sm font-medium text-neutral-700"
                    >
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            )}       
          </div>
        </div>
        <DialogFooter className="px-6 py-6 md:pb-6 md:pt-0 shrink-0">
          <Button variant="default" size="sm" onClick={onClose}>
            {" "}
            Close
          </Button>
        </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default ModelDetailsModal;
