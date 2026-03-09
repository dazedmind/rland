"use client";
import React from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/layout/PageBanner";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const buyingSteps = [
  {
    step: 1,
    icon: <Search className="w-8 h-8" />,
    title: "Explore Our Projects",
    description:
      "Browse through our available developments — Arcoe Residences, Arcoe Estates, and more. Compare unit types, locations, amenities, and price ranges to find the community that fits your lifestyle and budget.",
  },
  {
    step: 2,
    icon: <Handshake className="w-8 h-8" />,
    title: "Schedule a Site Visit",
    description:
      "Visit our properties in person to get a feel for the community and surroundings. Our sales team will be ready to walk you through available lots and house models.",
  },
  {
    step: 3,
    icon: <FileText className="w-8 h-8" />,
    title: "Choose Your Payment Scheme",
    description:
      "Select a payment option that works for you — spot cash, in-house financing, or bank/Pag-IBIG loan. Use our Loan Calculator to estimate monthly amortizations before you commit.",
  },
  {
    step: 4,
    icon: <ClipboardList className="w-8 h-8" />,
    title: "Submit Reservation & Requirements",
    description:
      "Complete the reservation form and submit the required documents. A reservation fee secures your chosen unit while documents are being processed.",
  },
  {
    step: 5,
    icon: <BadgeCheck className="w-8 h-8" />,
    title: "Contract Signing",
    description:
      "Once your documents are verified and financing is approved, you will be invited to sign the Contract to Sell. Review all terms carefully before signing.",
  },
  {
    step: 6,
    icon: <KeyRound className="w-8 h-8" />,
    title: "Turnover & Move-In",
    description:
      "After full payment or loan release, you will receive your unit during a formal turnover. Inspect your property, sign the acceptance documents, and receive your keys.",
  },
];

const paymentOptions = [
  {
    icon: <PhilippinePeso className="w-8 h-8 text-secondary" />,
    title: "Spot Cash",
    description:
      "Pay the full purchase price in a single transaction. This option typically comes with the best discount and the fastest processing time.",
  },
  {
    icon: <Home className="w-8 h-8 text-secondary" />,
    title: "In-House Financing",
    description:
      "Flexible payment terms directly through R Land with no bank requirements. Ideal for buyers who want a more accessible and straightforward financing process.",
  },
  {
    icon: <FileText className="w-8 h-8 text-secondary" />,
    title: "Bank Loan",
    description:
      "Finance your home through a bank of your choice. Enjoy competitive interest rates and longer payment terms, subject to bank approval.",
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-secondary" />,
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
        <h3 className="font-semibold text-primary text-sm md:text-base">
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
        title="Buyer's Guide"
        description="Everything you need to know about purchasing your dream home with R Land."
        breadcrumb="Buyer's Guide"
      />

      <main className="flex flex-col">
        {/* INTRO SECTION */}
        <section className="flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center py-16 space-y-6">
          <span className="flex flex-col gap-4 w-full">
            <h1 className="text-4xl font-bold text-primary">
              Your Journey to Homeownership Starts Here!
            </h1>
            <p className="leading-relaxed text-neutral-600 w-full">
              Buying a home is one of the most significant decisions you will
              ever make. At R Land Development Inc., we are committed to making
              the process as clear, straightforward, and stress-free as
              possible. This guide walks you through every step — from exploring
              our communities to receiving the keys to your new home.
            </p>
          </span>
        </section>

        {/* STEP-BY-STEP BUYING PROCESS */}
        <section className="px-8 md:px-16 xl:px-44 py-16 bg-neutral-50">
          <div className="flex flex-col gap-10">
            <span className="flex flex-col gap-2">
              <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                Step-by-Step
              </p>
              <h2 className="text-4xl font-bold text-primary">
                The Home Buying Process
              </h2>
              <p className="text-neutral-600 max-w-2xl">
                Follow these six steps to guide you from browsing to moving in.
              </p>
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buyingSteps.map((item) => (
                <div
                  key={item.step}
                  className="group relative flex flex-col gap-4 border border-border rounded-xl p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Step number accent */}
                  <span className="absolute top-4 right-4 text-6xl font-black text-neutral-100 select-none group-hover:text-primary/10 transition-colors duration-300">
                    {item.step}
                  </span>

                  {/* Icon */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-primary to-blue-950 text-white shrink-0">
                    {item.icon}
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAYMENT OPTIONS SECTION */}
        <section className="px-8 md:px-16 xl:px-44 py-16">
          <div className="flex flex-col gap-10">
            <span className="flex flex-col gap-2">
              <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                Financing
              </p>
              <h2 className="text-4xl font-bold text-primary">
                Payment Options
              </h2>
              <p className="text-neutral-600 max-w-2xl">
                R Land offers flexible payment schemes to help make
                homeownership accessible. Choose the option that best fits your
                financial situation.
              </p>
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paymentOptions.map((option) => (
                <div
                  key={option.title}
                  className="flex flex-col gap-4 border border-border rounded-xl p-6 bg-neutral-50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white border border-border shrink-0">
                      {option.icon}
                    </div>
                    <h3 className="text-lg font-bold text-primary">
                      {option.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {option.description}
                  </p>
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
              <Link href="/loan-calculator" className="shrink-0 w-full md:w-fit">
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
        </section>

        {/* REQUIRED DOCUMENTS SECTION */}
        <section className="px-8 md:px-16 xl:px-44 py-16 bg-neutral-50">
          <div className="flex flex-col gap-8">
            <span className="flex flex-col gap-2">
              <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                Documents
              </p>
              <h2 className="text-4xl font-bold text-primary">
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
                <h3 className="text-lg font-bold text-primary border-b border-border pb-3">
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
                <h3 className="text-lg font-bold text-primary border-b border-border pb-3">
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
        </section>

        {/* FAQ SECTION */}
        <section className="px-8 md:px-16 xl:px-44 py-16">
          <div className="flex flex-col gap-8">
            <span className="flex flex-col gap-2">
              <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                FAQ
              </p>
              <h2 className="text-4xl font-bold text-primary">
                Frequently Asked Questions
              </h2>
              <p className="text-neutral-600 max-w-2xl">
                Have questions? Here are answers to some of the most common
                inquiries from our buyers.
              </p>
            </span>

            <div className="flex flex-col gap-3 max-w-3xl">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-8 md:px-16 xl:px-44 py-16 bg-neutral-50">
          <div className="p-8 md:p-12 rounded-xl bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative w-full">
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
              <Button
                variant="default"
                size="lg"
                className="w-full md:w-auto text-white"
              >
                Reserve Now
              </Button>
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

export default BuyerGuidePage;
