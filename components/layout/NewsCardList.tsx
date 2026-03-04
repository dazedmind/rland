import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { dateFormatter } from "@/app/utils/dateFormatter";
import NewsCardListSkeleton from "./skeleton/NewsCardListSkeleton";

function NewsCardList() {
  const [articles, setArticles] = useState([]);
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
    return <NewsCardListSkeleton />;
  }

  if (articles.length === 0) {
    return <div>No articles found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {articles.slice(0, 3).map((article: any) => (
          <div key={article.id} className="flex flex-col bg-white rounded-xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-neutral-200 relative">
              <div className="bg-linear-to-t from-white via-white/20 to-transparent w-full h-full absolute"></div>
              <Image
                src={article.photoUrl}
                alt={article.headline}
                width={300}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>{" "}
            
            {/* Image Placeholder */}
            <div className="p-6 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-secondary uppercase">
                  {article.type}
                </span>
                <span className="text-xs text-neutral-400">
                  {dateFormatter(article.publishDate)}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 line-clamp-2 xl:text-nowrap">
                {article.headline}
              </h3>
              <p className="text-sm text-neutral-600 mb-6 line-clamp-3">
                {article.body}
              </p>
              <Link
                href={`/news/${article.id}`}
                className="bg-primary text-white px-4 py-2 rounded-full text-center mt-auto font-semibold text-sm border border-primary hover:bg-primary/90 hover:text-white hover:border-primary transition-all duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
      ))}
    </div>
  );
}

export default NewsCardList;
