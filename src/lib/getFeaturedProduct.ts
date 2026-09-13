import "server-only";
import { featuredProduct } from "@/data/products";
import { getShopifyProduct, isShopifyConfigured } from "@/lib/shopify";
import type { Product } from "@/types/product";

/**
 * Resolves the product to render: the real Shopify product once the store
 * is connected and a matching handle exists, the local mock otherwise.
 * Design content (cinematic assets, notes copy) always comes from the
 * mock — Shopify only supplies commerce facts (title/description/price/
 * variant id) that a merchant would actually manage day-to-day.
 */
export async function getFeaturedProduct(): Promise<Product> {
  if (!isShopifyConfigured()) return featuredProduct;

  const shopifyProduct = await getShopifyProduct(featuredProduct.slug);
  if (!shopifyProduct) return featuredProduct;

  const variant = shopifyProduct.variants.nodes.find((v) => v.availableForSale) ??
    shopifyProduct.variants.nodes[0];

  return {
    ...featuredProduct,
    name: shopifyProduct.title || featuredProduct.name,
    description: shopifyProduct.description || featuredProduct.description,
    price: variant ? Number(variant.price.amount) : featuredProduct.price,
    shopify: {
      productHandle: shopifyProduct.handle,
      variantId: variant?.id ?? null,
    },
  };
}
