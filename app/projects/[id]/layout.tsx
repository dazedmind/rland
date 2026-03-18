import type { Metadata } from "next";
import { getProjectDetails } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await getProjectDetails(id);
  const name = data?.project?.projectName ?? "Project";

  return {
    title: `${name} | R Land Development Inc.`,
    description: `${name} is a project developed by R Land Development Inc.`,
    keywords: ["projects", "project list", "project details", "project information", name],
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}