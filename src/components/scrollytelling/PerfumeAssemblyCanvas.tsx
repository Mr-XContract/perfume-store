"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import type { Product } from "@/types/product";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import { LinkButton } from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 60;
const SEQUENCE_PATH = "/assets/assembly-sequence";
const TRACK_LENGTH_VH = 300;
const NOTES_WINDOW: [number, number] = [0.3, 0.5];
const FINAL_WINDOW_START = 0.8;

/**
 * Draws `img` into `ctx` scaled like CSS `object-fit: contain` — the
 * bottle keeps its aspect ratio and letterboxes instead of stretching,
 * identically on a square mobile viewport or an ultrawide desktop one.
 */
function drawContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cssWidth: number,
  cssHeight: number,
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const boxRatio = cssWidth / cssHeight;

  const drawWidth = imgRatio > boxRatio ? cssWidth : cssHeight * imgRatio;
  const drawHeight = imgRatio > boxRatio ? cssWidth / imgRatio : cssHeight;
  const dx = (cssWidth - drawWidth) / 2;
  const dy = (cssHeight - drawHeight) / 2;

  ctx.clearRect(0, 0, cssWidth, cssHeight);
  ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
}

export function PerfumeAssemblyCanvas({ product }: { product: Product }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const currentFrameRef = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const lenis = useLenis();
  const { isReady, progress: loadProgress } = useFrameSequence(
    SEQUENCE_PATH,
    FRAME_COUNT,
    imagesRef,
  );

  const [hasEnteredTrack, setHasEnteredTrack] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  // Only *block* scroll if the user actually reaches this section before
  // the (small, background-loading) sequence has finished decoding — not
  // on mount. Locking scroll globally the instant the page loads would
  // stall the Hero above it for no reason and directly hurts INP, which
  // contradicts the whole point of a frame-sequence approach.
  const locked = hasEnteredTrack && !isReady;

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;
    drawContain(ctx, img, canvas.clientWidth, canvas.clientHeight);
  }, []);

  // Size the canvas backing store for the device's pixel ratio (capped at
  // 2x — a 3x/4x phone doesn't need 4x the pixels for a bottle render) and
  // redraw whenever the stage itself resizes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const ctx = ctxRef.current;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [drawFrame]);

  // Paint whatever is available as soon as it's available, instead of
  // waiting for the full sequence — frame 1 usually decodes well under a
  // second in, so there's rarely a blank canvas even before `isReady`.
  useEffect(() => {
    drawFrame(currentFrameRef.current);
  }, [drawFrame, loadProgress]);

  useEffect(() => {
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
  }, [locked, lenis]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let notesVisible = false;
    let finalVisible = false;

    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onEnter: () => setHasEnteredTrack(true),
      onEnterBack: () => setHasEnteredTrack(true),
      onUpdate: (self) => {
        const frameIndex = Math.round(self.progress * (FRAME_COUNT - 1));
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);

        const nextNotes = self.progress >= NOTES_WINDOW[0] && self.progress < NOTES_WINDOW[1];
        const nextFinal = self.progress >= FINAL_WINDOW_START;
        if (nextNotes !== notesVisible) {
          notesVisible = nextNotes;
          setShowNotes(nextNotes);
        }
        if (nextFinal !== finalVisible) {
          finalVisible = nextFinal;
          setShowFinal(nextFinal);
        }
      },
    });

    return () => st.kill();
  }, [drawFrame]);

  return (
    <section ref={trackRef} style={{ height: `${TRACK_LENGTH_VH}vh` }} className="relative bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div className="pointer-events-none absolute inset-x-0 top-10 z-10 text-center">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">{product.brand}</p>
          <h2 className="mt-2 font-serif text-3xl text-porcelain md:text-4xl">{product.name}</h2>
        </div>

        <AnimatePresence>
          {locked && (
            <motion.div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-ink"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <p className="text-[10px] tracking-[0.4em] text-gold uppercase">Maison Noir</p>
              <div className="h-px w-52 overflow-hidden bg-porcelain/10">
                <motion.div
                  className="h-full bg-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>
              <p className="text-[10px] tracking-[0.3em] text-mist uppercase">
                Preparando la experiencia — {loadProgress}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showNotes && (
            <motion.div
              key="notes-card"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-10 z-10 mx-auto grid w-[min(92%,32rem)] grid-cols-3 gap-2 rounded-sm border border-porcelain/10 bg-ink/60 p-4 backdrop-blur-md sm:bottom-16 sm:gap-4 sm:p-6"
            >
              <div>
                <p className="text-[10px] tracking-[0.25em] text-gold uppercase">Salida</p>
                <p className="mt-1 text-xs leading-relaxed text-porcelain/90">
                  {product.notes.top.join(" · ")}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] text-gold uppercase">Corazón</p>
                <p className="mt-1 text-xs leading-relaxed text-porcelain/90">
                  {product.notes.heart.join(" · ")}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] text-gold uppercase">Fondo</p>
                <p className="mt-1 text-xs leading-relaxed text-porcelain/90">
                  {product.notes.base.join(" · ")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFinal && (
            <motion.div
              key="final-card"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-[min(92%,26rem)] flex-col items-center gap-3 rounded-sm border border-gold/30 bg-ink/70 p-5 text-center backdrop-blur-md sm:bottom-12 sm:gap-4 sm:p-8"
            >
              <p className="font-serif text-lg italic text-porcelain">{product.tagline}</p>
              <p className="text-xs leading-relaxed text-mist">{product.description}</p>
              <div className="mt-2 flex items-center gap-6">
                <span className="font-serif text-2xl text-porcelain">
                  ${product.price.toFixed(2)} {product.currency}
                </span>
                <LinkButton href="#coleccion">Descubrir</LinkButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!locked && !showNotes && !showFinal && (
          <div className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-[10px] tracking-[0.3em] text-mist/60 uppercase">
            Sigue desplazándote — el frasco se ensambla contigo
          </div>
        )}
      </div>
    </section>
  );
}
