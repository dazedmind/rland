import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | R Land Development Inc.",
  description: "Learn more about the Privacy Policy and how we protect your personal information",
  keywords: ["privacy policy", "privacy policy page", "privacy policy information", "privacy policy details"],
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}