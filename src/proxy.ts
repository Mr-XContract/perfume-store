import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { marketForCountry } from "@/data/markets";

/**
 * Sends visitors on the bare domain to the market of their country
 * (Vercel sets x-vercel-ip-country); anyone else lands on the default.
 */
export function proxy(request: NextRequest) {
  const market = marketForCountry(request.headers.get("x-vercel-ip-country"));
  return NextResponse.redirect(new URL(`/${market}`, request.url));
}

export const config = {
  matcher: "/",
};
