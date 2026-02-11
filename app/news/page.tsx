"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import aeMeadowUnit from "@/public/ae-meadow-unit.jpg";
import aeValleyUnit from "@/public/ae-valley-unit.jpg";

// Mock Data for the articles
const newsArticles = [
  {
    id: 1,
    category: "Announcements",
    title: "R Land Breaks Ground on New Eco-Friendly Residential Project",
    date: "Feb 10, 2026",
    excerpt:
      "The latest development aims to integrate sustainable architecture with modern living...",
    image: aeMeadowUnit,
  },
  {
    id: 2,
    category: "Events",
    title: "R Land Breaks Ground on New Eco-Friendly Residential Project",
    date: "Feb 14, 2026",
    excerpt:
      "The latest development aims to integrate sustainable architecture with modern living...",
    image: aeValleyUnit,
  },
  // Add more mock items here...
];

function NewsPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Announcements", "Events", "Industry Trends"];

  return (
    <div className="pt-20 md:pt-30">
      <header>
        <NavBar isScrolled={true} />
      </header>

      <main>
        <PageBanner
          title="R Land News & Updates"
          description="Stay informed with our latest announcements, articles, and industry trends."
          breadcrumb="News"
        />

        {/* FEATURED STORY SECTION */}
        <section className="px-8 md:px-16 lg:px-44 py-16">
          <h2 className="text-3xl font-bold mb-4 ">Featured Story</h2>
          <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 hover:shadow-md transition-all duration-300">
            <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden">
              {/* Replace with real Image component */}
              <div className="w-full h-full bg-neutral-300 animate-pulse" />
            </div>
            <div className="p-8 flex flex-col gap-4">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm">
                Announcement
              </span>
              <h1 className="text-4xl font-bold leading-tight">
                R Land Development Named Developer of the Year 2026
              </h1>
              <p className="text-neutral-600 leading-relaxed">
                We are proud to announce that R Land has been recognized for its
                commitment to sustainable growth and innovative community design
                at the International Real Estate Awards...
              </p>
              <Link
                href="/news/featured"
                className="mt-4 font-bold text-primary flex items-center gap-2 hover:gap-4 transition-all"
              >
                Read Full Story <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* NEWS FEED SECTION */}
        <section className="px-8 md:px-16 lg:px-44 py-16 bg-neutral-50">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <NewsCard
                key={article.id}
                articleImage={article.image}
                articleTitle={article.title}
                articleCategory={article.category}
                articleDate={article.date}
                articleExcerpt={article.excerpt}
                articleID={article.id}
              />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default NewsPage;
