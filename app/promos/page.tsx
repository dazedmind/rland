"use client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import MobileNavBar from "@/components/MobileNavBar";
import { useState } from "react";
import PromoCard from "@/components/PromoCard";
import promo1 from "@/public/promo-sample.png";

function PromosPage() {
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
        title="Promos"
        description="View current and upcoming promos and discounts."
        breadcrumb="Promos"
      />

      <main>
        {/* ABOUT US SECTION */}
        <section className="flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center py-16 space-y-8">
          <span className="flex flex-col gap-4">
            <span className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-primary">
                Current Promos and Discounts
              </h1>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                Take advantage of our current promos and discounts.
              </p>
            </span>
         
            {/* PROMO CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-1 justify-center gap-4 w-full">
              <PromoCard
                title="🧧 New Year, New Keys! 🧧"
                description="Celebrate the Lunar New Year with a move that brings prosperity and lasting joy. Whether you're looking for a modern city sky-pad or a peaceful suburban retreat, Horizon Realty is helping you unlock the door to your future with exclusive holiday deals!."
                image={promo1}
                date="January 1, 2026"
              />

              <PromoCard
                title="Valentine's Day, New Home Together! 💘"
                description="Show your love this Valentine's Day with a special offer from Horizon Realty. Whether you're looking for a modern city sky-pad or a peaceful suburban retreat, Horizon Realty is helping you unlock the door to your future with exclusive holiday deals!."
                image={promo1}
                date="January 1, 2026"
              />
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

export default PromosPage;
