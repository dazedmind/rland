"use client";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import brokerHero from "@/public/brokers-hero.png";
import PageBanner from "@/components/PageBanner";
import MobileNavBar from "@/components/MobileNavBar";
import Link from "next/link";

function BrokersAccreditation() {
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
          title="Brokers Accreditation"
          description="Learn about the benefits and process of joining our exclusive network."
          breadcrumb="Brokers Accreditation"
        />

        {/* ABOUT US SECTION */}
        <section className="flex flex-col items-start px-8 md:px-16 lg:px-16 xl:px-80 justify-center py-16 space-y-8">
          <span className="flex flex-col gap-4 justify-center w-full">
            <h1 className="text-4xl font-bold text-primary">
              Broker's Accreditation Requirements
            </h1>

            <p className="leading-relaxed">
              Joining our exclusive network begins by meeting a few key
              qualifications. These standards help us maintain a trusted
              community of professionals, ensuring you benefit from premium
              support, exclusive listings, and a reputable partnership.
            </p>

            <div className="flex flex-col items-center justify-center space-y-4">
              <Accordion
                className="w-full"
                type="single"
                collapsible
                defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>General Requirements</AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-2 px-4 pt-4">
                      <li>
                        a. Photocopy of PRC Broker&apos;s License (latest/ back
                        to back)
                      </li>
                      <li>b. Photocopy of PRC Certificate of Registration</li>
                      <li>c. Photocopy of the HLURB Registration (if any)</li>
                      <li>d. Photocopy of AMLC Certificate of Registration</li>
                      <li>e. 2 pcs ID picture (1X1), white background;</li>
                      <li>
                        f. Duly signed Broker Accreditation Agreement (to be
                        signed upon submission of requirements)
                      </li>
                      <li>
                        g. Completely filled-out Broker Accreditation Form
                        (refer to attached file)
                      </li>
                      <li>h. Photocopy of Official Receipt</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion
                className="w-full"
                type="single"
                collapsible
                defaultValue="item-4"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Other Requirements (For Corporation):
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-2 px-4 pt-4">
                      <li>
                        a. Board resolution authorizing a representative to
                        apply for accreditation from the company & appointing a
                        representative to get checks and transact with R Land
                        Development, Inc;
                      </li>
                      <li>
                        b. Photocopy of Articles of Incorporation and By-Laws
                      </li>
                      <li>c. Photocopy of current GIS received by SEC</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Other Requirements (For Partnership):
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-2 py-2 px-4">
                      <li>
                        a. Photocopy of Certificate of Registration of
                        Partnership with SEC
                      </li>
                      <li>b. Photocopy of Articles of Partnership with SEC</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Other Requirements (For Sole Proprietorship):
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-2 py-2 px-4">
                      <li>
                        a. Photocopy of DTI Business Name Registration (if any)
                      </li>
                      <li>b. Photocopy of Business Permit</li>
                      <li>c. Tax Identification Number (TIN)</li>
                      <li>d. Certificate of BIR Registration</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex bg-linear-to-t from-white to-neutral-200 border-border border-2 rounded-lg w-full px-0 md:px-8 lg:px-24">
                <Image
                  src={brokerHero}
                  alt="Broker Accreditation"
                  className="hidden md:block h-auto"
                  width={300}
                  height={300}
                />
                <span className="p-6 md:px-2 flex flex-col justify-center gap-2">
                  <span>
                    <h1 className="text-2xl lg:text-3xl font-bold">
                      Ready to Become a Broker?
                    </h1>
                    <p className="text-sm">
                      Gain access to exclusive listings, premium support, and a
                      network designed for your success.
                    </p>
                  </span>
                  
                  <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdUjoDri-j4l73hE-TMSBxOp1gpFLJx0z3J6H76jQNZ4KpByw/viewform" target="_blank">
                    <Button className="bg-secondary w-full text-white rounded-md">
                     Apply Now
                    </Button>
                  </Link>
             
                </span>
              </div>
            </div>
          </span>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default BrokersAccreditation;
