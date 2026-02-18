"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie, setCookie } from "@/lib/cookies";

type ConsentState = "pending" | "accepted" | "declined";

interface ConsentContextType {
  consent: ConsentState;
  isInitialized: boolean;
  acceptConsent: () => void;
  declineConsent: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const COOKIE_NAME = "cookieConsent";
const COOKIE_EXPIRY_DAYS = 365; // 1 year

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  // Start with "pending" to avoid hydration mismatch
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [isInitialized, setIsInitialized] = useState(false);

  // Check cookie after mount
  useEffect(() => {
    const savedConsent = getCookie(COOKIE_NAME);
    if (savedConsent === "accepted" || savedConsent === "declined") {
      setConsent(savedConsent as ConsentState);
    }
    setIsInitialized(true);
  }, []);

  const acceptConsent = () => {
    setCookie(COOKIE_NAME, "accepted", COOKIE_EXPIRY_DAYS);
    setConsent("accepted");
  };

  const declineConsent = () => {
    setCookie(COOKIE_NAME, "declined", COOKIE_EXPIRY_DAYS);
    setConsent("declined");
  };

  return (
    <ConsentContext.Provider value={{ consent, isInitialized, acceptConsent, declineConsent }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
}
