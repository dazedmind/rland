import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | R Land Development Inc.",
  description: "Get in touch with R Land Development Inc. and our team",
  keywords: ["contact us", "contact us form", "contact us page", "contact us information", "contact us details"],
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}