"use client";
import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { getGtm } from "@/lib/gtm";
import { useConsent } from "@/components/analytics/ConsentProvider";

function UtilityWrapper({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { consent, isInitialized } = useConsent();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 200;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isInitialized && consent === "accepted") {
      getGtm().then((gtm) => {
        gtm.dataLayer({
          dataLayer: {
            event: "home_view",
          }
        });
      });
    }
  }, [isInitialized, consent]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isMounted && isScrolled && (
        <button aria-label="Scroll to top" onClick={handleScrollToTop} className="flex flex-row items-center justify-center gap-2 w-15 h-15 bg-primary hover:bg-primary/90 text-white rounded-full fixed bottom-8 right-8 z-50 cursor-pointer shadow-lg">
          <ArrowUp className="size-8 text-white" strokeWidth={3} />
        </button>
      )}
      {children}

      <Toaster />
    </div>
  );
}

export default UtilityWrapper;
