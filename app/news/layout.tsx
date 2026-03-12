import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News | R Land Development Inc.",
  description: "Stay informed with our latest announcements, articles, and industry trends",
  keywords: ["news", "news articles", "news updates", "news announcements", "news trends"],
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}