import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import UtilityWrapper from "../components/utils/UtilityWrapper";
import QueryProvider from "./providers/QueryProvider";
import CookieConsentBanner from "@/components/analytics/CookieConsentBanner";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import GoogleAnalyticsWrapper from "@/components/analytics/GoogleAnalyticsWrapper";
import { ConsentProvider } from "@/components/analytics/ConsentProvider";
import ScrollToTop from "@/components/utils/ScrollToTop";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${figtree.variable} ${geistMono.variable} antialiased`}
      >
        <ConsentProvider>
          <ScrollToTop />
          <GoogleAnalyticsWrapper gaId={GA_MEASUREMENT_ID as string} />
          <GoogleTagManager gtmId={GA_MEASUREMENT_ID as string} />
            <QueryProvider>
              <UtilityWrapper>
                {children}
              </UtilityWrapper>
            </QueryProvider>
          <CookieConsentBanner />
        </ConsentProvider>
      </body>
    </html>
  )
}
