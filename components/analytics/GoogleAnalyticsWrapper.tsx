"use client";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "./ConsentProvider";

export default function GoogleAnalyticsWrapper({ gaId }: { gaId: string }) {
  const { consent, isInitialized } = useConsent();

  if (!isInitialized || consent !== "accepted" || !gaId) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
