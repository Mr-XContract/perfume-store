"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const CART_ID_STORAGE_KEY = "maison-noir-cart-id";

interface AddToCartButtonProps {
  /** Shopify variant GID, or null when the store isn't connected yet. */
  variantId: string | null;
  className?: string;
}

/**
 * Adds one unit to the visitor's Shopify cart (creating it on first use,
 * persisting the cart id in localStorage after that) and redirects to
 * Shopify's own hosted checkout — this app never collects payment details
 * itself. Renders disabled with an explanatory label when Shopify hasn't
 * been connected yet, instead of silently doing nothing.
 */
export function AddToCartButton({ variantId, className }: AddToCartButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleClick() {
    if (!variantId) return;

    setStatus("loading");
    try {
      const cartId = window.localStorage.getItem(CART_ID_STORAGE_KEY);

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity: 1, cartId }),
      });

      if (!res.ok) throw new Error(`cart request failed: ${res.status}`);

      const cart = (await res.json()) as { id: string; checkoutUrl: string };
      window.localStorage.setItem(CART_ID_STORAGE_KEY, cart.id);
      window.location.href = cart.checkoutUrl;
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (!variantId) {
    return (
      <Button className={className} disabled title="Conecta Shopify para habilitar la compra">
        Próximamente
      </Button>
    );
  }

  return (
    <Button
      className={className}
      onClick={handleClick}
      disabled={status === "loading"}
    >
      {status === "loading" ? "Añadiendo…" : status === "error" ? "Reintentar" : "Añadir a la bolsa"}
    </Button>
  );
}
