"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { urlNameToSlug } from "@/lib/utils";
import { dateFormatter } from "@/app/utils/dateFormatter";
import NewsCardListSkeleton from "../layout/skeleton/NewsCardListSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArticleType } from "@/app/utils/types";

const fetchArticles = async () => {
  const response = await fetch("/api/articles");
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

function NewsCard({ limit, filterCategory }: { limit?: number; filterCategory?: ArticleType }) {
  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ["articles"], // Unique key for caching
    queryFn: fetchArticles,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnapCount, setScrollSnapCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnapCount(emblaApi.scrollSnapList().length);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (isLoading) return <NewsCardListSkeleton />;
  if (isError) return <div>Error loading articles</div>;
  if (articles.length === 0) return <div>No articles found</div>;

  // Filter logic (cleaner to do it here once)
  const filteredArticles = articles
    .filter((article: any) => 
      filterCategory ? article.type.toLowerCase() === filterCategory.toLowerCase() : true
    )
    .slice(0, limit ?? articles.length);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          {filteredArticles.length > 0 ? (
            <div className="flex touch-pan-y -ml-4">
              {filteredArticles.map((article: any) => (
                <div key={article.id} className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                  <div className="flex flex-col bg-white rounded-md overflow-hidden border border-border hover:shadow-xs transition-shadow h-full">
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
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 uppercase">{article.headline}</h3>
                      <p className="text-sm text-neutral-600 mb-6 line-clamp-3 flex-1">{article.body}</p>
                      <Link href={`/news/${urlNameToSlug(article.headline)}`}>
                        <Button variant="outline" size="sm" className="w-full text-primary hover:bg-primary hover:text-white border-primary/30 transition-all ease-in-out duration-300">
                          Read
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px]">
              <p className="text-neutral-900 text-xl">No articles found</p>
            </div>
          )}
        </div>

        <button type="button" onClick={scrollPrev} disabled={!canScrollPrev} className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 hidden xl:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-border hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all">
          <ChevronLeft className="size-6 text-neutral-800" />
        </button>
        <button type="button" onClick={scrollNext} disabled={!canScrollNext} className="absolute -right-20 top-1/2 -translate-y-1/2 z-10 hidden xl:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-border hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all">
          <ChevronRight className="size-6 text-neutral-800" />
        </button>
      </div>

      {filteredArticles.length > 0 && scrollSnapCount > 1 && (
        <div className="flex justify-center gap-2">
          {filteredArticles.map((_: any, i: number) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all ${i === selectedIndex ? "w-6 bg-primary" : "w-2 bg-neutral-300 hover:bg-neutral-400"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsCard;