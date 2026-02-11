import { ChevronDownIcon, Search } from 'lucide-react'
import React from 'react'
import { Slider } from './ui/slider'
import { Button } from './ui/button'

function HouseSearchBar() {
  return (
    <div className="flex flex-col md:flex-row gap-8 bg-background rounded-lg p-4 z-20">
        <div className="relative w-full">
            <ChevronDownIcon className="text-black w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 z-30" />
        <select
            name="location"
            id="location"
            className="w-full h-12 text-sm bg-input text-black outline-none border-none rounded-md px-2 border-2 border-neutral-200"
        >
            <option className="text-sm rounded-md" value="1">
            Location 1
            </option>
            <option className="text-sm" value="2">
            Location 2
            </option>
            <option className="text-sm" value="3">
            Location 3
            </option>
        </select>
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex flex-row items-center justify-between gap-2 w-full">
            <span className="text-muted-foreground text-sm">
            ₱10,000
            </span>
            <span className="text-muted-foreground text-sm">
                ₱1,500,000
            </span>
        </div>

        <Slider
            id="price-slider"
            defaultValue={[10, 1500000]}
            max={1500000}
            step={5}
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