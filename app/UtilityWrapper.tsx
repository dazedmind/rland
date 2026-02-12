"use client";
import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

function UtilityWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past the video hero section (100vh)
      const heroHeight = 200;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isScrolled && (
        <button onClick={handleScrollToTop} className="flex flex-row items-center gap-2 bg-secondary rounded-full p-2 px-4 fixed bottom-8 right-8 z-50 cursor-pointer shadow-lg">
          <ArrowUp className="size-8 text-primary-fg" strokeWidth={3} />
        </button>
      )}
      {children}
    </div>
  );
}

export default UtilityWrapper;
