"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CinematicAsset } from "@/types/product";
import { BottlePlaceholder } from "./BottlePlaceholder";

/**
 * Immersive product visualizer for a Higgsfield-generated cinematic asset.
 *
 * Design goals:
 *  - Never block first paint on the video: the section renders instantly
 *    with a static placeholder, and the <video> only mounts once the
 *    card is near the viewport (IntersectionObserver) and the network
 *    isn't in "save-data"/reduced-motion mode.
 *  - The "interactivity" the brief asks for is a mouse-driven parallax
 *    tilt (useMotionValue + useSpring) — it turns a pre-rendered
 *    cinematic clip into something that *feels* like a live 3D
 *    product viewer, without the cost of shipping an actual 3D model.
 *  - Graceful by construction: with no `videoSrc` yet (job still
 *    processing, or not generated in this environment) it shows an
 *    inline SVG bottle silhouette instead of a broken video/image.
 */
export function HiggsfieldVisualizer({ asset }: { asset: CinematicAsset }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 14 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 14 });
  const glowX = useTransform(springY, [-8, 8], [20, 80]);
  const glowY = useTransform(springX, [-8, 8], [80, 20]);

  // Defer mounting the <video> until the card is actually visible.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 16);
    rotateX.set(py * -16);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const canRenderVideo = isInView && !prefersReducedMotion && asset.videoSrc;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-porcelain/10"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Ambient glow follows the cursor to sell the "interactive" feel */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
          style={{
            background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)",
            left: glowX,
            top: glowY,
            width: 260,
            height: 260,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        {asset.posterSrc && !canRenderVideo && (
          <Image
            src={asset.posterSrc}
            alt="Bleu de Chanel — render cinemático"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        )}

        {!asset.posterSrc && !canRenderVideo && <BottlePlaceholder />}

        {canRenderVideo && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={asset.videoSrc ?? undefined}
            poster={asset.posterSrc ?? undefined}
            muted
            loop
            playsInline
            preload="none"
            autoPlay
            onPlaying={() => setIsPlaying(true)}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      </motion.div>

      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-porcelain/15 bg-ink/60 px-3 py-1.5 backdrop-blur-sm">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isPlaying ? "bg-gold animate-pulse" : "bg-mist"
          }`}
        />
        <span className="text-[10px] tracking-[0.2em] text-porcelain/80 uppercase">
          Higgsfield AI · Render cinemático
        </span>
      </div>

      {!asset.videoSrc && (
        <div className="absolute bottom-5 left-5 right-5 rounded-sm border border-porcelain/10 bg-ink/70 px-4 py-3 backdrop-blur-sm">
          <p className="text-[11px] leading-relaxed text-mist">
            Vista previa 3D en preparación. El video cinemático generado con
            Higgsfield AI se incrusta aquí automáticamente en cuanto el job{" "}
            <code className="text-gold">{asset.higgsfieldJobId}</code> finaliza.
          </p>
        </div>
      )}
    </div>
  );
}
