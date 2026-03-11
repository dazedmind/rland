"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "../ui/ScrollReveal";
import { developmentStage } from "@/lib/types";
import ProjectListSkeleton from "../layout/skeleton/ProjectListSkeleton";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProjectList({ limit, type }: { limit?: number, type: string }) {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnapCount, setScrollSnapCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data.slice(0, limit ?? data.length));
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [limit]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnapCount(emblaApi.scrollSnapList().length);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const accentColor = {
    blue:   "bg-gradient-to-tr from-transparent via-primary/20 to-primary/20",
    yellow: "bg-gradient-to-tr from-transparent via-secondary/20 to-secondary/20",
    amber:  "bg-gradient-to-tr from-transparent via-amber-800/20 to-amber-800/20",
    orange: "bg-gradient-to-tr from-transparent via-orange-600/20 to-orange-600/20",
    green:  "bg-gradient-to-tr from-transparent via-green-950/20 to-green-950/20",
    purple: "bg-gradient-to-tr from-transparent via-purple-950/20 to-purple-950/20",
    red:    "bg-gradient-to-tr from-transparent via-red-950/20 to-red-950/20",
    pink:   "bg-gradient-to-tr from-transparent via-pink-950/20 to-pink-950/20",
    gray:   "bg-gradient-to-tr from-transparent via-gray-950/20 to-gray-950/20",
    black:  "bg-gradient-to-tr from-transparent via-black/20 to-black/20",
    white:  "bg-gradient-to-tr from-transparent via-white/20 to-white/20",
  };

  if (loading) {
    return <ProjectListSkeleton />;
  }

  if (projects.length === 0) return null;

  return (
    <ScrollReveal className="w-full">
      {type === "carousel" && (
      <div className="flex flex-col gap-4 w-full">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-[0_0_100%] min-w-0 pl-4
                    md:flex-[0_0_50%]
                    lg:flex-[0_0_33.333%]"
                >
                  <Link href={`/projects/${project.id}`}>
                    <ProjectCard
                      projectImage={project.photoUrl}
                      projectName={project.projectName}
                      projectLocation={project.location}
                      projectStatus={
                        developmentStage[project.stage as keyof typeof developmentStage]
                      }
                      projectLogo={project.logoUrl}
                      projectAccent={
                        accentColor[project.accentColor as keyof typeof accentColor] ??
                        accentColor.blue
                      }
                      projectId={project.id}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows - hidden on mobile */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-border hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="size-6 text-neutral-800" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute -right-20 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-border hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            aria-label="Next"
          >
            <ChevronRight className="size-6 text-neutral-800" />
          </button>
        </div>

        {/* Indicators */}
        {scrollSnapCount > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: scrollSnapCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === selectedIndex ? "w-6 bg-primary" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selectedIndex}
              />
            ))}
          </div>
        )}
      </div>)}
      {type === "grid" && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4 w-full ">
         {projects.map((project: any) => (
           <Link key={project.id} href={`/projects/${project.id}`}>
             <ProjectCard
               projectImage={project.photoUrl}
               projectName={project.projectName}
               projectLocation={project.location}
               projectStatus={
                 developmentStage[project.stage as keyof typeof developmentStage]
               }
               projectLogo={project.logoUrl}
               projectAccent={accentColor[project.accentColor as keyof typeof accentColor] ?? accentColor.blue}
               projectId={project.id}
             />
           </Link>
         ))}
       </div>
      )}
    </ScrollReveal>
  );
}

export default ProjectList;
