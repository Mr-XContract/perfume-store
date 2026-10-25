import type { Market } from "@/data/markets";
import type { SiteConfig } from "@/sites/types";
import { priceFor } from "@/lib/pricing";

export interface ResolvedVariant {
  key: string;
  label: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
}

/** Localised text and market prices for each variant of the site's product. */
export function resolveVariants(site: SiteConfig, market: Market): ResolvedVariant[] {
  const { variants } = site.product;
  const local = (key: string) => priceFor(market, variants.find((v) => v.key === key)!.baseUsd);

  return variants.map((v) => ({
    key: v.key,
    label: v.label[market.lang],
    description: v.description[market.lang],
    badge: v.badge?.[market.lang],
    price: local(v.key),
    compareAtPrice: v.compareAtOf ? v.compareAtOf.qty * local(v.compareAtOf.key) : undefined,
  }));
}
