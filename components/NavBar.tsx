import React from "react";
import Image from "next/image";
import rlandLogo from "@/public/rland_logo.png";

interface NavBarProps {
  isScrolled: boolean;
}

function NavBar({ isScrolled }: NavBarProps) {
  return (
    <div>      
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-xl ${isScrolled ? 'bg-white border-b-6 border-primary' : ''}`}>
        {/* UTILITY NAVIGATION */}
        <div className={`flex items-center justify-end w-full text-sm p-2 px-16 transition-colors duration-300 ${isScrolled ? 'bg-neutral-100 text-black' : 'bg-neutral-100/10 text-white'}`}>
          <div className="flex items-center gap-4 list-none">
            <li>
              <a href="/">Loan Calculator</a>
            </li>
            <li>
              <a href="/">Buyer&apos;s Guide</a>
            </li>
            <li>
              <a href="/">Promos</a>
            </li>
            <li>
              <a href="/">Broker&apos;s Login</a>
            </li>
            <li>
              <a href="/">Careers</a>
            </li>
          </div>
        </div>

      {/* MAIN NAVIGATION */}
        <div className={`flex items-center justify-between w-full py-4 px-16 transition-colors duration-300 ${isScrolled ? 'bg-white text-primary' : 'bg-transparent text-white'}`}>
          <Image
            src={rlandLogo}
            alt="R Land Development Inc."
            width={100}
            height={100}
          />

          <div className="flex items-center gap-8 list-none">
            <li>
              <a href="/" className="hover:text-primary-fg">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-primary-fg">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-primary-fg">
                Projects
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-primary-fg">
                Broker&apos;s Accreditation
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-primary-fg">
                News
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-primary-fg">
                Contact Us
              </a>
            </li>
            <button className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer">
              Reserve Now
            </button>
          </div>
        </div>
       
      </nav>
    </div>
  );
}

export default NavBar;
