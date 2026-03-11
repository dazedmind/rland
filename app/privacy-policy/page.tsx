"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/layout/PageBanner";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { Shield, Eye, Lock, RefreshCw, Mail, FileText, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const lastUpdated = "June 1, 2025";

const sections = [
  {
    id: "information-we-collect",
    icon: <Eye className="size-5" />,
    title: "Information We Collect",
    subsections: [
      {
        subtitle: "Personal Information",
        body: "When you inquire about our properties, reserve a unit, or contact us, we may collect personal information such as your full name, contact number, email address, home address, and government-issued identification details.",
      },
      {
        subtitle: "Financial Information",
        body: "For buyers who proceed with a reservation or financing application, we may collect income-related documents, payslips, bank statements, and tax returns solely for the purpose of processing your application.",
      },
      {
        subtitle: "Usage Data",
        body: "We automatically collect certain information when you visit our website, including your IP address, browser type, pages visited, and the time and date of your visit. This data is used to improve our website and services.",
      },
    ],
  },
  {
    id: "how-we-use",
    icon: <FileText className="size-5" />,
    title: "How We Use Your Information",
    subsections: [
      {
        subtitle: "Service Delivery",
        body: "We use the information you provide to process property reservations, communicate updates about your chosen unit, and facilitate the home buying process from reservation to turnover.",
      },
      {
        subtitle: "Communications",
        body: "With your consent, we may use your contact details to send you updates on new projects, promotions, and relevant announcements. You may opt out of marketing communications at any time.",
      },
      {
        subtitle: "Legal Compliance",
        body: "We may use your information to comply with applicable laws and regulations, including requirements under Philippine data privacy laws and real estate regulations.",
      },
    ],
  },
  {
    id: "data-sharing",
    icon: <RefreshCw className="size-5" />,
    title: "Information Sharing & Disclosure",
    subsections: [
      {
        subtitle: "Authorized Third Parties",
        body: "We may share your information with financing institutions (banks, Pag-IBIG), government agencies, and accredited third-party service providers strictly as required to facilitate your transaction. We do not sell your personal data.",
      },
      {
        subtitle: "Legal Requirements",
        body: "We may disclose your information if required by law, court order, or governmental authority, or when we believe disclosure is necessary to protect the rights, property, or safety of R Land, our clients, or others.",
      },
    ],
  },
  {
    id: "data-security",
    icon: <Lock className="size-5" />,
    title: "Data Security",
    subsections: [
      {
        subtitle: "Security Measures",
        body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Physical and digital safeguards are maintained across our systems.",
      },
      {
        subtitle: "Retention",
        body: "We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law. After this period, data is securely disposed of in accordance with our internal data management procedures.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: <Shield className="size-5" />,
    title: "Your Rights",
    subsections: [
      {
        subtitle: "Access & Correction",
        body: "Under the Data Privacy Act of 2012 (Republic Act No. 10173), you have the right to access, correct, and update your personal information held by R Land Development Inc. You may submit a request to our Data Protection Officer.",
      },
      {
        subtitle: "Withdrawal of Consent",
        body: "You may withdraw consent for the processing of your personal data at any time, subject to legal or contractual obligations. Withdrawal of consent may affect our ability to provide certain services.",
      },
      {
        subtitle: "Complaints",
        body: "If you believe your data privacy rights have been violated, you have the right to lodge a complaint with the National Privacy Commission (NPC) of the Philippines.",
      },
    ],
  },
  {
    id: "contact-dpo",
    icon: <Mail className="size-5" />,
    title: "Contact Our DPO",
    subsections: [
      {
        subtitle: "Get in Touch",
        body: "For any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please reach out to our designated Data Protection Officer at privacy@rland.com.ph or contact us through our official office address.",
      },
    ],
  },
];

const yourRightsList = [
  "Right to be informed of how your data is being processed",
  "Right to access your personal data held by R Land",
  "Right to correct inaccurate or outdated personal information",
  "Right to object to processing of your personal data",
  "Right to erasure or blocking of your personal data",
  "Right to lodge a complaint with the National Privacy Commission",
];

function PrivacyPolicyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("information-we-collect");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

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

      <PageBanner
        title="Privacy Policy"
        description="Your privacy matters to us. Learn how R Land Development Inc. collects, uses, and protects your personal information."
        breadcrumb="Privacy Policy"
      />

      <main className="flex flex-col">
        {/* INTRO */}
        <section className="flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center py-16 space-y-6">
          <span className="flex flex-col gap-4 w-full">
            <h1 className="text-4xl font-bold text-primary">
              Our Commitment to Your Privacy
            </h1>
            <p className="leading-relaxed text-neutral-600 max-w-3xl">
              R Land Development Inc. is committed to protecting the privacy and
              security of your personal information. This Privacy Policy
              describes how we collect, use, disclose, and safeguard your data
              in accordance with the Data Privacy Act of 2012 (Republic Act No.
              10173) and other applicable Philippine regulations.
            </p>
            <p className="text-xs text-neutral-400">Last updated: {lastUpdated}</p>
          </span>
        </section>

        {/* TWO-COLUMN LAYOUT */}
        <section className="px-8 md:px-16 xl:px-44 pb-20">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Sticky sidebar nav */}
            <aside className="lg:sticky lg:top-36 w-full lg:w-64 shrink-0 flex flex-col gap-1 bg-neutral-50 border border-border rounded-md p-4">
              <p className="text-secondary font-semibold uppercase text-xs tracking-wider mb-2 px-2">
                Contents
              </p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 text-sm px-3 py-2 rounded-md transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-primary text-white font-semibold"
                      : "text-neutral-500 hover:text-primary hover:bg-neutral-100"
                  }`}
                >
                  <span className={activeSection === section.id ? "text-white" : "text-neutral-500"}>
                    {section.icon}
                  </span>
                  <span>{section.title}</span>
                </a>
              ))}
            </aside>

            {/* Policy content */}
            <div className="flex flex-col gap-12 flex-1 min-w-0">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="flex flex-col gap-6 scroll-mt-32"
                >
                  {/* Section header */}
                  <div className="flex items-center gap-2 pb-3 border-b border-border">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 text-primary shrink-0">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-primary">
                      {section.title}
                    </h2>
                  </div>

                  {/* Subsection cards */}
                  <div className="flex flex-col gap-4">
                    {section.subsections.map((sub) => (
                      <div
                        key={sub.subtitle}
                        className=" rounded-md p-5  flex flex-col gap-2"
                      >
                        <p className="text-secondary font-semibold uppercase text-xs tracking-wider">
                          {sub.subtitle}
                        </p>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {sub.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Additional content for "your-rights" */}
                  {section.id === "your-rights" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-4 border border-border rounded-md p-6 bg-white">
                        <h3 className="text-base font-bold text-primary border-b border-border pb-3">
                          Rights Under RA 10173
                        </h3>
                        <ul className="flex flex-col gap-2 text-sm text-neutral-600">
                          {yourRightsList.map((right) => (
                            <li key={right} className="flex items-start gap-2">
                              <BadgeCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                              <span>{right}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-4 border border-border rounded-md p-6 bg-white">
                        <h3 className="text-base font-bold text-primary border-b border-border pb-3">
                          How to Exercise Your Rights
                        </h3>
                        <div className="flex flex-col gap-3 text-sm text-neutral-600 leading-relaxed">
                          <p>
                            Submit a written request to our Data Protection
                            Officer including your full name, contact details,
                            and a description of your request. We will respond
                            within a reasonable timeframe.
                          </p>
                          <p>
                            We may require additional verification to confirm
                            your identity before proceeding with your request.
                          </p>
                          <p>
                            For complaints, you may also contact the{" "}
                            <span className="font-semibold text-primary">
                              National Privacy Commission (NPC)
                            </span>{" "}
                            of the Philippines directly.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Changes notice */}
              <div className="flex flex-col gap-3 border border-border rounded-md p-6 bg-neutral-50">
                <h2 className="text-lg font-bold text-primary">
                  Changes to This Policy
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or applicable laws. We will notify
                  you of any material changes by posting the updated policy on
                  our website with a revised effective date. Continued use of
                  our services after any changes constitutes your acknowledgment
                  of the updated policy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-8 md:px-16 xl:px-44 py-16 bg-neutral-50">
          <div className="p-6 md:p-8 rounded-md bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative w-full">
            <div className="relative z-10 space-y-2">
              <h3 className="text-2xl font-bold">
                Have questions about your data?
              </h3>
              <p className="text-primary-foreground/80">
                Reach out to our Data Protection Officer for any
                privacy-related inquiries or to exercise your rights.
              </p>
            </div>
            <div className="relative z-10 w-full md:w-auto">
              <Link href="/contact-us">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full md:w-auto text-white"
                >
                  Contact DPO
                </Button>
              </Link>
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

export default PrivacyPolicyPage;