import type { Market } from "@/data/markets";

/** Converts a USD base price to a clean local price point for the market. */
export function priceFor(market: Market, usd: number): number {
  const raw = usd * market.fx * market.priceIndex;
  const rounded = Math.round(raw / market.roundTo) * market.roundTo;
  return Math.round((rounded + market.priceEnding) * 100) / 100;
}

export function formatMoney(market: Market, amount: number): string {
  const whole = Number.isInteger(amount);
  return new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency: market.currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(amount);
}
