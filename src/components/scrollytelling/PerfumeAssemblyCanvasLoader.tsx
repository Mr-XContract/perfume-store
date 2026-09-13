"use client";

import dynamic from "next/dynamic";
import type { Product } from "@/types/product";

// `ssr: false` requires a Client Component boundary in the App Router.
// This component's canvas drawing, DPR handling, and GSAP/ScrollTrigger
// setup are all meaningless without `window`/`HTMLCanvasElement`, so there
// is no server-rendered version to hydrate against.
const PerfumeAssemblyCanvas = dynamic(
  () =>
    import("./PerfumeAssemblyCanvas").then((mod) => mod.PerfumeAssemblyCanvas),
  {
    ssr: false,
    loading: () => <div className="h-[300vh] bg-ink" />,
  },
);

export function PerfumeAssemblyCanvasLoader({ product }: { product: Product }) {
  return <PerfumeAssemblyCanvas product={product} />;
}
