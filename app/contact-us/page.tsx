"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/layout/ContactForm";
import { Phone, Mail } from "lucide-react";
import MobileNavBar from "@/components/MobileNavBar";
import { useState } from "react";
import Image from "next/image";
import contactBg from "@/public/contact-bg.png";

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
        {/* ABOUT US SECTION */}
        <div className="relative overflow-hidden">
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

          <section className="bg-background flex flex-col lg:flex-row justify-between items-start px-8 md:px-16 xl:px-44 gap-4 py-16">
            {/* SECTION HEADER */}
            <div className="flex flex-col lg:flex-row items-start w-full gap-4 z-10">
              <div className="flex flex-col space-y-4 w-full lg:w-1/2">
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
              <div className="w-full lg:w-1/2">
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

export default ContactUs;
