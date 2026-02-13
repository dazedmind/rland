import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import UtilityWrapper from "./UtilityWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieConsentBanner from "@/components/CookieConsentBanner";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: "R Land Development Inc. | Real Estate Development Company",
  description: "R Land Development Inc. is a real estate development company that specializes in the development of residential properties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!GA_MEASUREMENT_ID) {
    console.log("GA_MEASUREMENT_ID is not set");
  }
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID as string} />
        <UtilityWrapper>
          {children}
        </UtilityWrapper>
        <CookieConsentBanner />
      </body>
    </html>
  )
}
