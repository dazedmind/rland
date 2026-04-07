"use client";
import React from "react";
import { MoveRight, MoveDown, Handshake, FileText, ClipboardList, BadgeCheck, KeyRound, Search } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";


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
  

function BuyingProcessRoadmap({ id }: { id: string }) {
  return (
    <section id={id} className="px-6 md:px-16 lg:px-44 py-24 bg-linear-to-b from-neutral-50 to-neutral-100 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col gap-20">
          
          {/* HEADER */}
          <div className="text-center space-y-4">
            <p className="text-secondary font-bold uppercase text-xs tracking-[0.3em]">
              The Path to Ownership
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter">
              The Home Buying Process
            </h2>
          </div>

          <div className="relative">
            {/* CENTRAL VERTICAL LINE (Desktop Only) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 z-0" />
            <div className="flex flex-col gap-12 lg:gap-0 relative z-10">
              {buyingSteps.map((item, index) => {
                const isEven = index % 2 === 1;

                return (
                <ScrollReveal key={item.step}>
                  <div className="relative flex flex-col lg:flex-row items-center w-full lg:min-h-[250px]">
                    
                    {/* STEP CONTENT - Alternates Left/Right */}
                    <div className={`w-full lg:w-1/2 flex ${isEven ? "lg:justify-start lg:order-2" : "lg:justify-end lg:order-1"}`}>
                      <div className={`w-full lg:max-w-md p-8 rounded-2xl border border-border bg-slate-50/10 transition-all duration-500 hover:bg-white/20
                        ${isEven ? "lg:ml-16" : "lg:mr-16"}
                      `}>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl font-black text-primary">{item.step}</span>
                            <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* CENTRAL NODE (The "S" Curve Point) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center z-20">
                        <div className="size-10 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-xl group-hover:border-secondary transition-colors">
                            <div className="size-2 rounded-full bg-primary" />
                        </div>
                    </div>

                    {/* MOBILE ARROW */}
                    {index !== buyingSteps.length - 1 && (
                        <div className="lg:hidden py-6 text-secondary">
                            <MoveDown size={32} />
                        </div>
                    )}

                    {/* SPACER FOR ALTERNATING (Desktop) */}
                    <div className="hidden lg:block w-1/2 lg:order-1" />
                  </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
    </section>
  );
}

export default BuyingProcessRoadmap;