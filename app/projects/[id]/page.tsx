"use client";
import { useState, useEffect, use, createElement } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import {
  Hospital,
  House,
  LandPlotIcon,
  PhilippinePeso,
  Scan,
  School,
  ShoppingCart,
  Landmark,
  TreePalm,
  Building,
} from "lucide-react";
import Image from "next/image";
import ModelCard from "@/components/cards/ModelCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectDetails, getMinMaxArea, getPriceRange } from "@/app/utils/types";
import ProjectDetailsSkeleton from "@/components/layout/skeleton/ProjectDetailsSkeleton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { priceFormatter } from "@/app/utils/priceFormatter";
import ContactSection from "@/components/layout/ContactSection";
import ProjectImageCarousel from "@/components/ProjectImageCarousel";
import BackButton from "@/components/layout/BackButton";

export const runtime = "edge";

// Navigation sections
const sections = [
  { id: "specification", label: "Specifications" },
  { id: "amenities", label: "Amenities" },
  { id: "landmarks", label: "Landmarks" },
  { id: "models", label: "House Models" },
  { id: "contact", label: "Contact Us" },
];

const landmarkIcon = [
  { icon: Hospital, category: "Hospitals" },
  { icon: School, category: "Schools" },
  { icon: ShoppingCart, category: "Shopping Centers" },
  { icon: Landmark, category: "Landmarks" },
  { icon: TreePalm, category: "Leisure Parks" },
  { icon: Building, category: "Common Landmarks" },
]

const typeMap = {
  houselot: "House & Lot",
  condo: "Condo",
};

function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const { id } = use(params as Promise<{ id: string }>);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("specification");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectDetails[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250; // Offset for navbar + threshold

      // Find which section is currently in view (use getBoundingClientRect for accurate doc position)
      let currentSection = sections[0].id;
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;

          if (scrollPosition >= sectionTop) {
            currentSection = sections[i].id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    // Initial check after a brief delay (allow layout to settle)
    const initTimer = setTimeout(handleScroll, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) {
          if (res.status === 404) setError("Project not found");
          else setError("Failed to load project");
          setProject([]);
          return;
        }
        const data = await res.json();
        setProject(data?.project ? [{ project: data.project, models: data.models ?? [], inventory: data.featuredUnits ?? [] }] : []);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project");
        setProject([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
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
        <ProjectDetailsSkeleton />
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }

  const models = project[0]?.models ?? [];
  const inventory = project[0]?.inventory ?? [];
  const { minLot, maxLot, minFloor, maxFloor } = getMinMaxArea(models);
  const { minPrice, maxPrice } = getPriceRange(inventory);

  if (error) {
    return (
      <div className="pt-20 md:pt-30 min-h-screen flex flex-col items-center justify-center gap-4">
        <header>
          <NavBar isScrolled={true} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </header>
        <p className="text-destructive">{error}</p>
        <Link href="/projects" className="text-primary hover:underline">
          Back to Projects
        </Link>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }

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

      <main className="relative">
        {/* Side Navigation - Hidden on mobile */}
        <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40 ">
          <div className="flex flex-col gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`group relative px-4 py-2.5 text-left text-sm  transition-all duration-300 rounded ${
                  activeSection === id
                    ? " text-primary font-bold"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-primary"
                }`}
              >
                <span className="relative z-10 block max-w-[180px] leading-tight">
                  — {label}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* PROJECT DETAILS SECTION */}
        <ScrollReveal delay={0}>
          <section
            className="flex flex-col items-start px-8 md:px-16 lg:px-44 xl:px-64 justify-center pt-16 space-y-8"
            id="specification"
          >
          <span>
            <BackButton href="/projects" mainPageName="Projects" />
          </span>
          <span className="flex flex-col gap-4">

            <div className="py-4">
              <Image src={project[0]?.project?.logoUrl ?? ""} alt="Project Logo" width={300} height={300} className="rounded-xl object-contain" />
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <span className="flex flex-col">
                <h1 className="text-4xl font-bold">{project[0]?.project?.projectName}</h1>
                <p className="text-lg text-primary">{project[0]?.project?.location}</p>
              </span>

              <span>
                <Link
                  href={project[0]?.project?.mapLink ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-neutral-100 px-4 py-2 rounded-lg text-black text-sm border-border border hover:bg-neutral-300 flex items-center gap-2 cursor-pointer">
                    <img src="/google-maps-icon.png" alt="Google Maps Icon" className="h-6 w-auto" />
                    View on Google Maps 
                  </button>
                </Link>
              </span>
            </div>

            <p className="leading-relaxed text-neutral-600">
              {project[0]?.project?.description}
            </p>

            <div className="flex flex-col md:flex-row gap-4 w-full border-border border-2 rounded-lg p-6 scroll-mt-24">
              <div className="w-full md:w-1/3">
                <h1 className="text-2xl font-bold">Project Specifications</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-2/3">
                <div className="flex flex-row items-center gap-2">
                  <House className="size-10 text-neutral-400 shrink-0" strokeWidth={1.5} />
                  <span>
                    <p className="text-sm text-neutral-500">Type</p>
                    <p className="text-xl font-medium">{typeMap[project[0]?.project?.type as keyof typeof typeMap]}</p>
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <LandPlotIcon className="size-10 text-neutral-400 shrink-0" strokeWidth={1.5} />
                  <span>
                    <p className="text-sm text-neutral-500">Lot Area</p>
                    <p className="text-xl font-medium">{minLot} – {maxLot} sqm ±</p>
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <PhilippinePeso className="size-10 text-neutral-400 shrink-0" strokeWidth={1.5} />
                  <span>
                    <p className="text-sm text-neutral-500">Price Range</p>
                    <p className="text-xl font-medium">{priceFormatter(minPrice)} – {priceFormatter(maxPrice)}</p>
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Scan className="size-10 text-neutral-400 shrink-0" strokeWidth={1.5} />
                  <span>
                    <p className="text-sm text-neutral-500">Floor Area</p>
                    <p className="text-xl font-medium">{minFloor} – {maxFloor} sqm ±</p>
                  </span>
                </div>
              </div>
            </div>
          </span>

          {(() => {
            const projectPhoto = project[0]?.project?.photoUrl;
            const modelPhotos = (project[0]?.models ?? [])
              .map((m) => m.details?.photoUrl)
              .filter((url): url is string => !!url);
            const unique = projectPhoto
              ? [projectPhoto, ...modelPhotos.filter((p) => p !== projectPhoto)]
              : modelPhotos;
            const images =
              unique.length === 0
                ? []
                : unique.length === 1
                  ? [unique[0], unique[0], unique[0]]
                  : unique;
            return images.length > 0 ? (
              <ProjectImageCarousel
                images={images}
                alt={project[0]?.project?.projectName ?? "Project"}
              />
            ) : (
              <div className="w-full h-80 bg-neutral-200 rounded-xl" />
            );
          })()}
        </section>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <section
            className="flex flex-col items-start px-8 md:px-16 lg:px-44 xl:px-64 justify-center space-y-8 scroll-mt-24 py-16"
            id="amenities"
          >
          <span
            id="amenities"
            className="flex flex-col gap-4 w-full scroll-mt-24"
          >
            <h1 className="text-4xl font-bold">Amenities</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(project[0]?.project?.amenities ?? []).map((amenity) => (
                <div key={amenity} className="flex justify-center items-center h-50  bg-neutral-400 rounded-md">
                  <p className="text-xl font-bold text-white">{amenity}</p>
                </div>
              ))}
            </div>
          </span>
        </section>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <section
            id="landmarks"
            className="flex flex-col items-start px-8 md:px-16 lg:px-44 xl:px-64 justify-center py-16 space-y-8 bg-neutral-100 scroll-mt-24"
          >
          <span className="flex flex-col gap-4 w-full">
            <h1 className="text-4xl font-bold">Nearby Landmarks</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(project[0]?.project?.landmarks ?? []).map((group, idx) => {
                  const items = group.items ?? group.landmarks ?? [];
                  return (
                    <div key={idx} className="flex flex-col gap-2 rounded-md p-4">
                      <p className="flex items-center gap-2 text-xl font-bold">
                        <span>
                          {landmarkIcon.find((icon) => icon.category === group.category)?.icon && createElement(landmarkIcon.find((icon) => icon.category === group.category)?.icon as any, { className: "size-8 text-secondary" })}
                        </span>
                      
                        {group.category}
                      </p>
                      <ul className="list-disc list-outside text-slate-800 max-w-3xl pl-5">
                        {items.map((item: string, i: number) => (
                          <li key={`${idx}-${i}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
              )}
            </div>
          </span>
        </section>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <section
            id="models"
            className="flex flex-col items-start px-8 md:px-16 lg:px-44 xl:px-64 justify-center py-16 space-y-8 scroll-mt-24"
          >
          <span className="flex flex-col gap-8 w-full">
            <h1 className="text-4xl font-bold">House Models</h1>
            {project[0]?.models?.length > 0 &&
              project[0].models.map((model) => (
                <ModelCard
                  key={model.id}
                  photoUrl={model.details?.photoUrl ?? ""}
                  modelName={model.modelName}
                  description={model.details?.description ?? ""}
                  bedrooms={model.details?.livingRoom ?? 0}
                  bathrooms={model.details?.bathroom ?? 0}
                  carports={model.details?.carport ?? 0}
                  livingAndDining={model.details?.livingRoom ?? 0}
                  kitchen={model.details?.kitchen ?? 0}
                />
              ))}
          </span>
        </section>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <section className="relative z-10 flex flex-col lg:flex-row justify-between items-start px-8 md:px-16 lg:px-44 xl:px-64 gap-8 py-16">
          <div className="w-full">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-linear-to-r from-primary-fg to-blue-950 text-white p-8 rounded-t-lg">
              <span className="w-full md:w-auto">
                <h1 className="text-2xl font-bold">Found the perfect home?</h1>
                <p className="leading-relaxed text-neutral-200">
                  Make it yours. Secure your spot with a quick and easy
                  reservation.
                </p>
              </span>

              <span className="w-full md:w-auto">
                <Button size="sm" variant="default" className="w-full" onClick={() => scrollToSection("contact")}>
                  Reserve Now
                </Button>
              </span>
            </div>
            <div className="flex flex-col gap-2 bg-primary text-white p-8 rounded-b-lg">
              <p className="text-lg font-bold">{project[0]?.project?.projectName}:</p>
              <p>Sampaguita St., Brgy. Munting Pulo, Lipa City, Batangas</p>
              <p>
                Sales Office: Sampaguita St., Brgy. Munting Pulo, Lipa City,
                Batangas
              </p>
              <p>DHSUD LTS No: 769 & 770</p>
              <p>Completion Date: February & March 2026</p>
            </div>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <section id="contact">
            {/* CONTACT SECTION */}
            <ContactSection />
          </section>
        </ScrollReveal>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ProjectDetailsPage;
