"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import NewsCardSkeleton from "@/components/layout/skeleton/NewsCardSkeleton";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeft, ChevronRight } from "lucide-react";

function FeaturedNewsCard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchArticles = useCallback(async () => {
    try {
      const response = await fetch("/api/articles");
      const data = await response.json();
      const featured = data.filter((article: any) => article.isFeatured);
      setArticles(featured);
    } catch (error) {
      console.error("[GET /api/articles]", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // CAROUSEL LOGIC: Auto-swipe every 5 seconds
  useEffect(() => {
    if (articles.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [articles.length]);

  if (loading) {
    return <NewsCardSkeleton />;
  }

  if (articles.length === 0) {
    return <div>No articles found</div>;
  }

  // Active article based on carousel index
  const currentArticle = articles[currentIndex];
  
  return (
    
    <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 hover:shadow-md transition-all duration-300">
      <div className="absolute bottom-4 right-4 z-10 space-x-4">
      <span>
        <button className="cursor-pointer" onClick={() => setCurrentIndex(currentIndex - 1)} disabled={currentIndex === 0}>
          <ChevronLeft className="w-6 h-6 text-primary hover:text-secondary transition-all duration-300" />
        </button>
      </span>
      <span>
        <button className="cursor-pointer" onClick={() => setCurrentIndex(currentIndex + 1)} disabled={currentIndex === articles.length - 1}>
          <ChevronRight className="w-6 h-6 text-primary hover:text-secondary transition-all duration-300" />
        </button>
      </span>
      </div>

      <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden">
        {/* Transitioning Image */}
        <Image
          key={currentArticle?._id} // Key ensures smooth re-render/animation on change
          src={currentArticle?.photoUrl}
          alt={currentArticle?.headline}
          width={1000}
          height={1000}
          className="w-full h-full object-cover aspect-video transition-opacity duration-700 ease-in-out"
        />
        
        {/* Pagination Indicators (Optional but helpful for carousels) */}
        {articles.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            {articles.map((_, idx) => (
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
      
      <div className="p-8 flex flex-col gap-4">
        <span className="text-secondary font-bold uppercase tracking-widest text-sm transition-all duration-500">
          {currentArticle?.type}
        </span>
        <h1 className="text-4xl font-bold leading-tight transition-all duration-500">
          {currentArticle?.headline}
        </h1>
        <p className="text-neutral-600 leading-relaxed transition-all duration-500">
          {currentArticle?.body.substring(0, 200)}...
        </p>
        <Link
          href={`/news/${currentArticle?.slug || currentArticle?._id}`}
          className="mt-4 font-bold text-primary flex items-center gap-2 hover:gap-4 transition-all"
        >
          Read Full Story <span>→</span>
        </Link>
      </div>
    </div>
  );
}

export default FeaturedNewsCard;