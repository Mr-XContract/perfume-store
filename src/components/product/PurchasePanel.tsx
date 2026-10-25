"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CodOrderForm } from "@/components/product/CodOrderForm";
import { formatDelivery, ui } from "@/lib/i18n";
import { markets, type MarketCode } from "@/data/markets";
import { formatMoney } from "@/lib/pricing";
import { track } from "@/lib/track";
import type { ResolvedVariant } from "@/lib/variants";
import type { PaymentMethod } from "@/sites/types";

interface PurchasePanelProps {
  market: MarketCode;
  productName: string;
  variants: ResolvedVariant[];
  defaultVariantKey: string;
  /** Métodos activos en este mercado; el primero es el predeterminado. */
  methods: PaymentMethod[];
}

/**
 * Variant picker plus the market's payment flow. Cash on delivery shows an
 * order form; card sends the visitor to Stripe's hosted checkout. This app
 * never handles card details.
 */
export function PurchasePanel({ market: marketCode, productName, variants, defaultVariantKey, methods }: PurchasePanelProps) {
  const market = markets[marketCode];
  const t = ui[market.lang];
  const [selectedKey, setSelectedKey] = useState(defaultVariantKey);
  const [method, setMethod] = useState<PaymentMethod>(methods[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [formOpen, setFormOpen] = useState(false);
  const [placed, setPlaced] = useState(false);
  const selected = variants.find((v) => v.key === selectedKey) ?? variants[0];

  const eventParams = {
    content_name: `${productName} — ${selected.label}`,
    currency: market.currency,
    value: selected.price,
  };

  useEffect(() => {
    track("ViewContent", { content_name: productName, currency: market.currency, value: selected.price });
    // Only on first view: choosing a bundle is not a new content view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCardBuy() {
    setStatus("loading");
    track("AddToCart", eventParams);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ market: market.code, variantKey: selected.key }),
      });
      if (!res.ok) throw new Error(`checkout request failed: ${res.status}`);
      const { url } = (await res.json()) as { url: string };
      track("InitiateCheckout", eventParams);
      window.location.href = url;
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (placed) {
    return (
      <div role="status" className="rounded-2xl border-2 border-brand bg-white p-6 text-center">
        <p className="font-display text-2xl font-semibold text-brand">{t.orderReceived}</p>
        <p className="mt-2 text-mist">{t.orderReceivedBody.replace("{total}", formatMoney(market, selected.price))}</p>
      </div>
    );
  }

  const cod = method === "cod";

  return (
    <div>
      <fieldset className="space-y-3" disabled={formOpen}>
        <legend className="sr-only">{t.chooseOption}</legend>
        {variants.map((v) => {
          const active = v.key === selected.key;
          return (
            <label
              key={v.key}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-colors ${
                active ? "border-brand bg-white" : "border-ink/10 bg-white/50 hover:border-ink/30"
              }`}
            >
              <input
                type="radio"
                name="variant"
                value={v.key}
                checked={active}
                onChange={() => setSelectedKey(v.key)}
                className="h-5 w-5 accent-brand"
              />
              <span className="flex-1">
                <span className="flex flex-wrap items-center gap-2 font-semibold">
                  {v.label}
                  {v.badge && (
                    <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">{v.badge}</span>
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

      {methods.length > 1 && !formOpen && (
        <fieldset className="mt-4 flex gap-3">
          <legend className="sr-only">{t.payWith}</legend>
          {methods.map((m) => (
            <label
              key={m}
              className={`flex-1 cursor-pointer rounded-xl border-2 px-4 py-2 text-center text-sm font-semibold ${
                m === method ? "border-brand bg-white" : "border-ink/10 text-mist"
              }`}
            >
              <input type="radio" name="method" value={m} checked={m === method} onChange={() => setMethod(m)} className="sr-only" />
              {m === "cod" ? t.codLabel : t.cardLabel}
            </label>
          ))}
        </fieldset>
      )}

      {cod ? (
        formOpen ? (
          <CodOrderForm
            market={market.code}
            variantKey={selected.key}
            t={t}
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
            {t.codCta}
          </Button>
        )
      ) : (
        <>
          <Button className="mt-5 w-full" onClick={handleCardBuy} disabled={status === "loading"}>
            {status === "loading"
              ? t.wait
              : status === "error"
                ? t.retry
                : `${t.buy} · ${formatMoney(market, selected.price)}`}
          </Button>
          {status === "error" && (
            <p role="alert" className="mt-2 text-center text-sm text-accent-dark">{t.cardError}</p>
          )}
        </>
      )}

      <ul className="mt-4 space-y-1 text-center text-sm text-mist">
        <li>{cod ? t.codBullet : t.cardBullet}</li>
        <li>{t.delivery} {formatDelivery(market)} · {t.guarantee}</li>
      </ul>
    </div>
  );
}
