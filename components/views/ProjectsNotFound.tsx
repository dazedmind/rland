"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";

export function ProjectsNotFound() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="pt-15 md:pt-25 min-h-screen flex flex-col items-center justify-center gap-4">
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>
      <p className="text-destructive">Project not found</p>
      <Link href="/projects" className="text-primary hover:underline">
        Back to Projects
      </Link>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
