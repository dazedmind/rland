import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brokers Accreditation | R Land Development Inc.",
  description: "Learn more about the Brokers Accreditation Program and how to become an accredited broker",
  keywords: ["brokers accreditation", "accredited brokers", "real estate brokers", "real estate accreditation", "real estate broker accreditation"],
};

export default function BrokersAccreditationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}