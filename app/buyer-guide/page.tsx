"use client";
import React from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/layout/PageBanner";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  FileText,
  Handshake,
  ClipboardList,
  KeyRound,
  Home,
  PhilippinePeso,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";
import goldenKey from "@/public/goldkey.png";
import BuyingProcessRoadmap from "./BuyingProcessRoadmap";

const paymentOptions = [
  {
    icon: <PhilippinePeso className="w-8 h-8 text-secondary stroke-1" />,
    title: "Spot Cash",
    description:
      "Pay the full purchase price in a single transaction. This option typically comes with the best discount and the fastest processing time.",
  },
  {
    icon: <Home className="w-8 h-8 text-secondary stroke-1" />,
    title: "In-House Financing",
    description:
      "Flexible payment terms directly through R Land with no bank requirements. Ideal for buyers who want a more accessible and straightforward financing process.",
  },
  {
    icon: <Landmark className="w-8 h-8 text-secondary stroke-1" />,
    title: "Bank Loan",
    description:
      "Finance your home through a bank of your choice. Enjoy competitive interest rates and longer payment terms, subject to bank approval.",
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-secondary stroke-1" />,
    title: "Pag-IBIG Fund (HDMF)",
    description:
      "Eligible Pag-IBIG members may apply for a housing loan with low monthly contributions. This is one of the most popular options for Filipino homebuyers.",
  },
];

const faqs = [
  {
    question: "What documents do I need to submit for reservation?",
    answer:
      "Typically required documents include a valid government-issued ID, proof of income (payslips or ITR), and a duly accomplished reservation form. Additional documents may be required depending on your chosen payment scheme.",
  },
  {
    question: "How much is the reservation fee?",
    answer:
      "Reservation fees vary per project and unit type. Please contact our sales team or visit our office for the exact amount applicable to your chosen unit.",
  },
  {
    question: "Can I apply for a Pag-IBIG loan even if I'm an OFW?",
    answer:
      "Yes. Overseas Filipino Workers who are active Pag-IBIG members may apply for a housing loan. Our team can assist you through the process remotely.",
  },
  {
    question: "What happens after I sign the Contract to Sell?",
    answer:
      "You will continue making payments according to your agreed schedule. Once the property is ready and full payment or loan release is completed, a formal turnover will be scheduled.",
  },
  {
    question: "Can I back out after reservation?",
    answer:
      "Cancellation policies are outlined in your reservation agreement and Contract to Sell. We encourage you to review these terms carefully and speak with our team if you have concerns.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-6 py-4 bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200">
        <h3 className="font-semibold text-primary text-md md:text-lg">
          {question}
        </h3>
        {open ? (
          <ChevronUp className="w-5 h-5 text-secondary shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-secondary shrink-0 ml-4" />
        )}
      </div>
      {open && (
        <div className="px-6 py-4 bg-white text-sm text-neutral-600 leading-relaxed border-t border-border">
          {answer}
        </div>
      )}
    </div>
  );
}

function BuyerGuidePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <main className="flex flex-col">
        <section className=" min-h-[90dvh] flex items-center justify-center lg:justify-start overflow-hidden rounded-b-[2rem] md:rounded-b-[4rem] xl:rounded-b-[6rem] mx-5 md:mx-10 bg-linear-to-r from-primary to-blue-950 pt-20">
          <div className="container px-8 md:px-16 xl:px-44 z-10 flex gap-12 items-center relative">
            <ScrollReveal>
              <div className="py-12 lg:py-24 text-center lg:text-left flex flex-col gap-8">
                <span className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-medium text-white">
                    Buyer&apos;s{" "}
                    <span className="text-secondary font-bold">Guide</span>
                  </h1>
                  <p className="leading-relaxed text-neutral-200 max-w-xl mx-auto lg:mx-0">
                    Everything you need to know about purchasing your dream home
                    with R Land.
                  </p>
                </span>

                <div className="flex gap-4 justify-center lg:justify-start w-full lg:w-fit">
                  <Button
                    size="sm"
                    className="flex-1 md:w-fit"
                    onClick={() => scrollToSection("buying-process")}
                  >
                    Start Now
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="flex flex-col items-start px-8 md:px-16 xl:px-64 justify-center py-16 space-y-6">
          <ScrollReveal className="flex flex-col md:flex-row items-center">
            <Image
              src={goldenKey}
              alt="Buyer's Guide Intro"
              width={150}
              height={150}
              className="rotate-40"
            />
            <span className="flex flex-col gap-4 w-full">
              <h1 className="text-4xl font-bold text-primary">
                Your Journey to Homeownership Starts Here!
              </h1>
              <p className="leading-relaxed text-neutral-600 w-full">
                Buying a home is one of the most significant decisions you will
                ever make. At R Land Development Inc., we are committed to
                making the process as clear, straightforward, and stress-free as
                possible. This guide walks you through every step — from
                exploring our communities to receiving the keys to your new
                home.
              </p>
            </span>
          </ScrollReveal>
        </section>

        <BuyingProcessRoadmap id="buying-process" />

        {/* PAYMENT OPTIONS SECTION */}
        <section className="px-8 md:px-16 xl:px-44 py-16">
          <ScrollReveal>
            <div className="flex flex-col gap-10">
              <span className="flex flex-col gap-2">
                <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                  Financing
                </p>
                <h2 className="text-4xl font-bold text-foreground">
                  Payment Options
                </h2>
                <p className="text-neutral-600 max-w-2xl">
                  R Land offers flexible payment schemes to help make
                  homeownership accessible. Choose the option that best fits
                  your financial situation.
                </p>
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentOptions.map((option) => (
                  <div key={option.title} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white border border-border shrink-0">
                      {option.icon}
                    </div>
                    <div
                      key={option.title}
                      className="flex flex-col gap-4 rounded-xl p-6 bg-linear-to-l from-secondary/10 to-transparent hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold text-foreground">
                          {option.title}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* CTA to Loan Calculator */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-linear-to-r from-primary to-blue-950 rounded-xl p-8 text-white">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold">
                    Not sure how much you can afford?
                  </h3>
                  <p className="text-sm text-white/80">
                    Use our Loan Calculator to estimate your monthly payments
                    based on your preferred unit and financing scheme.
                  </p>
                </div>
                <Link
                  href="/loan-calculator"
                  className="shrink-0 w-full md:w-fit"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full md:w-fit text-white hover:bg-white hover:text-primary"
                  >
                    Try Loan Calculator
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* REQUIRED DOCUMENTS SECTION */}
        <section className="px-8 md:px-16 xl:px-44 py-16 bg-neutral-50">
          <ScrollReveal>
            <div className="flex flex-col gap-8">
              <span className="flex flex-col gap-2">
                <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                  Documents
                </p>
                <h2 className="text-4xl font-bold text-foreground">
                  What You'll Need
                </h2>
                <p className="text-neutral-600 max-w-2xl">
                  Prepare the following documents to ensure a smooth reservation
                  and processing experience.
                </p>
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* For Local Buyers */}
                <div className="flex flex-col gap-4 border border-border rounded-xl p-6 bg-white">
                  <h3 className="text-lg font-bold text-foreground border-b border-border pb-3">
                    For Local Buyers
                  </h3>
                  <ul className="flex flex-col gap-2 text-sm text-neutral-600">
                    {[
                      "2 valid government-issued IDs (front and back)",
                      "Marriage certificate (if applicable)",
                      "Latest 3 months payslips",
                      "Certificate of Employment",
                      "Income Tax Return (ITR) or BIR Form 2316",
                      "Duly accomplished Reservation Form",
                    ].map((doc) => (
                      <li key={doc} className="flex items-start gap-2">
                        <BadgeCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* For OFWs */}
                <div className="flex flex-col gap-4 border border-border rounded-xl p-6 bg-white">
                  <h3 className="text-lg font-bold text-foreground border-b border-border pb-3">
                    For OFWs (Overseas Filipino Workers)
                  </h3>
                  <ul className="flex flex-col gap-2 text-sm text-neutral-600">
                    {[
                      "Valid passport and visa",
                      "OFW Employment Contract (verified by POEA/DOLE)",
                      "Certificate of Employment with Compensation",
                      "3 months payslips or remittance records",
                      "Special Power of Attorney (SPA) for authorized representative",
                      "Valid government-issued ID of authorized representative",
                    ].map((doc) => (
                      <li key={doc} className="flex items-start gap-2">
                        <BadgeCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-xs text-neutral-400">
                * Document requirements may vary per payment scheme and project.
                Our sales team will confirm the complete checklist upon your
                reservation.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* FAQ SECTION */}
        <section className="px-8 md:px-16 xl:px-44 py-16">
          <ScrollReveal>
            <div className="flex flex-col gap-8">
              <span className="flex flex-col gap-2">
                <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                  FAQ
                </p>
                <h2 className="text-4xl font-bold text-foreground">
                  Frequently Asked Questions
                </h2>
                <p className="text-neutral-600 max-w-2xl">
                  Have questions? Here are answers to some of the most common
                  inquiries from our buyers.
                </p>
              </span>

              <div className="flex flex-col gap-3">
                {faqs.map((faq) => (
                  <FAQItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-8 md:px-16 xl:px-44 py-16 bg-neutral-50">
          <ScrollReveal>
            <div className="p-6 md:p-8 rounded-xl bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative w-full">
              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl font-bold">
                  Ready to Take the First Step?
                </h3>
                <p className="text-primary-foreground/80">
                  Start your homeownership journey today. Reserve your unit or
                  reach out to our team for a personalized consultation.
                </p>
              </div>
              <div className="relative z-10 w-full md:w-auto">
                <Link href="/contact-us">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full md:w-fit"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default BuyerGuidePage;
