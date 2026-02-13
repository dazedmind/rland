import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Fullscreen, GalleryVerticalEnd } from "lucide-react";
import aeMeadowUnit from "@/public/ae-meadow-unit.jpg";
import floorPlan from "@/public/ground floor.jpg";
import { useState } from "react";
import { cn } from "@/lib/utils";

function HouseSearchCard({ price }: { price: string }) {
  const [cardView, setCardView] = useState<string>("default");

  const priceFormattedArray = price?.split(",").map((amount: string) => {
    return parseInt(amount);
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };
  
  return (
    <div className="flex flex-col lg:flex-row w-full justify-between border-border border rounded-lg overflow-hidden bg-white">
      {/* DETAILS PART - Using a grid container to hold both views in the same space */}
      <div className="grid grid-cols-1 flex-1">
        
        {/* DEFAULT VIEW */}
        <div 
          className={cn(
            "col-start-1 row-start-1 flex flex-row gap-4 p-4 transition-opacity duration-300",
            cardView === "default" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
          style={{ minHeight: '220px' }} // Ensures the card has a set height
        >
          <div className="shrink-0">
            <Image
              src={aeMeadowUnit}
              alt="Residential Icon"
              width={180}
              height={180}
              className="rounded-md object-cover aspect-square border-border border shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-neutral-800">Arcoe Estates</h1>
            <p className="bg-primary px-2 py-0.5 rounded text-sm text-white font-bold w-fit">
              Meadow Unit
            </p>
            <p className="text-sm text-muted-foreground">Angeles City, Pampanga</p>
            <p className="text-sm text-muted-foreground">House & Lot</p>

            <div className="mt-2 space-y-0.5">
               <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">Lot Area:</span> 1000 sq.ft.
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">Floor Area:</span> 1000 sq.ft.
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
            cardView === "floorplan" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
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
            <h1 className="text-2xl font-bold text-neutral-800">Arcoe Estates</h1>
            <p className="bg-primary px-2 py-0.5 rounded text-sm text-white font-bold w-fit">
              Meadow Unit
            </p>
            <div className="max-w-[300px]"> {/* Prevents text from pushing the blue box */}
               <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">Includes:</span> Living Area, Dining Area, Kitchen, 2 T&B, Carport, Service Area
              </p>
            </div>

            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">GF Total Area:</span> 34.50 sqm
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">Floor Area:</span> 25.49 sqm
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
          <p className="text-xs uppercase tracking-wider opacity-80">Price starts at</p>
          <p className="text-3xl font-bold text-secondary">
            {formatCurrency(priceFormattedArray?.[0] || 0)}
          </p>
          <p className="text-[10px] leading-tight opacity-70">Eligible for Loan and Installment Plan</p>
        </div>
        
        <Button variant="outline" className="w-full mt-6 bg-transparent hover:bg-white hover:text-primary text-white border-white">
          View Full Details
        </Button>
      </div>
    </div>
  );
}

export default HouseSearchCard;
