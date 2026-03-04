import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NewsCardSkeleton from "@/components/layout/skeleton/NewsCardSkeleton";

function NewsCard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/articles");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("[GET /api/articles]", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <NewsCardSkeleton />;
  }

  if (articles.length === 0) {
    return <div>No articles found</div>;
  }
  
  return (
    <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 hover:shadow-md transition-all duration-300">
      <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden">
        {/* Replace with real Image component */}
        <Image
          src={articles[0]?.photoUrl}
          alt={articles[0]?.headline}
          width={1000}
          height={1000}
          className="w-full h-full object-cover aspect-video"
        />
      </div>
      <div className="p-8 flex flex-col gap-4">
        <span className="text-secondary font-bold uppercase tracking-widest text-sm">
          {articles[0]?.type}
        </span>
        <h1 className="text-4xl font-bold leading-tight">
          {articles[0]?.headline}
        </h1>
        <p className="text-neutral-600 leading-relaxed">
          {articles[0]?.body.substring(0, 200)}...
        </p>
        <Link
          href="/news/featured"
          className="mt-4 font-bold text-primary flex items-center gap-2 hover:gap-4 transition-all"
        >
          Read Full Story <span>→</span>
        </Link>
      </div>
    </div>
  );
}

export default NewsCard;
