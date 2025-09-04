"use client";
import { useEffect, useRef } from "react";

type PlayerProps = {
  src: string;
  title: string;
};

export function Player({ src, title }: PlayerProps) {
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
   <div className="aspect-[70%] md:aspect-[1/2] w-full rounded-lg overflow-hidden bg-black">
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

  );
}
export default Player;
