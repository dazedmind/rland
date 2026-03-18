"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NewsCardSkeleton from "@/components/layout/skeleton/NewsCardSkeleton";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const fetchArticles = async () => {
  const response = await fetch("/api/articles");
  if (!response.ok) throw new Error("Failed to fetch articles");
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

function FeaturedNewsCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  const featuredArticles = articles.filter((a: { isFeatured?: boolean }) => a.isFeatured);

  // CAROUSEL LOGIC: Auto-swipe every 5 seconds
  useEffect(() => {
    if (featuredArticles.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredArticles.length]);

  if (isLoading) {
    return <NewsCardSkeleton />;
  }

  if (featuredArticles.length === 0) {
    return <div>No articles found</div>;
  }

  // Active article based on carousel index
  const currentArticle = featuredArticles[currentIndex];

  return (
    <div className="group relative grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 hover:shadow-md transition-all duration-300">
      <div className="absolute bottom-4 right-4 z-10 space-x-4">
        <span>
          <button
            className="cursor-pointer"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-primary hover:text-secondary transition-all duration-300" />
          </button>
        </span>
        <span>
          <button
            className="cursor-pointer"
            onClick={() => setCurrentIndex((prev) => Math.min(featuredArticles.length - 1, prev + 1))}
            disabled={currentIndex === featuredArticles.length - 1}
          >
            <ChevronRight className="w-6 h-6 text-primary hover:text-secondary transition-all duration-300" />
          </button>
        </span>
      </div>

      <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
        {/* Transitioning Image */}
        {currentArticle?.photoUrl ? (
          <Image
            key={currentArticle?._id} // Key ensures smooth re-render/animation on change
            src={currentArticle?.photoUrl}
            alt={currentArticle?.headline}
            width={1000}
            height={1000}
            className="w-full h-full object-cover aspect-video transition-opacity duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full aspect-video bg-neutral-300 flex items-center justify-center">
            <span className="text-neutral-500 text-sm">
              {currentArticle?.headline}
            </span>
          </div>
        )}

        {/* Pagination Indicators (Optional but helpful for carousels) */}
        {featuredArticles.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            {featuredArticles.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-6 bg-secondary" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 md:p-8 flex flex-col gap-4">
        <span className="text-secondary font-bold uppercase tracking-widest text-sm transition-all duration-500">
          {currentArticle?.type}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight transition-all duration-500 uppercase">
          {currentArticle?.headline}
        </h1>
        <p className="text-sm md:text-base text-neutral-600 leading-relaxed transition-all duration-500">
          {currentArticle?.body.substring(0, 200)}...
        </p>
   
        <Link
          href={`/news/${currentArticle?.slug ?? ""}`}
          className="mt-4 py-2 font-bold text-primary flex items-center gap-2 hover:gap-4 transition-all"
        >
          Read Full Story <ArrowRight className="size-5" />
        </Link> 
      </div>
    </div>
  );
}

export default FeaturedNewsCard;
