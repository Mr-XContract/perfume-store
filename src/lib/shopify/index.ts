import "server-only";
import { shopifyFetch, isShopifyConfigured } from "./client";
import {
  PRODUCT_BY_HANDLE_QUERY,
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_QUERY,
} from "./queries";
import type { ShopifyCart, ShopifyProduct, ShopifyUserError } from "./types";

export { isShopifyConfigured };
export type { ShopifyCart, ShopifyProduct };

export async function getShopifyProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });
  return data?.product ?? null;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: CART_QUERY,
    variables: { cartId },
    revalidate: 0,
  });
  return data?.cart ?? null;
}

export async function createCart(
  variantId: string,
  quantity = 1,
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart | null; userErrors: ShopifyUserError[] };
  }>({
    query: CART_CREATE_MUTATION,
    variables: { lines: [{ merchandiseId: variantId, quantity }] },
    revalidate: 0,
  });

  if (data?.cartCreate.userErrors.length) {
    console.error("cartCreate userErrors:", data.cartCreate.userErrors);
  }

  return data?.cartCreate.cart ?? null;
}

export async function addCartLine(
  cartId: string,
  variantId: string,
  quantity = 1,
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart | null; userErrors: ShopifyUserError[] };
  }>({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
    revalidate: 0,
  });

  if (data?.cartLinesAdd.userErrors.length) {
    console.error("cartLinesAdd userErrors:", data.cartLinesAdd.userErrors);
  }

  return data?.cartLinesAdd.cart ?? null;
}
