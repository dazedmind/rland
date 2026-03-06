"use client";
import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/layout/PageBanner";
import FeaturedNewsCard from "@/components/cards/FeaturedNewsCard";
import MobileNavBar from "@/components/layout/MobileNavBar";
import NewsCardList from "@/components/cards/NewsCardList";

function NewsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Announcements", "Events", "Industry Trends"];

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
        title="R Land News & Updates"
        description="Stay informed with our latest announcements, articles, and industry trends."
        breadcrumb="News"
      />
      
      <main>
        {/* FEATURED STORY SECTION */}
        <section className="px-8 md:px-16 xl:px-44 py-16">
          <h2 className="text-2xl font-bold mb-4 text-primary uppercase">Featured Story</h2>
          <FeaturedNewsCard />
        </section>

        {/* NEWS FEED SECTION */}
        <section className="px-8 md:px-16 xl:px-44 py-16 bg-neutral-50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <h2 className="text-3xl font-bold">Latest News</h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? "bg-primary text-white" : "bg-white text-neutral-500 border border-neutral-200 hover:border-primary"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of News Cards */}
          <NewsCardList />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default NewsPage;
