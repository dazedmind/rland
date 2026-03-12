import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "R Land Projects | R Land Development Inc.",
  description: "Learn more about the Projects and how we are developing them",
  keywords: ["projects", "project list", "project details", "project information", "project details"],
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}