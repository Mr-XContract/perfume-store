"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CodOrderForm } from "@/components/product/CodOrderForm";
import { markets, type MarketCode } from "@/data/markets";
import { formatMoney } from "@/lib/pricing";
import { track } from "@/lib/track";
import type { ResolvedVariant } from "@/lib/getProduct";

const CART_ID_STORAGE_KEY = "manada-cart-id";

interface PurchasePanelProps {
  market: MarketCode;
  productSlug: string;
  name: string;
  variants: ResolvedVariant[];
  defaultVariantKey: string;
}

/**
 * Variant picker plus the market's purchase flow: pay-on-delivery markets
 * show an order form; card markets send the visitor to Shopify's hosted
 * checkout. This app never handles card details.
 */
export function PurchasePanel({ market: marketCode, productSlug, name, variants, defaultVariantKey }: PurchasePanelProps) {
  const market = markets[marketCode];
  const cod = market.payment === "cod";
  const [selectedKey, setSelectedKey] = useState(defaultVariantKey);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [formOpen, setFormOpen] = useState(false);
  const [placed, setPlaced] = useState(false);
  const selected = variants.find((v) => v.key === selectedKey) ?? variants[0];

  const eventParams = {
    content_name: `${name} — ${selected.label}`,
    currency: market.currency,
    value: selected.price,
  };

  useEffect(() => {
    track("ViewContent", { content_name: name, currency: market.currency, value: selected.price });
    // Only on first view: choosing a bundle is not a new content view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCardBuy() {
    if (!selected.variantId) return;
    setStatus("loading");
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

  if (placed) {
    return (
      <div role="status" className="rounded-2xl border-2 border-moss bg-white p-6 text-center">
        <p className="font-display text-2xl font-semibold text-moss">¡Pedido recibido!</p>
        <p className="mt-2 text-mist">
          Te contactaremos por teléfono o WhatsApp para confirmarlo. Pagas {formatMoney(market, selected.price)} al recibirlo.
        </p>
      </div>
    );
  }

  return (
    <div>
      <fieldset className="space-y-3" disabled={formOpen}>
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
                <span className="flex flex-wrap items-center gap-2 font-semibold">
                  {v.label}
                  {v.badge && (
                    <span className="rounded-full bg-moss px-2 py-0.5 text-[11px] font-semibold text-white">{v.badge}</span>
                  )}
                </span>
                <span className="block text-sm text-mist">{v.description}</span>
              </span>
              <span className="text-right">
                <span className="block font-bold">{formatMoney(market, v.price)}</span>
                {v.compareAtPrice && (
                  <span className="block text-xs text-mist line-through">{formatMoney(market, v.compareAtPrice)}</span>
                )}
              </span>
            </label>
          );
        })}
      </fieldset>

      {cod ? (
        formOpen ? (
          <CodOrderForm
            market={market.code}
            productSlug={productSlug}
            variantKey={selected.key}
            onPlaced={() => {
              track("Purchase", eventParams);
              setPlaced(true);
            }}
          />
        ) : (
          <Button
            className="mt-5 w-full"
            onClick={() => {
              track("AddToCart", eventParams);
              track("InitiateCheckout", eventParams);
              setFormOpen(true);
            }}
          >
            Pedir ahora · Pago al recibir
          </Button>
        )
      ) : (
        <>
          <Button
            className="mt-5 w-full"
            onClick={handleCardBuy}
            disabled={!selected.variantId || status === "loading"}
            title={selected.variantId ? undefined : "Conecta Shopify para habilitar la compra"}
          >
            {!selected.variantId
              ? "Próximamente"
              : status === "loading"
                ? "Un momento…"
                : status === "error"
                  ? "Reintentar"
                  : `Comprar · ${formatMoney(market, selected.price)}`}
          </Button>
          {status === "error" && (
            <p role="alert" className="mt-2 text-center text-sm text-clay-dark">
              No pudimos iniciar el pago. Inténtalo de nuevo.
            </p>
          )}
        </>
      )}

      <ul className="mt-4 space-y-1 text-center text-sm text-mist">
        <li>{cod ? "Pagas en efectivo al recibir el pedido" : "Pago seguro en el checkout de Shopify"}</li>
        <li>Entrega en {market.deliveryDays} · Garantía de 30 días</li>
      </ul>
    </div>
  );
}
