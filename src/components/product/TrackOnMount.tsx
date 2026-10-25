"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Fires a Purchase pixel event on the thank-you page, using ?v=&c= from the URL. */
export function TrackOnMount() {
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const value = Number(q.get("v"));
    const currency = q.get("c");
    if (value > 0 && currency) track("Purchase", { value, currency });
  }, []);
  return null;
}
