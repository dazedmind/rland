"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import BackButton from "@/components/layout/BackButton";

export function CareersNotFound() {
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

      <main className="flex flex-col items-start justify-center space-y-8 px-8 md:px-24 xl:px-44 py-16">
        <BackButton href="/careers" mainPageName="Careers" />
        <p className="text-destructive">Career not found</p>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
