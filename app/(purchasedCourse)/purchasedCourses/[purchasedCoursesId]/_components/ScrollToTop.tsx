// app/(whatever)/purchased-courses/_components/ScrollToTop.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // On first client paint: disable browser’s automatic restoration and go top.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

  // On route/searchParam change: go top again.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, searchParams?.toString()]);

  return null;
}
