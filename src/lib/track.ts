type Params = Record<string, string | number | string[]>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Params) => void };
  }
}

/** Fires an event on whichever ad pixels are loaded; no-op otherwise. */
export function track(
  event: "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase",
  params: Params = {},
) {
  window.fbq?.("track", event, params);
  window.ttq?.track(event, params);
}
