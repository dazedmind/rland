import { ChevronDownIcon, Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Slider } from "./ui/slider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const minPrice = 1000000;
const maxPrice = 10000000;

type HouseSearchBarProps = {
  className?: string;
  initialLocation?: string;
  initialPriceRange?: [number, number];
};

function HouseSearchBar({ className, initialLocation = "", initialPriceRange }: HouseSearchBarProps) {
  const [location, setLocation] = useState<string>(initialLocation);
  const [priceRange, setPriceRange] = useState<number[]>(
    initialPriceRange ?? [minPrice, maxPrice]
  );

  useEffect(() => {
    if (initialLocation) setLocation(initialLocation);
    if (initialPriceRange) setPriceRange(initialPriceRange);
  }, [initialLocation, initialPriceRange]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const locations = [
    { value: "Batangas" },
    { value: "Pampanga" },
    { value: "Cavite" },
  ];

  const router = useRouter();

  const handleSearch = () => {
    if (location === "" || priceRange[0] === 0 || priceRange[1] === 0) {
      toast.error("Please select a location");
      return;
    } else {
      router.push(`/search?location=${location}&priceRange=${priceRange}`);
    }
  };

  return (
    <div className={cn("flex flex-col md:flex-row gap-8 bg-background rounded-lg p-4 z-20", className)}>
      <div className="relative w-full">
        <ChevronDownIcon className="text-black w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 z-30" />
        <select
          name="location"
          id="location"
          value={location}
          className="w-full h-12 text-sm bg-input text-black outline-none border-none rounded-md px-2 border-2 border-neutral-200"
          onChange={(e) => handleLocationChange(e.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc.value} className="text-sm rounded-md" value={loc.value}>
              {loc.value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex flex-row items-center justify-between gap-2 w-full">
          <span className="text-muted-foreground text-sm">
            {formatCurrency(priceRange[0])}
          </span>
          <span className="text-muted-foreground text-sm">
            {formatCurrency(priceRange[1])}
          </span>
        </div>

        <Slider
          id="price-slider"
          defaultValue={[1000000, 5000000]}
          value={priceRange}
          max={maxPrice}
          min={minPrice}
          onValueChange={handlePriceChange}
          step={50000}
          className="mx-auto w-full max-w-xs"
        />
      </div>

      <button onClick={handleSearch} className="flex justify-center items-center gap-2 bg-secondary text-white text-center px-3 py-2 rounded-lg cursor-pointer">
        <Search className="w-6 h-6" /> <p className="block lg:hidden">Search</p>
      </button>
    </div>
  );
}

export default HouseSearchBar;
