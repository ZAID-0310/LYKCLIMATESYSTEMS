"use client";

import { useEffect, useRef } from "react";

const EASE_SECONDS = 4;  // empieza a frenar 4 s antes del final
const MIN_RATE = 0.15;   // velocidad mínima al final

export default function HeroVideo({ src, poster }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    let raf;
    const tick = () => {
      if (v.duration && !v.paused && !v.ended) {
        const remaining = v.duration - v.currentTime;
        if (remaining < EASE_SECONDS) {
          const t = Math.max(remaining / EASE_SECONDS, 0); // 1 -> 0
          const eased = t * t * (3 - 2 * t);               // curva suave
          v.playbackRate = MIN_RATE + (1 - MIN_RATE) * eased;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover object-right motion-reduce:hidden"
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}