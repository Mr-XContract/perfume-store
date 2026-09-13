export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface CinematicAsset {
  /** Higgsfield generation/job id, used to fetch or re-fetch the asset. */
  higgsfieldJobId: string;
  /** Self-hosted, optimized video URL (mp4/webm) served from /public or a CDN. */
  videoSrc: string | null;
  /** Low-cost poster frame shown instantly while the video is absent/loading. */
  posterSrc: string | null;
  /** Blur placeholder (base64) for the poster, used as LQIP. */
  posterBlurDataURL?: string;
}

export interface Product {
  slug: string;
  brand: string;
  name: string;
  tagline: string;
  description: string;
  notes: FragranceNotes;
  price: number;
  currency: "USD";
  cinematic: CinematicAsset;
}
