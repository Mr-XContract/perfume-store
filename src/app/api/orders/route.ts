import { NextRequest, NextResponse } from "next/server";
import { isMarketCode, markets } from "@/data/markets";
import { getProductBySlug } from "@/data/products";
import { priceFor } from "@/lib/pricing";

interface OrderBody {
  market?: string;
  productSlug?: string;
  variantKey?: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  notes?: string;
  /** Honeypot: real visitors never fill this in. */
  website?: string;
}

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/**
 * Receives a cash-on-delivery order and forwards it to ORDER_WEBHOOK_URL
 * (Make/Zapier/Google Sheets/Dropi integration…). The price is always
 * recomputed here from the catalog; the client's number is never trusted.
 */
export async function POST(request: NextRequest) {
  const webhook = process.env.ORDER_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { error: "Los pedidos no están configurados. Define ORDER_WEBHOOK_URL." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as OrderBody | null;
  if (!body) return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });

  // Pretend success to bots so they don't learn the honeypot exists.
  if (body.website) return NextResponse.json({ ok: true });

  const marketCode = text(body.market, 4);
  if (!isMarketCode(marketCode) || markets[marketCode].payment !== "cod") {
    return NextResponse.json({ error: "Mercado no válido" }, { status: 400 });
  }
  const market = markets[marketCode];

  const product = getProductBySlug(text(body.productSlug, 80));
  const variant = product?.variants.find((v) => v.key === text(body.variantKey, 80));
  if (!product || !variant) {
    return NextResponse.json({ error: "Producto no válido" }, { status: 400 });
  }

  const name = text(body.name, 100);
  const phone = text(body.phone, 30);
  const address = text(body.address, 200);
  const city = text(body.city, 80);
  const digits = phone.replace(/\D/g, "");
  if (name.length < 2 || address.length < 5 || city.length < 2 || digits.length < 7 || digits.length > 15) {
    return NextResponse.json({ error: "Revisa los datos del pedido" }, { status: 400 });
  }

  const order = {
    createdAt: new Date().toISOString(),
    market: market.code,
    country: market.country,
    currency: market.currency,
    paymentMethod: "cod",
    product: product.name,
    productSlug: product.slug,
    variant: variant.key,
    total: priceFor(market, variant.baseUsd),
    customer: { name, phone, address, city, notes: text(body.notes, 300) },
  };

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  }).catch(() => null);

  if (!res?.ok) {
    return NextResponse.json({ error: "No pudimos registrar tu pedido" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, total: order.total });
}
