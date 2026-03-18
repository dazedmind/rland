import React from "react";
import { getCareer } from "@/lib/data";
import { CareerDetailsView } from "@/components/views/CareerDetailsView";
import { CareersNotFound } from "@/components/views/CareersNotFound";

export const revalidate = 3600; // ISR: revalidate every hour

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CareerDetailsPage({ params }: Props) {
  const { id } = await params;
  const career = await getCareer(id);

  if (!career) {
    return <CareersNotFound />;
  }

  return <CareerDetailsView career={career} />;
}
