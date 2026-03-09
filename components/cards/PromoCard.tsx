import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

function PromoCard({
    title,
    description,
    image,
    date,
    id,
}: {
    title: string;
    description: string;
    image: StaticImageData;
    date: string;
    id: number;
}) {

  return (
    <div className="flex flex-col md:flex-row gap-2 border-border border rounded-lg w-full h-full">
        {/* Image container - fixed square aspect ratio */}
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/5 aspect-square shrink-0 rounded-t-md md:rounded-t-none md:rounded-l-md overflow-hidden">
            <Image src={image} alt={title} width={256} height={256} className="w-full h-full object-cover" />
        </div>
        {/* Content container */}
        <span className="flex flex-col gap-4 lg:gap-2 flex-1 justify-between p-6">
            <div className="flex flex-col gap-4">
                <span className='bg-secondary w-10 h-1 rounded-full'></span>
                <span className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-primary">{title}</h2>
                    <p className="text-sm leading-relaxed text-primary font-medium">Valid until: {date}</p>
                </span>
    
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
            <Link href={`/promos`}>
                <Button size="sm" variant="primary" className="w-full lg:w-fit">
                    Claim Promo
                </Button>
            </Link>
        </span>
    </div>
  )
}

export default PromoCard