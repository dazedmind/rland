import React from "react";
import Image from "next/image";
import contactBg from "@/public/contact-bg.png";
import ContactForm from "./ContactForm";
import ContactCopyItems from "./ContactItems";

function ContactSection() {
  return (
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

      <section className="relative z-10 flex flex-col lg:flex-row justify-between items-center px-8 md:px-16 xl:px-44 gap-8 py-16">
        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row items-center w-full gap-4">
          <div className="flex flex-col space-y-4 w-full lg:w-1/2">
            <span className="space-y-6">
              <h1 className="text-4xl md:text-5xl text-primary">
                Your next step in owning{" "}
                <span className="text-secondary font-bold">
                  your dream home
                </span>{" "}
                starts <span className="text-primary font-bold">here</span>
              </h1>
              <p className="text-base md:text-lg max-w-md">
                Get in touch, and we'll handle the rest. Our team is ready to
                help you find your perfect property.
              </p>
            </span>

            <span>
              <p>You may also reach us at:</p>
              <ContactCopyItems />
            </span>
          </div>

          {/* Contact Card */}
          <div className="w-full lg:w-1/2">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactSection;
