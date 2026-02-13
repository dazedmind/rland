import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

function PromoCard({
    title,
    description,
    image,
    date,
}: {
    title: string;
    description: string;
    image: StaticImageData;
    date: string;
}) {

    const truncatedDescription = description.length > 100 ? description.substring(0, 200) + '...' : description;
  return (
    <div className="flex flex-col md:flex-row gap-4 border-border border-2 rounded-lg p-6 w-full h-full">
        {/* Image container - fixed square aspect ratio */}
        <div className="w-full md:w-64 aspect-square flex-shrink-0 rounded-md overflow-hidden">
            <Image src={image} alt={title} width={256} height={256} className="w-full h-full object-cover" />
        </div>
        {/* Content container */}
        <span className="flex flex-col gap-2 flex-1 justify-between">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-primary">{title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">Valid until: {date}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
            <Button variant="default" className="text-white rounded-md w-fit">
                View Promo
            </Button>
        </span>

    </div>
  )
}

export default PromoCard