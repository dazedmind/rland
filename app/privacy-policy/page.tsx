"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import MobileNavBar from "@/components/MobileNavBar";
import { useState } from "react";

function PrivacyPolicyPage() {
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
        title="Privacy Policy"
        description="This privacy policy explains how we collect, use, and share your personal information."
        breadcrumb="Privacy Policy"
      />

      <main>
        {/* ABOUT US SECTION */}
        <section className="flex flex-col items-start px-44 justify-center py-16 space-y-8">
          <span className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">
              Privacy Policy and Terms of Service
            </h1>

            <p className="leading-relaxed">
              This privacy policy and terms of service explain how we collect,
              use, and share your personal information.
            </p>
          </span>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default PrivacyPolicyPage;
