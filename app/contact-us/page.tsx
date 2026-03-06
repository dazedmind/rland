"use client";
import React from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/layout/PageBanner";
import ContactForm from "@/components/layout/ContactForm";
import { Phone, Mail, Copy, Check } from "lucide-react";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { useState } from "react";
import Image from "next/image";
import contactBg from "@/public/contact-bg.png";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function ContactUs() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);
  const [isCopiedEmail, setIsCopiedEmail] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
    setIsCopiedPhone(true);
    setIsCopiedEmail(true);
    setTimeout(() => {
      toast.dismiss();
      setIsCopiedPhone(false);
      setIsCopiedEmail(false);
    }, 1000);
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Copied to clipboard");
    setIsCopiedEmail(true);
    setTimeout(() => {
      toast.dismiss();
      setIsCopiedEmail(false);
    }, 1000);
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Copied to clipboard");
    setIsCopiedPhone(true);
    setTimeout(() => {
      toast.dismiss();
      setIsCopiedPhone(false);
    }, 1000);
  };
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
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleCopyPhone("(02) 7752 2789")}
                      className="group min-w-[160px] justify-center text-primary bg-primary/10 hover:bg-primary/10 hover:text-primary border-primary border rounded-full overflow-hidden"
                    >
                      {/* Default state */}
                      <span
                        className={`flex items-center gap-1.5 transition-all duration-300 ${isCopiedPhone ? "opacity-0 -translate-y-3 absolute" : "opacity-100 translate-y-0"}`}
                      >
                        <Phone className="size-4 shrink-0" strokeWidth={2} />
                        <p>(02) 7752 2789</p>
                        <Copy
                          className="size-4 shrink-0 w-0 overflow-hidden group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all duration-200"
                          strokeWidth={2}
                        />{" "}
                      </span>

                      {/* Copied state */}
                      <span
                        className={`flex items-center gap-1.5 transition-all duration-300 ${isCopiedPhone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 absolute"}`}
                      >
                        <Check className="size-4 shrink-0" strokeWidth={2} />
                        <p>Copied!</p>
                      </span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleCopyEmail("moreinfo@rland.ph")}
                      className="group min-w-[175px] justify-center text-primary bg-primary/10 hover:bg-primary/10 hover:text-primary border-primary border rounded-full overflow-hidden"
                    >
                      {/* Default state */}
                      <span
                        className={`flex items-center gap-1.5 transition-all duration-300 ${isCopiedEmail ? "opacity-0 -translate-y-3 absolute" : "opacity-100 translate-y-0"}`}
                      >
                        <Mail className="size-4 shrink-0" strokeWidth={2} />
                        <p>moreinfo@rland.ph</p>
                        <Copy
                          className="size-4 shrink-0 w-0 overflow-hidden group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all duration-200"
                          strokeWidth={2}
                        />
                      </span>

                      {/* Copied state */}
                      <span
                        className={`flex items-center gap-1.5 transition-all duration-300 ${isCopiedEmail ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 absolute"}`}
                      >
                        <Check className="size-4 shrink-0" strokeWidth={2} />
                        <p>Copied!</p>
                      </span>
                    </Button>
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
