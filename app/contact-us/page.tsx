"use client";
import React from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/layout/PageBanner";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { useState } from "react";
import ContactSection from "@/components/layout/ContactSection";

function ContactUs() {
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
        title="Contact Us"
        description="Get in touch for inquiries, tours, or partnership opportunities."
        breadcrumb="Contact Us"
      />
      <main>
        <ContactSection />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ContactUs;
