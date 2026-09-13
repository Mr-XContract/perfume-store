"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import type { ReactNode } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wires Lenis's easing loop into GSAP's ticker instead of letting each
 * library drive its own requestAnimationFrame — two independent rAF loops
 * touching scroll position is the classic cause of Lenis/ScrollTrigger
 * drift and jitter. `autoRaf: false` on <ReactLenis> below disables Lenis's
 * own loop so this is the only one running.
 */
function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1, wheelMultiplier: 1 }}>
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
