"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Ui } from "@/lib/i18n";

interface CodOrderFormProps {
  market: string;
  variantKey: string;
  t: Ui;
  onPlaced: () => void;
}

const field =
  "w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-base outline-none focus:border-brand";

/** Collects delivery details for a pay-on-delivery order. */
export function CodOrderForm({ market, variantKey, t, onPlaced }: CodOrderFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, market, variantKey }),
      });
      if (!res.ok) throw new Error(`order request failed: ${res.status}`);
      onPlaced();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-3">
      <p className="text-sm text-mist">{t.formIntro}</p>
      <input name="name" required minLength={2} autoComplete="name" placeholder={t.fullName} className={field} />
      <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder={t.phone} className={field} />
      <input name="city" required autoComplete="address-level2" placeholder={t.city} className={field} />
      <input name="address" required minLength={5} autoComplete="street-address" placeholder={t.address} className={field} />
      <input name="notes" placeholder={t.notes} className={field} />
      {/* Honeypot: hidden from people, bots tend to fill it. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? t.sending : t.confirmOrder}
      </Button>
      {status === "error" && (
        <p role="alert" className="text-center text-sm text-accent-dark">{t.orderError}</p>
      )}
    </form>
  );
}
