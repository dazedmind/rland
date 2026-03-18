import React from "react";
import { getProjectDetails } from "@/lib/data";

export const revalidate = 3600; // ISR: revalidate every hour
import { ProjectDetailsView } from "@/components/views/ProjectDetailsView";
import { ProjectsNotFound } from "@/components/views/ProjectsNotFound";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailsPage({ params }: Props) {
  const { id } = await params;
  const data = await getProjectDetails(id);

  if (!data) {
    return <ProjectsNotFound />;
  }

  return <ProjectDetailsView data={data} />;
}
