import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { MoveLeft } from "lucide-react";
import { getArticle } from "@/lib/data";
import { ArticleView } from "@/components/views/ArticleView";

export const revalidate = 3600; // ISR: revalidate every hour

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  return {
    title: article ? `${article.headline} | R Land Development Inc.` : "Article | R Land Development Inc.",
    description: article ? `${article.body.replace(/\s+/g, " ").slice(0, 160)}...` : "News and updates from R Land Development Inc.",
    keywords: ["news", "articles", "updates", article?.type ?? "news"],
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return (
      <div className="pt-15 md:pt-25 min-h-screen flex flex-col items-center justify-center gap-4 px-8">
        <p className="text-neutral-600">Article not found</p>
        <Link
          href="/news"
          className="flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-semibold"
        >
          <MoveLeft size={20} /> Back to News
        </Link>
      </div>
    );
  }

  return <ArticleView article={article} />;
}
