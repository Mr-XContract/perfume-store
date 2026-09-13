"use client";

import { useEffect, useState, type RefObject } from "react";

interface FrameSequenceState {
  loadedCount: number;
  isReady: boolean;
  /** 0-100, for the preloader bar. */
  progress: number;
}

/**
 * Preloads `frameCount` numbered WebP stills (`frame_0001.webp`, …) from
 * `basePath` into decoded `HTMLImageElement`s, written into `imagesRef`
 * (owned by the caller). The images live in a ref rather than state
 * because nothing about rendering depends on the array's *identity* —
 * only `loadedCount` (used for the preloader bar) needs to be React
 * state; consumers read `imagesRef.current[i].complete` imperatively
 * inside draw calls, never during render.
 */
export function useFrameSequence(
  basePath: string,
  frameCount: number,
  imagesRef: RefObject<HTMLImageElement[]>,
): FrameSequenceState {
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    imagesRef.current = Array.from({ length: frameCount }, (_, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = `${basePath}/frame_${String(i + 1).padStart(4, "0")}.webp`;
      img.onload = img.onerror = () => {
        loaded += 1;
        if (!cancelled) setLoadedCount(loaded);
      };
      return img;
    });

    return () => {
      cancelled = true;
    };
  }, [basePath, frameCount, imagesRef]);

  return {
    loadedCount,
    isReady: frameCount > 0 && loadedCount >= frameCount,
    progress: frameCount === 0 ? 100 : Math.round((loadedCount / frameCount) * 100),
  };
}
