import React from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

function ProjectCard({
  projectImage,
  projectName,
  projectLocation,
  projectStatus,
  projectLogo,
  projectAccent,
  className,
}: {
  projectImage: StaticImageData;
  projectName: string;
  projectLocation: string;
  projectStatus: string;
  projectLogo: StaticImageData;
  projectAccent: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* CARD */}
      <div className={cn(`w-auto h-60 ${projectAccent} rounded-lg relative transition-all duration-300 shadow-lg cursor-pointer group`, className)}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 group-hover:scale-110 transition-all duration-300">
          <Image src={projectLogo} alt="Project 2" width={200} height={200} />
        </div>
        <Image
          src={projectImage}
          alt="Project 1"
          width={100}
          height={100}
          className="w-full h-full object-cover saturate-0 rounded-xl opacity-15"
        />

        <p className="absolute top-2 right-0 text-sm text-white font-bold bg-linear-to-r from-secondary to-yellow-600 rounded-l-full px-2 p-1 w-fit">
          {projectStatus}
        </p>
      </div>
      {/* INFO */}
      <span className="flex flex-col gap-2">
        <span>
          <h1 className="text-2xl font-bold">{projectName}</h1>
          <p className="text-md text-primary">{projectLocation}</p>
        </span>
      </span>
    </div>
  );
}

export default ProjectCard;
