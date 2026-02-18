"use client";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { useConsent } from "./ConsentProvider";

export default function GoogleTagManager({ gtmId }: { gtmId: string }) {
  const { consent, isInitialized } = useConsent();

  useEffect(() => {
    if (isInitialized && consent === "accepted" && gtmId) {
      TagManager.initialize({
        gtmId: gtmId,
      });
    }
  }, [isInitialized, consent, gtmId]);

  return null;
}
