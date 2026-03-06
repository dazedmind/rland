"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import Link from "next/link";
import NewsArticleSkeleton from "@/components/layout/skeleton/NewsArticleSkeleton";
import { MoveLeft, Calendar, Share2, ArrowLeft } from "lucide-react";
import { dateFormatter } from "@/app/utils/dateFormatter";
import { renderMarkdown } from "@/app/utils/markdown";

type Article = {
  id: number;
  headline: string;
  body: string;
  publishDate: string;
  tags: string[];
  type: string;
  photoUrl: string | null;
};

function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (params && typeof (params as Promise<{ id: string }>).then === "function") {
      (params as Promise<{ id: string }>).then((p) => setId(p.id));
    } else {
      setId((params as { id: string }).id);
    }
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/articles/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Article not found");
          } else {
            setError("Failed to load article");
          }
          setArticle(null);
          return;
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article");
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 md:pt-30">
        <header>
          <NavBar isScrolled={true} />
          <MobileNavBar isMenuOpen={false} setIsMenuOpen={() => {}} />
        </header>
        <NewsArticleSkeleton />
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-20 md:pt-30 min-h-screen flex flex-col items-center justify-center gap-4 px-8">
        <p className="text-neutral-600">{error ?? "Article not found"}</p>
        <Link
          href="/news"
          className="flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-semibold"
        >
          <MoveLeft size={20} /> Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-30">
      <header>
        <NavBar isScrolled={true} />
      </header>

      <main>
        <section className="px-8 md:px-16 lg:px-44 py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-6 mb-6">
              <span>
                <Link
                  href="/news"
                  className="flex items-center gap-2 text-primary"
                >
                  {" "}
                  <ArrowLeft className="size-4" /> Back to News
                </Link>
              </span>

            </div>

            <article className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary">
                {article.headline}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 border-b border-neutral-100 pb-6">
                <span className="flex items-center gap-2">
                  <Calendar size={16} /> {dateFormatter(article.publishDate)}
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-bold text-xs uppercase">
                  {article.type}
                </span>
              </div>

              {article.photoUrl ? (
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-neutral-200 shadow-inner">
                  <Image
                    src={article.photoUrl}
                    alt={article.headline}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-neutral-200 shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400 italic">
                    [Article Image]
                  </div>
                </div>
              )}

              <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed space-y-6 whitespace-pre-wrap">
                {/* {renderMarkdown(article.body)} */}
                <div dangerouslySetInnerHTML={{ __html: article.body.trim() ? renderMarkdown(article.body) : "" }} />
              </div>

              <div className="mt-16 pt-8 border-t border-neutral-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-100 px-3 py-1 rounded text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-primary font-bold hover:opacity-70 transition-opacity">
                  <Share2 size={20} /> Share Article
                </button>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default NewsArticlePage;
