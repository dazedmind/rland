"use client";
import React, { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import brokerHero from "@/public/brokers-hero.png";
import Link from "next/link";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Lightbulb
} from "lucide-react";

function BrokersAccreditation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-screen">
      <header>
        <NavBar isScrolled={true} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <main>
        {/* HERO SECTION */}
        <section className=" min-h-[90dvh] flex items-center justify-center lg:justify-start overflow-hidden  bg-linear-to-r from-primary to-blue-950 pt-20">
          <div className="container px-8 md:px-16 xl:px-44 z-10 flex gap-12 items-center relative">
            <ScrollReveal>
              <div className="py-12 lg:py-24 text-center lg:text-left flex flex-col gap-8">
                <span className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-medium text-white">
                    Broker&apos;s Accreditation <span className="text-secondary font-bold">Program</span>
                  </h1>
                  <p className="leading-relaxed text-neutral-200 max-w-xl mx-auto lg:mx-0">
                    Join our Broker's Accreditation Program and gain exclusive access to premium listings and a community built for success.
                  </p>
                </span>
                
           
                <div className="flex gap-4 justify-center lg:justify-start w-full lg:w-fit">
                  <Button 
                    size="sm"
                    asChild
                    className="flex-1 md:w-fit"
                  >
                    <Link href="https://docs.google.com/forms/..." target="_blank">
                      Apply Now
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-white flex-1 md:w-fit"
                    onClick={() => scrollToSection("requirements")}
                  >
                    View Checklist
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* TRUST BAR */}
        <div className="bg-linear-to-tr from-slate-50 to-slate-100 border-y border-slate-100 py-8 overflow-hidden">
          {/* Desktop: static centered */}
          <div className="hidden md:flex container mx-auto px-6 justify-center gap-24 opacity-60 grayscale">
            <div className="flex items-center gap-2 font-bold text-primary"><ShieldCheck /> SEC REGISTERED</div>
            <div className="flex items-center gap-2 font-bold text-primary"><Zap /> FAST PAYOUTS</div>
            <div className="flex items-center gap-2 font-bold text-primary"><CheckCircle2 /> PRC ACCREDITED</div>
          </div>

          {/* Mobile: infinite marquee */}
          <div className="flex md:hidden opacity-60 grayscale">
            <div
              className="flex shrink-0 gap-12 pr-12 animate-marquee"
              style={{ animation: "marquee 12s linear infinite" }}
            >
              <div className="flex items-center gap-2 font-bold text-primary whitespace-nowrap"><ShieldCheck /> SEC REGISTERED</div>
              <div className="flex items-center gap-2 font-bold text-primary whitespace-nowrap"><Zap /> FAST PAYOUTS</div>
              <div className="flex items-center gap-2 font-bold text-primary whitespace-nowrap"><CheckCircle2 /> PRC ACCREDITED</div>
            </div>
            {/* Duplicate for seamless loop */}
            <div
              className="flex shrink-0 gap-12 pr-12 animate-marquee"
              aria-hidden="true"
              style={{ animation: "marquee 12s linear infinite" }}
            >
              <div className="flex items-center gap-2 font-bold text-primary whitespace-nowrap"><ShieldCheck /> SEC REGISTERED</div>
              <div className="flex items-center gap-2 font-bold text-primary whitespace-nowrap"><Zap /> FAST PAYOUTS</div>
              <div className="flex items-center gap-2 font-bold text-primary whitespace-nowrap"><CheckCircle2 /> PRC ACCREDITED</div>
            </div>
          </div>
        </div>

        {/* REQUIREMENTS SECTION */}
        <section id="requirements" className="py-24">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-44">
            <div className="flex flex-col xl:flex-row gap-16">
              
              {/* LEFT: CONTENT */}
              <div className="xl:w-1/3 space-y-6">
                <h2 className="text-4xl font-bold text-primary">Accreditation Requirements</h2>
                <p className="text-slate-500 leading-relaxed">
                  To maintain the highest standards of professional service, we require our partners to provide the following documentation. 
                </p>
                <div className="p-4 bg-secondary/5 rounded-md border border-secondary/10">
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <Lightbulb size={18} className="text-secondary" />Tips
                  </h4>
                  <p className="text-sm text-slate-600">Ensure all photocopies are clear and ID pictures have a white background for faster approval.</p>
                </div>
              </div>

              {/* RIGHT: COMPLETE ACCORDION LIST */}
              <div className="xl:w-2/3">
                <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
                  
                  <AccordionItem value="item-1" className="rounded-md p-0 bg-white overflow-hidden">
                    <AccordionTrigger className="hover:no-underline font-bold text-xl py-4">
                      General Requirements
                    </AccordionTrigger>
                    <AccordionContent className="p-6">
                      <ul className="grid grid-cols-1 gap-4 text-slate-600">
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> a. Photocopy of PRC Broker's License (latest/ back to back)</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> b. Photocopy of PRC Certificate of Registration</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> c. Photocopy of the HLURB Registration (if any)</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> d. Photocopy of AMLC Certificate of Registration</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> e. 2 pcs ID picture (1X1), white background</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> f. Duly signed Broker Accreditation Agreement (to be signed upon submission)</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> g. Completely filled-out Broker Accreditation Form</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> h. Photocopy of Official Receipt</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="rounded-md p-0 bg-white overflow-hidden">
                    <AccordionTrigger className="hover:no-underline font-bold text-xl py-4 text-left">
                      For Corporations
                    </AccordionTrigger>
                    <AccordionContent className="p-6">
                      <ul className="space-y-4 text-slate-600">
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> a. Board resolution authorizing a representative to apply for accreditation and appointing a representative to get checks and transact with R Land Development, Inc.</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> b. Photocopy of Articles of Incorporation and By-Laws</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> c. Photocopy of current GIS received by SEC</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="rounded-md p-0 bg-white overflow-hidden">
                    <AccordionTrigger className="hover:no-underline font-bold text-xl py-4 text-left">
                      For Partnerships
                    </AccordionTrigger>
                    <AccordionContent className="p-6">
                      <ul className="space-y-4 text-slate-600">
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> a. Photocopy of Certificate of Registration of Partnership with SEC</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> b. Photocopy of Articles of Partnership with SEC</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="rounded-md p-0 bg-white overflow-hidden">
                    <AccordionTrigger className="hover:no-underline font-bold text-xl py-4 text-left">
                      For Sole Proprietorship
                    </AccordionTrigger>
                    <AccordionContent className="p-6">
                      <ul className="space-y-4 text-slate-600">
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> a. Photocopy of DTI Business Name Registration (if any)</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> b. Photocopy of Business Permit</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> c. Tax Identification Number (TIN)</li>
                        <li className="flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none"/> d. Certificate of BIR Registration</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="pb-8 md:pb-24 px-8 md:px-16 lg:px-24 xl:px-20">
          <ScrollReveal>
            <div className="max-w-7xl mx-auto bg-slate-50 rounded-md overflow-hidden flex flex-col md:flex-row items-stretch border border-border">
              <div className="md:w-1/3 bg-neutral-200 relative min-h-[300px]">
                <Image 
                  src={brokerHero} 
                  alt="Join Us" 
                  fill 
                  className="object-cover transition-all duration-700"
                />
              </div>
              <div className="md:w-2/3 p-8 lg:p-12 xl:p-18 flex flex-col justify-center gap-2">
                <h2 className="text-3xl lg:text-5xl font-bold text-primary">
                  Ready to Become an Accredited Broker?
                </h2>
                <p className="leading-relaxed text-neutral-600">
                  Gain access to exclusive listings, premium support, and a network designed specifically for your professional growth.
                </p>
                <div className="pt-4">
                  <Button 
                    variant="default"
                    size="sm"
                    className="hover:shadow-lg hover:shadow-secondary/40 transition-all w-full md:w-fit"
                    asChild
                  >
                    <Link href="https://docs.google.com/forms/..." target="_blank">
                      Submit Your Application
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default BrokersAccreditation;