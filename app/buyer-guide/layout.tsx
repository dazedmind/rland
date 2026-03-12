import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buyer's Guide | R Land Development Inc.",
  description: "Learn more about the Buyer's Guide and how to buy a home with R Land Development Inc.",
  keywords: ["buyer's guide", "buying a home", "home buying process", "home buying guide", "home buying process guide"],
};

export default function BuyerGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}