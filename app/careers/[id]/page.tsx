import React from "react";
import type { Metadata } from "next";
import { getCareer } from "@/lib/data";
import { CareerDetailsView } from "@/components/views/CareerDetailsView";
import { CareersNotFound } from "@/components/views/CareersNotFound";

export const revalidate = 3600; // ISR: revalidate every hour

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const career = await getCareer(id);

  return {
    title: career ? `${career.position} | R Land Development Inc.` : "Career | R Land Development Inc.",
    description: career ? `${career.jobDescription.replace(/\s+/g, " ").slice(0, 160)}...` : "Career opportunities at R Land Development Inc.",
    keywords: ["careers", "jobs", "hiring", career?.position ?? "careers"],
  };
}

export default async function CareerDetailsPage({ params }: Props) {
  const { id } = await params;
  const career = await getCareer(id);

  if (!career) {
    return <CareersNotFound />;
  }

  return <CareerDetailsView career={career} />;
}
