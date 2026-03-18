"use client";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/layout/PageBanner";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PromoCard from "@/components/cards/PromoCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import promo1 from "@/public/promo-sample.png";
import { Promo } from "@/app/utils/types";
import { dateFormatter } from "../utils/dateFormatter";
import PromoPageSkeleton from "@/components/layout/skeleton/PromoPageSkeleton";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

async function fetchPromos(): Promise<Promo[]> {
  const response = await fetch("/api/promos");
  if (!response.ok) throw new Error("Failed to fetch promos");
  return response.json();
}

function PromosPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: promos = [], isLoading } = useQuery({
    queryKey: ["promos"],
    queryFn: fetchPromos,
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pt-20 md:pt-30">
      <header>
        <NavBar isScrolled={true} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <PageBanner
        title="Promos"
        description="View current and upcoming promos and discounts."
        breadcrumb="Promos"
      />

      {isLoading ? (
        <PromoPageSkeleton />
      ) : (
        <>
          <main>
          <ScrollReveal>
            {/* ABOUT US SECTION */}
            <section className="flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center py-16 space-y-8">
              <span className="flex flex-col gap-4">
                <span className="flex flex-col gap-2">
                  <h1 className="text-4xl font-bold text-primary">
                    Current Promos and Offers
                  </h1>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    Take advantage of our current promos and offers.
                  </p>
                </span>

                {/* PROMO CARDS */}
                <div className="grid grid-cols-1 lg:grid-cols-1 justify-center gap-4 w-full">
                  {promos.map((promo: Promo) => (
                    <PromoCard
                      key={promo.id}
                      title={promo.title}
                      description={promo.description}
                      image={promo1}
                      date={dateFormatter(promo.endDate.toString())}
                      id={promo.id}
                    />
                  ))}
                </div>
              </span>

              <div className="p-6 md:p-8 rounded-md bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden relative w-full">
                <div className="relative z-10 space-y-2">
                  <h3 className="text-2xl font-bold">
                    Don't miss out on future deals
                  </h3>
                  <p className="text-neutral-300">
                    Subscribe to our newsletter and get notified as soon as new promos drop.
                  </p>
                </div>
                <div className="relative z-10 w-full md:w-auto">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full md:w-auto text-white"
                    onClick={() => scrollToSection("newsletter")}
                  >
                    <Bell className="size-5" strokeWidth={3}/>
                    Notify Me
                  </Button>
                </div>
              </div>
            </section>
          </ScrollReveal>
          </main>
        </>
      )}

      <footer id="newsletter">
        <Footer />
      </footer>
    </div>
  );
}

export default PromosPage;
