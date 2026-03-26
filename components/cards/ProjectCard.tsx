import React from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowUpRight, MapPin } from "lucide-react";
import arAerialView from "@/public/ar-aerial.png";

function ProjectCard({
  projectImage,
  projectName,
  projectLocation,
  projectStatus,
  projectLogo,
  projectAccent,
  className,
  projectId,
}: {
  projectImage: string | null;
  projectName: string;
  projectLocation: string;
  projectStatus: string;
  projectLogo: string | StaticImageData | null;
  projectAccent: string;
  className?: string;
  projectId: number;
}) {
  return (
    <div className="flex flex-col w-full bg-neutral-50/50 rounded-xl hover:shadow-xs transition-all duration-300 cursor-pointer">
      {/* CARD */}
      <div className={cn("w-auto h-60 bg-white rounded-xl relative transition-all duration-300 cursor-pointer group overflow-hidden", className)}>
        {/* Gradient overlay - fades in on hover */}
        <div
          className={cn(
            "absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out",
            `${projectAccent}`
          )}
        />
        {projectLogo && (
          <div className="absolute inset-0 flex items-center justify-center z-40 p-4 group-hover:scale-110 transition-transform duration-300">
            <div className="relative w-full max-w-[200px] h-full max-h-[120px]">
              <Image
                src={projectLogo}
                alt={projectName}
                fill
                className="object-contain object-center"
                sizes="200px"
              />
            </div>
          </div>
        )}
        <Image
          src={projectImage ?? arAerialView}
          alt="Project Aerial View"
          width={100}
          height={100}
          className="w-full h-full object-cover saturate-0 opacity-10 group-hover:opacity-30 transition-opacity duration-300 ease-in-out"
        />
        
        {/* <p className="absolute bottom-3 right-0 text-white font-bold bg-linear-to-r from-secondary/10 to-yellow-600 px-3 p-1.5 w-fit tracking-wide uppercase text-xs">
          {projectStatus}
        </p> */}
      </div>
      {/* INFO */}
      <span className="flex items-center justify-between gap-2 p-4">
        <span>
          <h1 className="text-xl font-bold text-primary">{projectName}</h1>
          <p className="text-sm text-neutral-500 flex items-center gap-1"><MapPin className="size-4" /> {projectLocation}</p>
        
        </span>
          <Button size="icon" variant="outline"
            className="hover:bg-transparent hover:text-primary rounded-full"
          >
            <span className="flex items-center gap-2">
              {/* <p className="text-sm">View</p> */}
              <ArrowUpRight className="size-6 hover:ml-2 transition-all duration-300 ease-in-out" />
            </span>
          </Button>
      </span>
    </div>
  );
}

export default ProjectCard;
