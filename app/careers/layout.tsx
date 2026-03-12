import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | R Land Development Inc.",
  description: "Learn more about the Careers at R Land Development Inc. and how to apply",
  keywords: ["careers", "job openings", "job opportunities", "job listings", "job applications"],
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}