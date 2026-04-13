"use client";

import React, { memo, useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { dateFormatter } from "@/app/utils/dateFormatter";
import NewsCardListSkeleton from "../layout/skeleton/NewsCardListSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArticleType } from "@/app/utils/types";

const PAGE_SIZE = 6;

/** Page numbers with ellipsis when the range would be too long for the UI. */
function getPaginationItems(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 1) return [1];
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const delta = 1;
  const left = Math.max(1, currentPage - delta);
  const right = Math.min(totalPages, currentPage + delta);

  const items: (number | "ellipsis")[] = [];

  if (left > 1) {
    items.push(1);
    if (left > 2) items.push("ellipsis");
  }

  for (let i = left; i <= right; i++) {
    items.push(i);
  }

  if (right < totalPages) {
    if (right < totalPages - 1) items.push("ellipsis");
    items.push(totalPages);
  }

  return items;
}

/** Haystack is pre-lowercased once per article when data loads — avoids huge string work on each search/pagination. */
function articleMatchesSearchHay(hay: string, query: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  return terms.every((t) => hay.includes(t));
}

const NewsArticleCard = memo(function NewsArticleCard({ article }: { article: any }) {
  return (
    <div className="min-w-0">
      <div className="flex flex-col bg-white rounded-xl overflow-hidden hover:shadow-xs border border-border transition-shadow h-full">
        <div className="h-48 bg-neutral-200 relative shrink-0">
          {article.photoUrl && (
            <Image
              src={article.photoUrl}
              alt={article.headline}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33.333vw"
            />
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-secondary uppercase">{article.type}</span>
            <span className="text-xs text-neutral-400">{dateFormatter(article.publishDate)}</span>
          </div>
          <h1 className="text-xl font-bold mb-3 line-clamp-2 uppercase">{article.headline}</h1>
          <p className="text-sm text-neutral-600 mb-6 line-clamp-3 flex-1">{article.body}</p>
          <Link href={`/news/${article.slug}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-primary hover:bg-primary hover:text-white border-primary/30 transition-all ease-in-out duration-300"
            >
              Read
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
});

const fetchArticles = async () => {
  const response = await fetch("/api/articles");
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

function NewsCard({
  limit,
  filterCategory,
  searchQuery = "",
}: {
  limit?: number;
  filterCategory?: ArticleType;
  /** Debounced keywords from parent; articles still load once via React Query. */
  searchQuery?: string;
}) {
  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  const [page, setPage] = useState(1);
  const [, startTransition] = useTransition();

  const articlesWithSearchHay = useMemo(
    () =>
      articles.map((a: any) => ({
        article: a as any,
        searchHay: `${a.headline} ${a.body} ${a.type}`.toLowerCase(),
      })),
    [articles]
  );

  const filteredArticles = useMemo(
    () =>
      articlesWithSearchHay
        .filter((row: { article: any; searchHay: string }) => {
          const { article, searchHay } = row;
          if (filterCategory && article.type.toLowerCase() !== filterCategory.toLowerCase()) return false;
          return articleMatchesSearchHay(searchHay, searchQuery);
        })
        .map((row: { article: any; searchHay: string }) => row.article)
        .slice(0, limit ?? articles.length),
    [articlesWithSearchHay, filterCategory, limit, searchQuery]
  );

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));

  useEffect(() => {
    startTransition(() => setPage(1));
  }, [filterCategory, limit, searchQuery]);

  useEffect(() => {
    startTransition(() => setPage((p) => Math.min(p, totalPages)));
  }, [totalPages]);

  const paginationItems = useMemo(
    () => getPaginationItems(page, totalPages),
    [page, totalPages]
  );

  const pageArticles = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredArticles.slice(start, start + PAGE_SIZE);
  }, [filteredArticles, page]);

  if (isLoading) return <NewsCardListSkeleton />;
  if (isError) return <div>Error loading articles</div>;
  if (articles.length === 0) return <div>No articles found</div>;

  return (
    <div className="flex flex-col gap-6 w-full">
      {filteredArticles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageArticles.map((article: any) => (
              <NewsArticleCard key={article.id} article={article} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-neutral-100">
              <p className="text-sm font-medium text-slate-400 order-2 sm:order-1">
                Page <span className="text-slate-900">{page}</span> of{" "}
                <span className="text-slate-900">{totalPages}</span>
              </p>

              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center order-1 sm:order-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => startTransition(() => setPage((p) => Math.max(1, p - 1)))}
                  disabled={page <= 1}
                  className="rounded-lg border-neutral-200 shrink-0 hover:bg-primary/10 hover:text-primary"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="size-4" />
                </Button>

                <div className="flex items-center gap-1 flex-wrap justify-center min-w-0">
                  {paginationItems.map((item, idx) =>
                    item === "ellipsis" ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-1.5 sm:px-2 text-sm font-medium text-slate-400 select-none"
                        aria-hidden
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => startTransition(() => setPage(item))}
                        className={`min-w-[36px] sm:min-w-[40px] h-9 sm:h-10 rounded-lg text-sm font-bold cursor-pointer ${
                          item === page
                            ? "bg-primary text-white "
                            : "bg-transparent text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => startTransition(() => setPage((p) => Math.min(totalPages, p + 1)))}
                  disabled={page >= totalPages}
                  className="rounded-lg border-neutral-200 shrink-0 hover:bg-primary/10 hover:text-primary"
                  aria-label="Next page"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[200px]">
          <p className="text-neutral-900 text-xl">No articles found</p>
        </div>
      )}
    </div>
  );
}

export default NewsCard;
