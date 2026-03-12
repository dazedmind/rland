import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservation | R Land Development Inc.",
  description: "Learn more about the Reservation and how to reserve your dream home",
  keywords: ["reservation", "reservation form", "reservation page", "reservation information", "reservation details"],
};

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}