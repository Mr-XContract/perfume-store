import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { markets } from "@/data/markets";
import { getSite, siteMarketCodes } from "@/sites";

/**
 * Sends visitors on the bare domain to this site's market for their country
 * (Vercel sets x-vercel-ip-country); anyone else lands on the default market.
 */
export function proxy(request: NextRequest) {
  const site = getSite();
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  const match = siteMarketCodes(site).find((c) => markets[c].country === country);
  return NextResponse.redirect(new URL(`/${match ?? site.defaultMarket}`, request.url));
}

export const config = {
  matcher: "/",
};

