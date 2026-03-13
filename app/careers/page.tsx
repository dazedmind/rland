"use client";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { useState } from "react";
import CareerCard from "@/components/cards/CareerCard";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { location, department } from "@/app/utils/types";
import DropSelect from "@/components/ui/DropSelect";

function CareersPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [page, setPage] = useState(1);

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setPage(1);
  };
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    setPage(1);
  };

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

      <section className=" min-h-[90dvh] flex items-center justify-center lg:justify-start overflow-hidden bg-linear-to-r from-primary to-blue-950 pt-20">
          <div className="container px-8 md:px-16 xl:px-44  z-10 flex gap-12 items-center relative">
            <ScrollReveal>
              <div className="py-12 lg:py-24 text-center lg:text-left flex flex-col gap-8">
                <span>
                  <h1 className="text-5xl lg:text-6xl font-medium text-white leading-tight">
                    Careers at <span className="text-secondary font-bold">R Land</span>
                  </h1>
                  <p className="text-blue-100 text-lg lg:text-xl lg:mx-0">
                    Here at R Land we are always looking for talented and passionate individuals to join our team.
                  </p>
                </span>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="sm"
                    variant="default"
                    onClick={() => scrollToSection("jobs")}
                  >
                    See Available Jobs
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      
      <main>
        {/* JOBS SECTION */}
        <section id="jobs" className="flex flex-col items-start px-8 md:px-24 lg:px-44 xl:px-64 justify-center py-16 space-y-8">
          <div className="w-full flex flex-col gap-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <h2 className="text-3xl font-bold text-primary">Current Job Openings</h2>

              <span className="flex flex-row gap-4 w-full md:w-1/2 justify-end">
                <DropSelect
                  label="Department"
                  selectName="department"
                  selectId="department"
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  value={selectedDepartment}
                >
                  <option value="">All Departments</option>
                  {Object.entries(department).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </DropSelect>

                <DropSelect
                  label="Location"
                  selectName="location"
                  selectId="location"
                  onChange={(e) => handleLocationChange(e.target.value)}
                  value={selectedLocation}
                >
                  <option value="">All Locations</option>
                  {Object.entries(location).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </DropSelect>
              </span>
            </div>

            {/* CARDS */}
            <div className="w-full grid grid-cols-1 gap-4">
              <CareerCard
                page={page}
                onPageChange={setPage}
                selectedDepartment={selectedDepartment || undefined}
                selectedLocation={selectedLocation || undefined}
              />
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
