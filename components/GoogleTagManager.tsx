"use client";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

export default function GoogleTagManager({ gtmId }: { gtmId: string }) {
  useEffect(() => {
    if (gtmId) {
      TagManager.initialize({
        gtmId: gtmId,
      });
    }
  }, [gtmId]);

  return null;
}
