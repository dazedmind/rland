"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import Link from "next/link";
import NewsArticleSkeleton from "@/components/layout/skeleton/NewsArticleSkeleton";
import { MoveLeft, Calendar, Share } from "lucide-react";
import { dateFormatter } from "@/app/utils/dateFormatter";
import { renderMarkdown } from "@/app/utils/markdown";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/layout/BackButton";
import ShareModal from "@/components/modals/ShareModal";

type Article = {
  id: number;
  headline: string;
  body: string;
  publishDate: string;
  tags: string[];
  type: string;
  photoUrl: string | null;
};

async function fetchArticle(id: string): Promise<Article> {
  const response = await fetch(`/api/articles/${id}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error("Article not found");
    throw new Error("Failed to load article");
  }
  return response.json();
}

function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const [id, setId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (params && typeof (params as Promise<{ id: string }>).then === "function") {
      (params as Promise<{ id: string }>).then((p) => setId(p.id));
    } else {
      setId((params as { id: string }).id);
    }
  }, [params]);

  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="pt-15 md:pt-25">
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

  if (error || (!isLoading && !article)) {
    return (
      <div className="pt-15 md:pt-25 min-h-screen flex flex-col items-center justify-center gap-4 px-8">
        <p className="text-neutral-600">{error?.message ?? "Article not found"}</p>
        <Link
          href="/news"
          className="flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-semibold"
        >
          <MoveLeft size={20} /> Back to News
        </Link>
      </div>
    );
  }

  const articleData = article!;

  return (
    <div className="pt-15 md:pt-25">
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <main>
        <section className="px-8 md:px-16 lg:px-44 py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-6 mb-6">
              <span>
                <BackButton href="/news" mainPageName="News" />
              </span>

            </div>

            <article className="space-y-4">
              <h1 className="text-2xl md:text-4xl font-bold leading-tight text-primary uppercase">
                {articleData.headline}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 border-b border-neutral-100 pb-6">
              
                <span className="px-3 py-1 bg-secondary/80 text-white rounded-full font-bold text-xs uppercase">
                  {articleData.type}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} /> {dateFormatter(articleData.publishDate)}
                </span>
              </div>

              {articleData.photoUrl ? (
                <div className="relative w-full md:h-[400px] aspect-video rounded-md overflow-hidden bg-neutral-200 shadow-inner">
                  <Image
                    src={articleData.photoUrl}
                    alt={articleData.headline}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full h-[400px] rounded-md overflow-hidden bg-neutral-200 shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400 italic">
                    [Article Image]
                  </div>
                </div>
              )}

              <div
                className="prose prose-p:mb-2 prose-headings:mb-3 prose-headings:mt-6 prose-headings:first:mt-0 max-w-none text-neutral-700 leading-relaxed min-h-[500px] w-full rounded-md [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:text-base [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_li]:my-0.5 [&_strong]:font-semibold [&_em]:italic"
                dangerouslySetInnerHTML={{
                  __html: articleData.body.trim() ? renderMarkdown(articleData.body) : "",
                }}
              />
              <div className="mt-16 pt-8 border-t border-neutral-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  {articleData.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-100 px-3 py-1 rounded text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 text-primary font-bold hover:opacity-70 transition-opacity" 
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <Share size={20} /> Share Article
                </Button>

                <ShareModal 
                  isOpen={isShareModalOpen} 
                  onClose={() => setIsShareModalOpen(false)} 
                  url={window.location.href}
                  title={articleData.headline}
                />
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
