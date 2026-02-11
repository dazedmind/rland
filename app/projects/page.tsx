import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import arcoeResidencesLogo from "@/public/project-logo/ar-logo-white.png";
import arcoeEstatesLogo from "@/public/project-logo/ae-logo-white.png";
import arAerialView from "@/public/ar-aerial.png";
import aeAerialView from "@/public/ae-aerial.png";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import PageBanner from "@/components/PageBanner";

function ProjectsPage() {
  return (
    <div className="pt-20 md:pt-30">
      <header>
        <NavBar isScrolled={true} />
      </header>
      <main>
        {/* PAGE BANNER */}
        <PageBanner
          title="R Land Projects"
          description="View current and upcoming developments of distinction and innovation."
          breadcrumb="Projects"
        />

        {/* ABOUT US SECTION */}
        <section className="flex flex-col items-start px-8 md:px-24 lg:px-44 justify-center py-16 space-y-8">
          <span className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">R Land's Projects</h1>

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
            <ProjectCard
              projectLogo={arcoeResidencesLogo}
              projectImage={arAerialView}
              projectName="Arcoe Residences"
              projectLocation="Lipa City, Batangas"
              projectStatus="Pre-selling"
            />

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
