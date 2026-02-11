"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelRightClose, X } from "lucide-react";
import rlandLogo from "@/public/rland_logo.png";

interface MobileNavBarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

function MobileNavBar({ isMenuOpen, setIsMenuOpen }: MobileNavBarProps) {
  const pathname = usePathname();

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Projects", href: "/projects" },
    { name: "Broker's Accreditation", href: "/brokers-accreditation" },
    { name: "News", href: "/news" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const utilityLinks = [
    { name: "Loan Calculator", href: "/loan-calculator" },
    { name: "Buyer's Guide", href: "/buyer-guide" },
    { name: "Promos", href: "/promos" },
    { name: "Broker's Login", href: "/broker-login" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-70 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <Image
              src={rlandLogo}
              alt="R Land Logo"
              width={100}
              height={100}
              className="h-12 w-auto"
            />
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Close menu"
          >
            <PanelRightClose className="w-6 h-6 text-neutral-600" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex flex-col h-[calc(100%-88px)] overflow-y-auto">
          {/* Main Links */}
          <nav className="flex flex-col p-4 space-y-1">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white font-semibold"
                      : "text-neutral-700 hover:bg-neutral-100 font-medium"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="border-t border-neutral-200 my-4" />

          {/* Utility Links */}
          <nav className="flex flex-col p-4 space-y-1">
            <p className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Quick Links
            </p>
            {utilityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-lg transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Reserve Now Button */}
          <div className="mt-auto p-4 border-t border-neutral-200">
            <button className="w-full bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm">
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNavBar;
