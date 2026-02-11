import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

function NewsCard({
  articleImage,
  articleTitle,
  articleCategory,
  articleDate,
  articleExcerpt,
  articleID,
}: {
  articleImage: StaticImageData;
  articleTitle: string;
  articleCategory: string;
  articleDate: string;
  articleExcerpt: string;
  articleID: number;
}) {
  return (
    <div
      key={articleID}
      className="flex flex-col bg-white rounded-xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="h-48 bg-neutral-200">
        <Image
          src={articleImage}
          alt={articleTitle}
          width={300}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>{" "}
      {/* Image Placeholder */}
      <div className="p-6 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-secondary uppercase">
            {articleCategory}
          </span>
          <span className="text-xs text-neutral-400">{articleDate}</span>
        </div>
        <h3 className="text-xl font-bold mb-3 line-clamp-2">{articleTitle}</h3>
        <p className="text-sm text-neutral-600 mb-6 line-clamp-3">
          {articleExcerpt}
        </p>
        <Link
          href={`/news/${articleID}`}
          className="bg-transparent text-primary px-4 py-2 rounded-full text-center mt-auto font-semibold text-sm border border-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default NewsCard;
