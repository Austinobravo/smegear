"use client";

import { useEffect, useState } from "react";

export default function VisibilityRefresh({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onShow = () => {
      if (document.visibilityState === "visible") {
        setTick((t) => t + 1); // force remount of children
      }
    };
    document.addEventListener("visibilitychange", onShow);
    return () => document.removeEventListener("visibilitychange", onShow);
  }, []);

  // key causes subtree to remount -> client children re-read localStorage
  return <div key={tick}>{children}</div>;
}
