"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import CareerCard from "@/components/cards/CareerCard";
import BackButton from "@/components/layout/BackButton";
import { HiMail } from "react-icons/hi";
import CareerApplicationModal from "@/components/modals/CareerApplicationModal";
import { Button } from "@/components/ui/button";
import MobileNavBar from "@/components/layout/MobileNavBar";
import type { Career } from "@/lib/data";

type CareerDetailsViewProps = {
  career: Career;
};

export function CareerDetailsView({ career }: CareerDetailsViewProps) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="pt-15 md:pt-25">
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <main className="flex flex-col lg:flex-row justify-start items-start px-8 md:px-24 xl:px-44 gap-8 py-16">
        <section className="flex flex-col items-start justify-center space-y-8 w-full lg:w-2/3">
          <BackButton href="/careers" mainPageName="Careers" />

          <span className="flex flex-col gap-4">
            <span>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                {career.position}
              </h1>
              <p className="text-lg font-bold text-secondary">
                {career.location}
              </p>
            </span>

            <h2 className="text-2xl font-bold">Purpose and Scope</h2>
            <p className="leading-relaxed">{career.jobDescription}</p>

            <h2 className="text-2xl font-bold">
              Specific Duties and Responsibilities:
            </h2>

            <ul className="list-disc list-outside space-y-3 text-slate-800 max-w-3xl marker:text-blue-600 pl-5">
              {career.responsibilities.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold">Qualifications:</h2>

            <ol className="list-decimal list-outside space-y-3 text-slate-800 max-w-3xl pl-5">
              {career.qualifications.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>

            <h2 className="text-2xl font-bold">Required Skills:</h2>
            <ul className="list-disc list-outside space-y-3 text-slate-800 max-w-3xl marker:text-blue-600 pl-5">
              {career.requiredSkills.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </span>

          <Button
            size="sm"
            variant="default"
            onClick={() => setIsApplicationModalOpen(true)}
            className="w-full md:w-fit"
          >
            <HiMail className="size-5" /> Submit an Application
          </Button>
          <CareerApplicationModal
            isOpen={isApplicationModalOpen}
            onClose={() => setIsApplicationModalOpen(false)}
            jobPosition={career.position}
          />
        </section>

        <section className="mt-16 md:mt-0 flex flex-col items-start justify-center space-y-8 w-full lg:w-1/3">
          <div className="space-y-4 w-full">
            <h1 className="text-2xl font-bold text-primary-fg">
              Latest Vacancies
            </h1>

            <div className="w-full h-px bg-border"></div>

            <div className="w-full grid grid-cols-1 gap-4">
              <CareerCard limit={3} excludeId={career.id} />
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
