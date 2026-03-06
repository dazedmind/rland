import React from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
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
  projectLogo: StaticImageData;
  projectAccent: string;
  className?: string;
  projectId: number;
}) {
  return (
    <div className="flex flex-col w-full bg-neutral-50/50 border border-border rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer">
      {/* CARD */}
      <div className={cn(`w-auto h-60 ${projectAccent} rounded-t-xl relative transition-all duration-300 cursor-pointer group`, className)}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 group-hover:scale-110 transition-all duration-300">
          <Image src={projectLogo ?? null} alt="Project 2" width={200} height={200} />
        </div>
        <Image
          src={projectImage ?? arAerialView}
          alt="Project Aerial View"
          width={100}
          height={100}
          className="w-full h-full object-cover saturate-0 rounded-xl opacity-15"
        />

        <p className="absolute top-4 right-0 text-sm text-white font-bold bg-linear-to-r from-transparent to-yellow-600 rounded-l-full px-4 p-1 w-fit">
          {projectStatus}
        </p>
      </div>
      {/* INFO */}
      <span className="flex items-center justify-between gap-2 p-4">
        <span>
          <h1 className="text-xl font-bold text-primary">{projectName}</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="size-4" /> {projectLocation}</p>
        </span>
          <Button size="icon" variant="outline"
            className="hover:bg-transparent hover:text-primary"
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
