import "server-only";
import { product, type VariantOption } from "@/data/product";
import { getShopifyProduct, isShopifyConfigured } from "@/lib/shopify";

export interface ResolvedVariant extends VariantOption {
  /** Shopify variant GID; null while the store isn't connected. */
  variantId: string | null;
}

export interface ResolvedProduct {
  handle: string;
  brand: string;
  name: string;
  tagline: string;
  description: string;
  defaultVariantKey: string;
  variants: ResolvedVariant[];
}

/**
 * Local data owns the copy and the bundle structure; Shopify owns price
 * and variant ids. Variants are matched to Shopify by title, so name them
 * exactly like `key` in src/data/product.ts.
 */
export async function getProduct(): Promise<ResolvedProduct> {
  const { variants, ...rest } = product;
  const local = (): ResolvedVariant[] =>
    variants.map((v) => ({ ...v, variantId: null }));

  if (!isShopifyConfigured()) return { ...rest, variants: local() };

  const remote = await getShopifyProduct(product.handle);
  if (!remote) return { ...rest, variants: local() };

  return {
    ...rest,
    variants: variants.map((v) => {
      const match = remote.variants.nodes.find(
        (r) => r.title.toLowerCase() === v.key.toLowerCase() && r.availableForSale,
      );
      return {
        ...v,
        price: match ? Number(match.price.amount) : v.price,
        variantId: match?.id ?? null,
      };
    }),
  };
}
