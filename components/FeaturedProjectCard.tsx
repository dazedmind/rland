import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Bath, Bed, Car, LandPlot } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectDetailProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

const DetailBadge = ({ icon: Icon, label, value }: ProjectDetailProps) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white backdrop-blur-md">
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex flex-col leading-tight text-white">
      <span className="text-sm font-bold">{value}</span>
      <span className="text-[10px] uppercase tracking-wider opacity-80">
        {label}
      </span>
    </div>
  </div>
);

function ModernProjectCard({ 
  projectImage, 
  projectName, 
  projectLocation 
}: { 
  projectImage: StaticImageData, 
  projectName: string, 
  projectLocation: string 
}) {
  return (
    <div className="group relative w-full  bg-white rounded-lg overflow-hidden border border-border hover:shadow-sm transition-all duration-500">
      
      {/* IMAGE SECTION */}
      <div className="relative overflow-hidden aspect-video">
        <Image 
          src={projectImage} 
          alt={projectName} 
          fill 
          className="object-cover transition-transform duration-700" 
        />
        {/* Floating Price Tag */}
        <div className="absolute top-4 left-4 backdrop-blur-md bg-linear-to-br from-secondary to-yellow-600 px-3 py-1.5 rounded-lg  shadow-sm z-10">
          <p className="text-sm font-bold text-white uppercase tracking-tight">₱1.65M</p>
        </div>

        {/* DETAILS OVERLAY (Initially hidden/positioned below) */}
        <div className="absolute inset-0 z-20 bg-linear-to-t from-black to-transparent flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="grid grid-cols-2 gap-4">
              <DetailBadge icon={Bed} value={3} label="Bedrooms" />
              <DetailBadge icon={Bath} value={2} label="Baths" />
              <DetailBadge icon={Car} value={1} label="Carport" />
              <DetailBadge icon={LandPlot} value="40sqm" label="Area" />
            </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-neutral-800 line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {projectName}
          </h3>
          <p className="text-sm text-neutral-500 italicflex items-center gap-1.5">
            {projectLocation}
          </p>
        </div>

        <Button 
          variant="default" 
          className="w-full bg-primary hover:bg-primary/90 text-white py-4 font-semibold transition-all active:scale-95"
        >
          Explore Unit
        </Button>
      </div>
    </div>
  );
}

export default ModernProjectCard;