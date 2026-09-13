import "server-only";

const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2024-10";

/**
 * Whether SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN are set.
 * Every call site checks this first so the site runs fine on the local
 * mock data before a Shopify store exists — same pattern as
 * src/lib/higgsfield.ts.
 */
export function isShopifyConfigured(): boolean {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  );
}

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  /** Seconds to cache the response for (ISR-style). 0 = never cache (mutations). */
  revalidate?: number;
}

interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

/**
 * Thin GraphQL client for the Shopify Storefront API. Returns `null` on any
 * failure — missing credentials, network error, or a GraphQL error — so
 * callers can fall back to mock data instead of crashing the page.
 */
export async function shopifyFetch<T>({
  query,
  variables,
  revalidate = 60,
}: ShopifyFetchOptions): Promise<T | null> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) return null;

  try {
    const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      next: revalidate > 0 ? { revalidate } : undefined,
      cache: revalidate > 0 ? undefined : "no-store",
    });

    if (!res.ok) {
      console.error(`Shopify Storefront API responded ${res.status}`);
      return null;
    }

    const json = (await res.json()) as ShopifyGraphQLResponse<T>;

    if (json.errors?.length) {
      console.error("Shopify Storefront API error:", json.errors[0]?.message);
      return null;
    }

    return json.data ?? null;
  } catch (error) {
    console.error("Shopify Storefront API request failed:", error);
    return null;
  }
}
