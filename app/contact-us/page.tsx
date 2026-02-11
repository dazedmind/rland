"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail } from "lucide-react";
import MobileNavBar from '@/components/MobileNavBar'
import { useState } from 'react'

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
      <main>
        {/* PAGE BANNER */}
        <PageBanner
          title="Contact Us"
          description="Get in touch for inquiries, tours, or partnership opportunities."
          breadcrumb="Contact Us"
        />

        {/* ABOUT US SECTION */}
        <section className="bg-background flex flex-col lg:flex-row justify-between items-start px-8 md:px-24 lg:px-44 gap-4 py-16">
          {/* SECTION HEADER */}
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col space-y-4">
              <span>
                <h1 className="text-4xl font-bold text-primary">Contact Us</h1>
                <p className="text-lg">And we will handle the rest.</p>
              </span>

              <span>
                <p>You may also reach us at:</p>
                <ul className="flex flex-row lg:flex-col items-start justify-start gap-2 space-y-2 py-2 ">
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
          </div>

          {/* Contact Card */}
          <ContactForm />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ContactUs;
