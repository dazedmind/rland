import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | R Land Development Inc.",
  description: "Learn more about R Land Development Inc. and our mission",
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}