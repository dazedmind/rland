"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import BackButton from "@/components/layout/BackButton";
import ShareModal from "@/components/modals/ShareModal";
import { Calendar, Share } from "lucide-react";
import { dateFormatter } from "@/app/utils/dateFormatter";
import { renderMarkdown } from "@/app/utils/markdown";
import { Button } from "@/components/ui/button";
import type { Article } from "@/lib/data";

type ArticleViewProps = {
  article: Article;
};

export function ArticleView({ article }: ArticleViewProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

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
                {article.headline}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 border-b border-neutral-100 pb-6">
                <span className="px-3 py-1 bg-secondary/80 text-white rounded-full font-bold text-xs uppercase">
                  {article.type}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} /> {dateFormatter(article.publishDate)}
                </span>
              </div>

              {article.photoUrl ? (
                <div className="relative w-full md:h-[400px] aspect-video rounded-xl overflow-hidden bg-neutral-200 shadow-inner">
                  <Image
                    src={article.photoUrl}
                    alt={article.headline}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-neutral-200 shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400 italic">
                    [Article Image]
                  </div>
                </div>
              )}

              <div
                className="prose prose-p:mb-2 prose-headings:mb-3 prose-headings:mt-6 prose-headings:first:mt-0 max-w-none text-neutral-700 leading-relaxed min-h-[500px] w-full rounded-xl [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:text-base [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_li]:my-0.5 [&_strong]:font-semibold [&_em]:italic"
                dangerouslySetInnerHTML={{
                  __html: article.body.trim() ? renderMarkdown(article.body) : "",
                }}
              />
              <div className="mt-16 pt-8 border-t border-neutral-100 flex flex-wrap justify-end md:justify-between items-center gap-4">
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
                  url={shareUrl}
                  title={article.headline}
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
