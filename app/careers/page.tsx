"use client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MobileNavBar from "@/components/MobileNavBar";
import { useState } from "react";
import { ArrowDown, ArrowRight, ChevronDownIcon } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import CareerCard from "@/components/CareerCard";
import { Button } from "@/components/ui/button";

function CareersPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const jobListing = [
    {
      id: 1,
      position: "Marketing Support Associate / Site Officer",
      location: "Angeles City, Pampanga",
      description:
        "Responsible for over-all marketing related activities of the project — events, traditional and digital initiatives, public relations and research.",
      datePosted: "Feb 12, 2026",
      department: "Marketing",
    },
    {
      id: 2,
      position: "Property Management - Maintenance Staff",
      location: "Lipa City, Batangas and Angeles City, Pampanga",
      description:
        "Responsible for over-all marketing related activities of the project — events, traditional and digital initiatives, public relations and research.",
      datePosted: "Feb 12, 2026",
      department: "Property Management",
    },
    {
      id: 3,
      position: "HR & Admin Specialist",
      location: "Quezon City, Metro Manila (Head Office)",
      description:
        "Responsible for over-all marketing related activities of the project — events, traditional and digital initiatives, public relations and research.",
      datePosted: "Feb 12, 2026",
      department: "HR & Admin",
    },
    {
      id: 4,
      position: "Property Management - Maintenance Staff",
      location: "Lipa City, Batangas and Angeles City, Pampanga",
      description:
        "Responsible for over-all marketing related activities of the project — events, traditional and digital initiatives, public relations and research.",
      datePosted: "Feb 12, 2026",
      department: "Property Management",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="">
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <div className="flex flex-col gap-4 items-start justify-center px-8 md:px-16 xl:px-44 h-dvh bg-linear-to-r from-primary to-blue-950 pt-20 md:pt-30">
        <span>
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary">
            Careers at <span className="text-white">R Land</span>
          </h1>
          <p className="text-sm lg:text-lg text-muted">
            Here at R Land we are always looking for talented and passionate
            individuals to join our team.
          </p>
        </span>

        <span>
          <Button onClick={() => scrollToSection("jobs")} className="bg-primary text-white rounded-md w-fit">
            See Available Jobs <ArrowDown className="w-4 h-4 animate-bounce" />
          </Button>
        </span>
      </div>
      
      <main>
        {/* JOBS SECTION */}
        <section id="jobs" className="flex flex-col items-start px-8 md:px-24 lg:px-44 xl:px-64 justify-center py-16 space-y-8">
          <div className="w-full flex flex-col gap-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <h2 className="text-3xl font-bold text-primary">Current Job Openings</h2>

              <span className="flex flex-row gap-4 w-full md:w-1/2 justify-end">
                <Field>
                  <FieldLabel>Department</FieldLabel>
                  <div className="relative">
                    <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                    <select className="w-full h-10 text-sm text-black rounded-md px-3 border border-neutral-300 appearance-none bg-white">
                      <option value={6}>Marketing</option>
                      <option value={12}>Property Management</option>
                      <option value={18}>HR & Admin</option>
                      <option value={24}>Other</option>
                    </select>
                  </div>
                </Field>

                <Field>
                  <FieldLabel>Location</FieldLabel>
                  <div className="relative">
                    <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                    <select className="w-full h-10 text-sm text-black rounded-md px-3 border border-neutral-300 appearance-none bg-white">
                      <option value={6}>Angeles City, Pampanga</option>
                      <option value={12}>Lipa City, Batangas</option>
                      <option value={18}>Quezon City, Metro Manila</option>
                      <option value={24}>Other</option>
                    </select>
                  </div>
                </Field>
              </span>
            </div>

            {/* CARDS */}
            <div className="w-full grid grid-cols-1 gap-4">
              {jobListing.map((job) => (
                <CareerCard
                  key={job.id}
                  position={job.position}
                  location={job.location}
                  datePosted={job.datePosted}
                  description={job.description}
                  id={job.id}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default CareersPage;
