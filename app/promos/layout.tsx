import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promos | R Land Development Inc.",
  description: "Learn more about the Promos and Offers at R Land Development Inc.",
  keywords: ["promos", "promo list", "promo details", "promo information", "promo details"],
};

export default function PromosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}