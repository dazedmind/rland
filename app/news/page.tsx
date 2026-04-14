"use client";
import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/layout/PageBanner";
import FeaturedNewsCard from "@/components/cards/FeaturedNewsCard";
import MobileNavBar from "@/components/layout/MobileNavBar";
import NewsCard from "@/components/cards/NewsCard";
import { ArticleType } from "@/app/utils/types";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import NewsFeedSearch from "@/components/news/NewsFeedSearch";

function NewsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["All", "Announcement", "News", "Blog"];

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

      <main>
        <section className=" min-h-[90dvh] flex items-center justify-center lg:justify-start overflow-hidden rounded-b-[2rem] md:rounded-b-[4rem] xl:rounded-b-[6rem] mx-5 md:mx-10 bg-linear-to-r from-primary to-blue-950 pt-20 relative">
          <div className="w-25 rotate-30 bg-linear-to-t from-primary to-blue-950 h-full absolute top-30 right-20 z-0"></div>
          <div className="w-30 rotate-30 bg-linear-to-t from-primary to-blue-950 h-full absolute -top-40 right-20 z-0 rounded-full"></div>

          <div className="px-8 md:px-16 xl:px-44 z-10 flex gap-12 items-center relative">
            <ScrollReveal>
              <div className="py-12 lg:py-24 text-center lg:text-left flex flex-col gap-8">
                <span className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-medium text-white">
                    R Land{" "}
                    <span className="text-secondary font-bold">
                      News & Updates
                    </span>
                  </h1>
                  <p className="leading-relaxed text-neutral-200 max-w-xl mx-auto lg:mx-0">
                    Stay informed with our latest announcements, articles, and
                    industry trends.
                  </p>
                </span>

                <div className="flex gap-4 justify-center lg:justify-start w-full lg:w-fit">
                  <Button
                    size="sm"
                    className="flex-1 md:w-fit"
                    onClick={() => scrollToSection("featured-story")}
                  >
                    View All
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
        {/* FEATURED STORY SECTION */}

        <ScrollReveal className="w-full">
          <section id="featured-story" className="px-8 md:px-16 xl:px-44 py-16">
            <h2 className="text-2xl font-bold mb-4 text-primary uppercase">
              Featured Story
            </h2>
            <FeaturedNewsCard />
          </section>
        </ScrollReveal>

        {/* NEWS FEED SECTION */}
        <section className="px-8 md:px-16 xl:px-44 py-16 bg-neutral-50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <h2 className="text-3xl font-bold">News and Articles</h2>

            <div className="flex flex-wrap gap-2 items-center">
              <NewsFeedSearch onDebouncedQueryChange={setSearchQuery} />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${filter === cat ? "bg-primary text-white" : "bg-white text-neutral-500 border border-neutral-200 hover:border-primary"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of News Cards */}
          <ScrollReveal className="w-full">
            <NewsCard
              filterCategory={
                filter === "All"
                  ? undefined
                  : (filter.toLowerCase() as ArticleType)
              }
              searchQuery={searchQuery}
            />
          </ScrollReveal>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default NewsPage;
