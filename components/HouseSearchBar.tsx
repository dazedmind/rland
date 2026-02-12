import { ChevronDownIcon, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Slider } from './ui/slider'

function HouseSearchBar() {

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    }

    const [minPrice, setMinPrice] = useState<number>(1000000);
    const [maxPrice, setMaxPrice] = useState<number>(5000000);
    const [location, setLocation] = useState<string>('');

    const [priceRange, setPriceRange] = useState<number[]>([1000000, 5000000]);

    const handlePriceChange = (value: number[]) => {
        setPriceRange(value);
    }

    const locations = [
        {value: "Batangas"},
        {value: "Pampanga"},
        {value: "Manila"},
        {value: "Cavite"}
    ]
  return (
    <div className="flex flex-col md:flex-row gap-8 bg-background rounded-lg p-4 z-20">
        <div className="relative w-full">
            <ChevronDownIcon className="text-black w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 z-30" />
        <select
            name="location"
            id="location"
            className="w-full h-12 text-sm bg-input text-black outline-none border-none rounded-md px-2 border-2 border-neutral-200"
        >
            {locations.map((location) => {
                return (
                    <option key={location.value} className="text-sm rounded-md" value={location.value}>{location.value}</option>
                )
            })}
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
    
        <button className="flex justify-center items-center gap-2 bg-secondary text-white text-center px-3 py-2 rounded-lg cursor-pointer">
        <Search className="w-6 h-6" /> <p className="block lg:hidden">Search</p>
        </button>
    </div>
  )
}

export default HouseSearchBar