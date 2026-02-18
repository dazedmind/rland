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
        <button onClick={handleScrollToTop} className="flex flex-row items-center gap-2 bg-secondary rounded-full p-2 px-4 fixed bottom-8 right-8 z-50 cursor-pointer shadow-lg">
          <ArrowUp className="size-8 text-primary-fg" strokeWidth={3} />
        </button>
      )}
      {children}

      <Toaster />
    </div>
  );
}

export default UtilityWrapper;
