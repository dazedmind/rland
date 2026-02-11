import React from 'react'
import { Button } from './ui/button'
import arGoldUnit from "@/public/ar-gold-unit.jpg";
import Image, { StaticImageData } from 'next/image';
import { Bath, Bed } from 'lucide-react';

function FeaturedProjectCard({ projectImage, projectName, projectLocation }: { projectImage: StaticImageData, projectName: string, projectLocation: string }) {
  return (
    <div className="w-auto border-2 border-neutral-200 rounded-xl">
        <div>
          <Image src={projectImage} alt="Project 1" width={300} height={100} className="rounded-t-lg aspect-video w-full object-cover" />
        </div>

        <span className="p-4 flex flex-col gap-4">
          <span className='flex flex-col'>
            <h2 className="text-xl font-bold">{projectName}</h2>
            <p className="text-sm text-neutral-500">{projectLocation}</p>
            <p className='text-lg font-bold text-primary'>₱1,650,000</p>
            <span className='flex flex-row gap-2'>
              <p className='flex bg-neutral-200 p-1 px-2 text-xs rounded-full flex-row items-center gap-2'><Bath className='w-4 h-4' /> 2 Bathrooms</p>
              <p className='flex bg-neutral-200 p-1 px-2 text-xs rounded-full flex-row items-center gap-2'><Bed className='w-4 h-4' /> 3 Bedrooms</p>
            </span>
          </span>
    
        <Button variant="secondary" className="w-full text-white px-4 py-2 rounded-lg cursor-pointer">
            View More Details
        </Button>
        </span>
    </div>
  )
}

export default FeaturedProjectCard