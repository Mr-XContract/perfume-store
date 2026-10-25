import "server-only";
import type { Market } from "@/data/markets";
import type { Product } from "@/data/products";
import { priceFor } from "@/lib/pricing";
import { getShopifyProduct, isShopifyConfigured } from "@/lib/shopify";

export interface ResolvedVariant {
  key: string;
  label: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  /** Shopify variant GID; only set for card markets once Shopify is connected. */
  variantId: string | null;
}

/**
 * Prices come from the base USD table converted for the market. For card
 * markets, Shopify also supplies the variant id, and its price wins only if
 * it is in the market's own currency — never mix currencies on a page.
 */
export async function resolveVariants(
  market: Market,
  product: Product,
): Promise<ResolvedVariant[]> {
  const remote =
    market.payment === "card" && isShopifyConfigured()
      ? await getShopifyProduct(product.shopifyHandle)
      : null;

  const localPrice = (key: string) => {
    const base = product.variants.find((v) => v.key === key)!;
    return priceFor(market, base.baseUsd);
  };

  return product.variants.map((v) => {
    const match = remote?.variants.nodes.find(
      (r) => r.title.toLowerCase() === v.key.toLowerCase() && r.availableForSale,
    );
    const sameCurrency = match?.price.currencyCode === market.currency;
    return {
      key: v.key,
      label: v.label,
      description: v.description,
      badge: v.badge,
      price: sameCurrency ? Number(match!.price.amount) : priceFor(market, v.baseUsd),
      compareAtPrice: v.compareAtOf ? v.compareAtOf.qty * localPrice(v.compareAtOf.key) : undefined,
      variantId: match?.id ?? null,
    };
  });
}
