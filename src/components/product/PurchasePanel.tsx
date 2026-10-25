"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/data/product";
import { track } from "@/lib/track";
import type { ResolvedVariant } from "@/lib/getProduct";

const CART_ID_STORAGE_KEY = "manada-cart-id";

interface PurchasePanelProps {
  name: string;
  variants: ResolvedVariant[];
  defaultVariantKey: string;
}

/**
 * Variant picker + buy button. Adds the chosen variant to a Shopify cart
 * via /api/cart and sends the visitor to Shopify's hosted checkout; this
 * app never handles payment details.
 */
export function PurchasePanel({ name, variants, defaultVariantKey }: PurchasePanelProps) {
  const [selectedKey, setSelectedKey] = useState(defaultVariantKey);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const selected = variants.find((v) => v.key === selectedKey) ?? variants[0];

  useEffect(() => {
    track("ViewContent", { content_name: name, currency: "USD", value: selected.price });
    // Only on first view: selecting a bundle is not a new content view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleBuy() {
    if (!selected.variantId) return;
    setStatus("loading");
    const eventParams = {
      content_name: `${name} — ${selected.label}`,
      currency: "USD",
      value: selected.price,
    };
    track("AddToCart", eventParams);
    try {
      const cartId = window.localStorage.getItem(CART_ID_STORAGE_KEY);
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId: selected.variantId, quantity: 1, cartId }),
      });
      if (!res.ok) throw new Error(`cart request failed: ${res.status}`);
      const cart = (await res.json()) as { id: string; checkoutUrl: string };
      window.localStorage.setItem(CART_ID_STORAGE_KEY, cart.id);
      track("InitiateCheckout", eventParams);
      window.location.href = cart.checkoutUrl;
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div>
      <fieldset className="space-y-3">
        <legend className="sr-only">Elige tu opción</legend>
        {variants.map((v) => {
          const active = v.key === selected.key;
          return (
            <label
              key={v.key}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-colors ${
                active ? "border-moss bg-white" : "border-ink/10 bg-white/50 hover:border-ink/30"
              }`}
            >
              <input
                type="radio"
                name="variant"
                value={v.key}
                checked={active}
                onChange={() => setSelectedKey(v.key)}
                className="h-5 w-5 accent-moss"
              />
              <span className="flex-1">
                <span className="flex items-center gap-2 font-semibold">
                  {v.label}
                  {v.badge && (
                    <span className="rounded-full bg-moss px-2 py-0.5 text-[11px] font-semibold text-white">
                      {v.badge}
                    </span>
                  )}
                </span>
                <span className="block text-sm text-mist">{v.description}</span>
              </span>
              <span className="text-right">
                <span className="block font-bold">{formatPrice(v.price)}</span>
                {v.compareAtPrice && (
                  <span className="block text-xs text-mist line-through">
                    {formatPrice(v.compareAtPrice)}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </fieldset>

      <Button
        className="mt-5 w-full"
        onClick={handleBuy}
        disabled={!selected.variantId || status === "loading"}
        title={selected.variantId ? undefined : "Conecta Shopify para habilitar la compra"}
      >
        {!selected.variantId
          ? "Próximamente"
          : status === "loading"
            ? "Un momento…"
            : status === "error"
              ? "Reintentar"
              : `Comprar · ${formatPrice(selected.price)}`}
      </Button>
      {status === "error" && (
        <p role="alert" className="mt-2 text-center text-sm text-clay-dark">
          No pudimos iniciar el pago. Inténtalo de nuevo.
        </p>
      )}
      <ul className="mt-4 space-y-1 text-center text-sm text-mist">
        <li>Pago seguro en el checkout de Shopify</li>
        <li>Garantía de devolución de 30 días</li>
      </ul>
    </div>
  );
}
