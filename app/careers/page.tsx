"use client";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { useState } from "react";
import { ArrowDown, ArrowRight, ChevronDownIcon } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import CareerCard from "@/components/cards/CareerCard";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

function CareersPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-white px-10 py-6 text-lg rounded-full"
                    onClick={() => scrollToSection("jobs")}
                  >
                    See Available Jobs <ArrowDown className="w-4 h-4 animate-bounce" />
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
              <CareerCard />
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
