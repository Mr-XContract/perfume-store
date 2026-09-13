import { NextRequest, NextResponse } from "next/server";
import { addCartLine, createCart, isShopifyConfigured } from "@/lib/shopify";

interface AddToCartBody {
  variantId?: string;
  quantity?: number;
  cartId?: string | null;
}

/**
 * Creates a Shopify cart (or adds a line to an existing one) and returns
 * its `checkoutUrl`. Shopify hosts the actual checkout/payment page — this
 * route never touches payment details, it only assembles the cart.
 */
export async function POST(request: NextRequest) {
  if (!isShopifyConfigured()) {
    return NextResponse.json(
      {
        error:
          "Shopify no está configurado. Agrega SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN en .env.local.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as AddToCartBody | null;
  const variantId = body?.variantId;
  const quantity = body?.quantity ?? 1;

  if (!variantId) {
    return NextResponse.json({ error: "variantId es requerido" }, { status: 400 });
  }

  const cart = body?.cartId
    ? await addCartLine(body.cartId, variantId, quantity)
    : await createCart(variantId, quantity);

  if (!cart) {
    return NextResponse.json({ error: "No se pudo actualizar el carrito" }, { status: 502 });
  }

  return NextResponse.json(cart);
}
