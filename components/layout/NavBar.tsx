"use client";
import React from "react";
import Image from "next/image";
import rlandLogo from "@/public/rland-logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

interface NavBarProps {
  isScrolled: boolean;
  isMenuOpen?: boolean;
  setIsMenuOpen?: (isOpen: boolean) => void;
}

function NavBar({ isScrolled, isMenuOpen, setIsMenuOpen }: NavBarProps) {
  const pathname = usePathname();
  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Projects", href: "/projects" },
    { name: "Broker's Accreditation", href: "/brokers-accreditation" },
    { name: "News", href: "/news" },
  ];

  const utilityLinks = [
    { name: "Loan Calculator", href: "/loan-calculator" },
    { name: "Buyer's Guide", href: "/buyer-guide" },
    { name: "Promos", href: "/promos" },
    { name: "Broker's Login", href: "https://broker.rland.ph/login" },
    { name: "Careers", href: "/careers" },
  ];
  
  return (
    <div>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-xl ${isScrolled ? 'bg-white border-b-6 border-primary' : ''}`}>
        {/* UTILITY NAVIGATION */}
        <div className={`hidden md:flex items-center justify-end w-full text-sm p-4 px-16 transition-colors duration-300 ${isScrolled ? 'bg-neutral-100 text-black' : 'bg-neutral-100/10 text-white'}`}>
          <div className="flex items-center gap-4 list-none uppercase text-xs">
            {utilityLinks.map((link) => {
              return (
                <li key={link.href}>
                  <a href={link.href}>{link.name}</a>
                </li>
              );
            })}
          </div>
        </div>

      {/* MAIN NAVIGATION */}
      <div className={`flex items-center justify-between w-full py-4 px-8 md:px-16 transition-colors duration-300 ${isScrolled ? 'bg-white text-primary' : 'bg-transparent text-white'}`}>
          <Link href="/">
            <Image src={rlandLogo} alt="Logo" width={100} height={100} />
          </Link>

          <div className="hidden lg:flex items-center gap-8 list-none uppercase text-sm">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`group relative py-2 transition-all duration-300 ${isActive ? 'font-bold' : 'font-normal'}`}
                  >
                    <span className={`${isScrolled ? 'text-primary' : 'text-white'} transition-all duration-300`}>
                      {link.name}
                    </span>
                    
                    {/* The Animated Line: Visible if hovered OR if page is active */}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-secondary transition-all duration-300 
                      ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}>
                    </span>
                  </Link>
                </li>
              );
            })}
            
            <Button size="sm" variant="primary" onClick={() => window.location.href = "/contact-us"}>
              CONTACT US
            </Button>
          </div>

          <div className="lg:hidden">
            <Menu
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsMenuOpen?.(!isMenuOpen)}
            />
          </div>
        </div>
       
      </nav>
    </div>
  );
}

export default NavBar;
