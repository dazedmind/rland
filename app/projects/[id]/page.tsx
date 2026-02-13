"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import MobileNavBar from "@/components/MobileNavBar";
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
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import arAerialView from "@/public/ar-aerial.png";
import Image from "next/image";
import ModelCard from "@/components/ModelCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import contactBg from "@/public/contact-bg.png";
import arcoeResidencesLogo from "@/public/project-logo/ar-logo.png";
import { GoogleMapsIcon } from "@/components/icons/GoogleMapsIcon";

export const runtime = "edge";

// Navigation sections
const sections = [
  { id: "specification", label: "Specifications" },
  { id: "amenities", label: "Amenities" },
  { id: "landmarks", label: "Landmarks" },
  { id: "models", label: "House Models" },
  { id: "contact", label: "Contact Us" },
];

function ProjectDetailsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("specification");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      {/* <PageBanner
        title="Arcoe Residences"
        description="Angeles City, Pampanga."
        breadcrumb="Projects / Arcoe Residences"
      /> */}

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
        <section
          className="flex flex-col items-start px-8 md:px-16 lg:px-44 xl:px-64 justify-center pt-16 space-y-8"
          id="specification"
        >
          <span>
            <Link
              href="/projects"
              className="flex items-center gap-2 text-primary"
            >
              {" "}
              <ArrowLeft className="size-4" /> Back to Projects
            </Link>
          </span>
          <span className="flex flex-col gap-4">

            <div className="py-8">
              <Image src={arcoeResidencesLogo} alt="Arcoe Residences Logo" width={300} height={300} className="rounded-xl object-contain" />
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <span className="flex flex-col">
                <h1 className="text-4xl font-bold">Arcoe Residences</h1>
                <p className="text-lg text-primary">Lipa City, Batangas</p>
              </span>

              <span>
                <Link
                  href="https://maps.app.goo.gl/h3sYX7hSRMicJyuj8"
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

            <p className="leading-relaxed">
              Arcoe Residences presents a neighborhood for quiet respite in a
              progressive component city, creating an atmosphere of safety,
              security and serenity. A diverse selection of shared courtyards
              creates a genuine neighborly ambiance with a full range of
              settings for recreation and relaxation, all connected by gardens,
              bike and walk paths. A combination of a community center, a play
              area, and multi-purpose court expands opportunities for
              interaction and exchange between homeowners.
            </p>

            <div className="flex flex-col md:flex-row gap-4 w-full border-border border-2 rounded-lg p-8 scroll-mt-24">
              <div className="w-1/3">
                <h1 className="text-2xl font-bold">Project Specifications</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-2/3">
                <div className="flex flex-row items-center gap-2">
                  <House className="size-10 text-neutral-400" />
                  <span>
                    <p className="text-sm text-neutral-500">Type</p>
                    <p className="text-xl font-bold">House & Lot</p>
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <LandPlotIcon className="size-10 text-neutral-400" />
                  <span>
                    <p className="text-sm text-neutral-500">Lot Area</p>
                    <p className="text-xl font-bold">42.50 – 182.00 sqm ±</p>
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <PhilippinePeso className="size-10 text-neutral-400" />
                  <span>
                    <p className="text-sm text-neutral-500">Price Range</p>
                    <p className="text-xl font-bold">PHP 1.841M – 4M</p>
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Scan className="size-10 text-neutral-400" />
                  <span>
                    <p className="text-sm text-neutral-500">Floor Area</p>
                    <p className="text-xl font-bold">46.00 – 71.00 sqm ±</p>
                  </span>
                </div>
              </div>
            </div>
          </span>

          <div className="w-full h-80 bg-neutral-200 rounded-xl">
            <Image
              src={arAerialView}
              alt="Arcoe Residences Aerial View"
              width={500}
              height={500}
              className="rounded-xl object-cover h-full w-full"
            />
          </div>
        </section>

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
              <div className="flex justify-center items-center h-50  bg-neutral-400 rounded-md">
                <p className="text-xl font-bold text-white">
                  {" "}
                  Basketball Court
                </p>
              </div>

              <div className="flex justify-center items-center h-50 bg-neutral-400 rounded-md">
                <p className="text-xl font-bold text-white"> Jogging Trail</p>
              </div>

              <div className="flex justify-center items-center h-50 bg-neutral-400 rounded-md">
                <p className="text-xl font-bold text-white"> Glamping Hub</p>
              </div>

              <div className="flex justify-center items-center h-50 bg-neutral-400 rounded-md">
                <p className="text-xl font-bold text-white"> Swimming Pool</p>
              </div>
            </div>
          </span>
        </section>

        <section
          id="landmarks"
          className="flex flex-col items-start px-8 md:px-16 lg:px-44 xl:px-64 justify-center py-16 space-y-8 bg-neutral-100 scroll-mt-24"
        >
          <span className="flex flex-col gap-4 w-full">
            <h1 className="text-4xl font-bold">Nearby Landmarks</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2 rounded-md p-4 ">
                <p className="flex items-center gap-2 text-xl font-bold">
                  {" "}
                  <span>
                    <Hospital className="size-8 text-secondary" />
                  </span>
                  Hospitals
                </p>
                <ul className="list-disc list-outside text-slate-800 max-w-3xl pl-5">
                  <li>San Antonio Medical Center Lipa</li>
                  <li>NL Villa Memorial Medical Center</li>
                  <li>Lipa Medix Medical Hospital</li>
                  <li>Lipa Medics Medical Center Inc.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 rounded-md p-4 ">
                <p className="flex items-center gap-2 text-xl font-bold">
                  {" "}
                  <span>
                    <School className="size-8 text-secondary" />
                  </span>
                  Schools
                </p>
                <ul className="list-disc list-outside text-slate-800 max-w-3xl pl-5">
                  <li>University of Batangas - Lipa Campus</li>
                  <li>Lipa City Colleges</li>
                  <li>De La Salle Lipa</li>
                  <li>Lipa Medics Medical Center Inc.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 rounded-md p-4">
                <p className="flex items-center gap-2 text-xl font-bold">
                  {" "}
                  <span>
                    <TreePalm className="size-8 text-secondary" />
                  </span>
                  Leisure Parks
                </p>
                <ul className="list-disc list-outside text-slate-800 max-w-3xl pl-5">
                  <li>Golf Course</li>
                  <li>Mt. Malarayat</li>
                  <li>The Farm at San Benito</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 rounded-md p-4 ">
                <p className="flex items-center gap-2 text-xl font-bold">
                  {" "}
                  <span>
                    <ShoppingCart className="size-8 text-secondary" />
                  </span>
                  Malls and Shopping
                </p>
                <ul className="list-disc list-outside text-slate-800 max-w-3xl pl-5">
                  <li>Fiesta Mall</li>
                  <li>S&R Membership Shopping</li>
                  <li>SM City Lipa</li>
                  <li>Robinsons Place Lipa</li>
                  <li>Lipa City Public Market</li>
                  <li>Puregold Lipa</li>
                  <li>Big Ben Complex</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 rounded-md p-4 ">
                <p className="flex items-center gap-2 text-xl font-bold">
                  {" "}
                  <span>
                    <Landmark className="size-8 text-secondary" />
                  </span>
                  Common Landmarks
                </p>
                <ul className="list-disc list-outside text-slate-800 max-w-3xl pl-5">
                  <li>Metropolitan Cathedral of Saint Sebastian</li>
                  <li>Iglesia ni Cristo</li>
                  <li>Lipa City Hall</li>
                  <li>Lipa Fire Station</li>
                </ul>
              </div>
            </div>
          </span>
        </section>

        <section
          id="models"
          className="flex flex-col items-start px-8 md:px-16 lg:px-44 xl:px-64 justify-center py-16 space-y-8 scroll-mt-24"
        >
          <span className="flex flex-col gap-8 w-full">
            <h1 className="text-4xl font-bold">House Models</h1>

            <ModelCard />
            <ModelCard />
            <ModelCard />
          </span>
        </section>

        <section className="relative z-10 flex flex-col lg:flex-row justify-between items-start px-8 md:px-16 lg:px-44 xl:px-64 gap-8 py-16">
          <div className="w-full">
            <div className="flex items-center justify-between bg-linear-to-r from-primary-fg to-blue-950 text-white p-8 rounded-t-lg">
              <span>
                <h1 className="text-2xl font-bold">Found the perfect home?</h1>
                <p className="text-sm text-muted">
                  Make it yours. Secure your spot with a quick and easy
                  reservation.
                </p>
              </span>

              <span>
                <Button onClick={() => scrollToSection("contact")}>
                  Reserve Now
                </Button>
              </span>
            </div>
            <div className="flex flex-col gap-2 bg-primary text-white p-8 rounded-b-lg">
              <p className="text-lg font-bold">Arcoe Estates:</p>
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

        <div className="relative overflow-hidden" id="contact">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={contactBg}
              alt="Contact Us"
              width={1920}
              height={1080}
              className="absolute w-full h-full object-cover"
            />
            {/* Gradient Overlay - blends to white on the left */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-white/90 to-white" />
          </div>

          <section
            id="contact"
            className="relative z-10 flex flex-col lg:flex-row justify-between items-start px-8 md:px-16 lg:px-44 xl:px-64 gap-8 py-16"
          >
            {/* SECTION HEADER */}
            <div className="flex flex-col xl:flex-row items-start w-full gap-4">
              <div className="flex flex-col space-y-4 w-full xl:w-1/2">
                <span>
                  <h1 className="text-4xl md:text-5xl font-bold text-primary">
                    Your next step in owning{" "}
                    <span className="text-secondary font-serif italic">
                      your dream home
                    </span>{" "}
                    starts{" "}
                    <span className="text-secondary font-bold">here</span>
                  </h1>
                  <p className="text-base md:text-lg">
                    Get in touch, and we'll handle the rest.
                  </p>
                </span>

                <span>
                  <p>You may also reach us at:</p>
                  <ul className="flex flex-wrap items-start justify-start gap-2 space-y-2 py-2 ">
                    <li className="flex flex-row items-center justify-center gap-2 bg-neutral-100 rounded-full p-1 px-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <p>(02) 7752 2789</p>
                    </li>
                    <li className="flex flex-row items-center justify-center gap-2 bg-neutral-100 rounded-full p-1 px-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <p>moreinfo@rland.ph</p>
                    </li>
                  </ul>
                </span>
              </div>

              {/* Contact Card */}
              <div className="w-full xl:w-1/2">
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ProjectDetailsPage;
