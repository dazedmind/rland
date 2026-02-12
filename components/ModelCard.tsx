import { Button } from './ui/button'
import { Maximize2 } from 'lucide-react'
import { Bed, Bath, Car, LandPlotIcon, Utensils } from 'lucide-react'

function ModelCard() {
  return (
    <div className="border-border border flex flex-col rounded-lg">
    <div className=" flex gap-2 rounded-md p-4 w-full">
      {/* <Image src={houseModel1} alt="House Model 1" width={500} height={500} className="rounded-md object-cover" /> */}
      <div className="h-full w-1/2">
        <img
          className="aspect-video object-cover rounded-lg"
          src="https://placehold.co/600x400"
          alt=""
        />
      </div>
      {/* House details */}
      <span className="flex flex-col justify-between gap-2 p-6 w-1/2">
        <span>
          <h2 className="text-2xl font-bold">Platinum Unit</h2>
          <p className="text-sm text-neutral-500">
            This model soothes well best for EXCELLING FAMILIES of
            bigger requirements. The Platinum (Single-Attached
            Premiere Model) offers three bedrooms, two toilet and
            bath, a kitchen, living and dining areas. The design
            speaks about the well configured plans of a generous open
            space, the unit offers a spacious lawn that extends up to
            the carport and to the rear laundry area.
          </p>
        </span>

        <span>
          <Button variant="outline" className="w-full">
            View Pricing and Details <Maximize2 className="size-4" />
          </Button>
        </span>
      </span>
    </div>

    {/* HOUSE SPECIFICATION */}
    <div className="flex justify-between items-center p-8 border-t border-border">
      <div className="flex items-center gap-2">
        <Bed className="size-8 text-neutral-400" />
        <span>
          <p className="text-md">3 Bedrooms</p>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Bath className="size-8 text-neutral-400" />
        <span>
          <p className="text-md">2 Bathrooms</p>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Car className="size-8 text-neutral-400" />
        <span>
          <p className="text-md">1 Carport</p>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <LandPlotIcon className="size-8 text-neutral-400" />
        <span>
          <p className="text-md">Living and Dining</p>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Utensils className="size-8 text-neutral-400" />
        <span>
          <p className="text-md">Kitchen</p>
        </span>
      </div>
    </div>
  </div>
  )
}

export default ModelCard