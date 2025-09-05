"use client";

import { useEffect, useRef } from "react";

export default function Player({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const key = `time:${src}`;
    const v = ref.current;
    if (!v) return;

    const saved = Number(localStorage.getItem(key) || 0);
    if (saved > 0) v.currentTime = saved;

    const onTime = () => localStorage.setItem(key, String(v.currentTime));
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [src]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-black">
        <video
          ref={ref}
          key={src}
          className="h-full w-full"
          controls
          playsInline
          preload="metadata"
          src={src}
          aria-label={title}
        />
      </div>
    </div>
  );
}
