import { NextRequest, NextResponse } from "next/server";
import { isMarketCode, markets } from "@/data/markets";
import { priceFor } from "@/lib/pricing";
import { getSite, paymentMethods } from "@/sites";

/**
 * Creates a Stripe Checkout Session for one variant and returns its hosted
 * URL. Card details are entered on Stripe's page; this app never sees them.
 * The amount is recomputed from the site config, never taken from the client.
 * Stripe REST is called directly (form-encoded) to avoid an SDK dependency.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "El pago con tarjeta no está configurado. Define STRIPE_SECRET_KEY." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as { market?: string; variantKey?: string } | null;
  const site = getSite();
  const marketCode = typeof body?.market === "string" ? body.market : "";
  if (!isMarketCode(marketCode) || !paymentMethods(site, marketCode).includes("card")) {
    return NextResponse.json({ error: "Mercado no válido" }, { status: 400 });
  }
  const market = markets[marketCode];
  const variant = site.product.variants.find((v) => v.key === body?.variantKey);
  if (!variant) return NextResponse.json({ error: "Producto no válido" }, { status: 400 });

  // Todas las monedas activas (USD, EUR, MXN) usan 2 decimales en Stripe.
  const amount = Math.round(priceFor(market, variant.baseUsd) * 100);
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;
  const copy = site.product.copy[market.lang] ?? site.product.copy.es;

  const params = new URLSearchParams({
    mode: "payment",
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": market.currency.toLowerCase(),
    "line_items[0][price_data][unit_amount]": String(amount),
    "line_items[0][price_data][product_data][name]": `${copy.name} — ${variant.label[market.lang]}`,
    "shipping_address_collection[allowed_countries][0]": market.country,
    "phone_number_collection[enabled]": "true",
    success_url: `${origin}/${market.code}/gracias?v=${amount / 100}&c=${market.currency}`,
    cancel_url: `${origin}/${market.code}`,
    "metadata[site]": site.id,
    "metadata[market]": market.code,
    "metadata[variant]": variant.key,
  });

  const res = await fetch(`${process.env.STRIPE_API_BASE ?? "https://api.stripe.com"}/v1/checkout/sessions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  }).catch(() => null);

  const session = (await res?.json().catch(() => null)) as { url?: string } | null;
  if (!res?.ok || !session?.url) {
    return NextResponse.json({ error: "No se pudo iniciar el pago" }, { status: 502 });
  }
  return NextResponse.json({ url: session.url });
}
