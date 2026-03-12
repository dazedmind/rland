import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Dream Home | R Land Development Inc.",
  description: "Find your dream home with R Land Development Inc. and our team",
  keywords: ["search", "search form", "search page", "search information", "search details"],
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}