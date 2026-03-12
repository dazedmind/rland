import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Calculator | R Land Development Inc.",
  description: "Learn more about the Loan Calculator and how to use it",
  keywords: ["loan calculator", "loan calculator form", "loan calculator page", "loan calculator information", "loan calculator details"],
};

export default function LoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}