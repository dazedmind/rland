"use client";

import React, { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import arPlatinumUnit from "@/public/ar-platinum-unit.jpg";
import MobileNavBar from "@/components/layout/MobileNavBar";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectList from "@/components/cards/ProjectList";
import Image from "next/image";
import { GoStarFill } from "react-icons/go";

function ProjectsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="min-h-[90dvh] px-8 md:px-16 xl:px-44 flex items-center justify-center lg:justify-center overflow-hidden bg-linear-to-r from-primary to-blue-950 pt-20 rounded-b-[2rem] md:rounded-b-[4rem] xl:rounded-b-[6rem] mx-5 md:mx-10">
          <ScrollReveal className="w-full">
            <div className="flex flex-col-reverse md:flex-row items-center relative justify-center md:justify-between gap-8 w-full container z-10 py-8">
              <div className="py-12 lg:py-24 text-center lg:text-left flex flex-col gap-8">
                <span>
                  <h1 className="text-5xl lg:text-6xl font-medium text-white leading-tight">
                    Our{" "}
                    <span className="text-secondary font-bold">Projects</span>
                  </h1>
                  <p className="text-blue-100 text-lg lg:text-xl lg:mx-0">
                    Explore our portfolio of projects and find the perfect one
                    for you.
                  </p>
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-end w-full relative">
                <div className="w-full max-w-[250px] md:max-w-[300px] xl:max-w-[400px] aspect-square rounded-full bg-primary-fg overflow-hidden border-8 border-primary-fg shadow-2xl relative">
                  <Image
                    src={arPlatinumUnit}
                    alt="Project 1"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="absolute bottom-8 right-0 lg:right-[-5%] translate-y-1 bg-primary-fg/80 p-3 rounded-md flex items-center gap-4 z-20 shadow-xl">
                  <GoStarFill className="size-8 md:size-10 text-secondary" />
                  <span className="flex flex-col pr-4">
                    <h1 className="text-lg md:text-xl font-bold text-white whitespace-nowrap">
                      Arcoe Residences
                    </h1>
                    <p className="text-xs md:text-sm text-blue-100 italic">
                      Lipa City, Batangas
                    </p>
                  </span>
                </span>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal>
          {/* PROJECTS SECTION */}
          <section
            id="projects"
            className="flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center py-16 space-y-8"
          >
            <span className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold text-foreground">
                R Land's Projects
              </h1>
              <p className="leading-relaxed text-neutral-600">
                With Real Estate as the core business of R Land, the company
                gives impetus to master-planning to project sales operation
                founded in flexible and adaptive architectural designs,
                innovative marketing strategies and competitive financial
                structures. These are the foundations of R Land as one of the
                future major companies to partake in answering the housing
                backlog of the country.
              </p>
            </span>

            <div className="w-full">
              <ProjectList type="grid" />
            </div>
          </section>
        </ScrollReveal>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ProjectsPage;
