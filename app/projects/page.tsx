"use client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import arcoeResidencesLogo from "@/public/project-logo/ar-logo-white.png";
import arcoeEstatesLogo from "@/public/project-logo/ae-logo-white.png";
import arAerialView from "@/public/ar-aerial.png";
import aeAerialView from "@/public/ae-aerial.png";
import ProjectCard from "@/components/ProjectCard";
import PageBanner from "@/components/PageBanner";
import MobileNavBar from "@/components/MobileNavBar";
import { useState } from "react";
import Link from "next/link";

function ProjectsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="pt-20 md:pt-30">
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      {/* PAGE BANNER */}
      <PageBanner
        title="R Land Projects"
        description="View current and upcoming developments of distinction and innovation."
        breadcrumb="Projects"
      />

      <main>
        {/* ABOUT US SECTION */}
        <section className="flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center py-16 space-y-8">
          <span className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-primary">
              R Land's Projects
            </h1>

            <p className="leading-relaxed">
              With Real Estate as the core business of R Land, the company gives
              impetus to master-planning to project sales operation founded in
              flexible and adaptive architectural designs, innovative marketing
              strategies and competitive financial structures – ready to cater
              to realty necessities of the market. These are the foundations of
              R Land as one of the future major companies to partake in
              answering the housing backlog of the country.
            </p>
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4 pb-16 w-full ">
            <Link href="/projects/1">
              <ProjectCard
                projectLogo={arcoeResidencesLogo}
                projectImage={arAerialView}
                projectName="Arcoe Residences"
                projectLocation="Lipa City, Batangas"
                projectStatus="Pre-selling"
              />
            </Link>
            <ProjectCard
              projectLogo={arcoeEstatesLogo}
              projectImage={aeAerialView}
              projectName="Arcoe Estates"
              projectLocation="Angeles City, Pampanga"
              projectStatus="Under Construction"
            />

            <ProjectCard
              projectLogo={arcoeResidencesLogo}
              projectImage={arAerialView}
              projectName="Heroes' Town"
              projectLocation="Cavite"
              projectStatus="Coming Soon"
            />
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ProjectsPage;
