"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface CodOrderFormProps {
  market: string;
  productSlug: string;
  variantKey: string;
  onPlaced: () => void;
}

const field =
  "w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-base outline-none focus:border-moss";

/** Collects delivery details for a pay-on-delivery order. */
export function CodOrderForm({ market, productSlug, variantKey, onPlaced }: CodOrderFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, market, productSlug, variantKey }),
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
      <p className="text-sm text-mist">
        Déjanos tus datos de entrega. Pagas al recibir y te llamaremos para confirmar el pedido.
      </p>
      <input name="name" required minLength={2} autoComplete="name" placeholder="Nombre completo" className={field} />
      <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="Teléfono / WhatsApp" className={field} />
      <input name="city" required autoComplete="address-level2" placeholder="Ciudad" className={field} />
      <input name="address" required minLength={5} autoComplete="street-address" placeholder="Dirección de entrega" className={field} />
      <input name="notes" placeholder="Indicaciones (opcional)" className={field} />
      {/* Honeypot: hidden from people, bots tend to fill it. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Enviando…" : "Confirmar pedido"}
      </Button>
      {status === "error" && (
        <p role="alert" className="text-center text-sm text-clay-dark">
          No pudimos registrar tu pedido. Revisa los datos e inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}
