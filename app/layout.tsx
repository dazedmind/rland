import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import UtilityWrapper from "./UtilityWrapper";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R Land Development Inc. | Real Estate Development Company",
  description: "R Land Development Inc. is a real estate development company that specializes in the development of residential properties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${geistMono.variable} antialiased`}
      >

        <UtilityWrapper>
          {children}
        </UtilityWrapper>
      </body>
    </html>
  )
}
