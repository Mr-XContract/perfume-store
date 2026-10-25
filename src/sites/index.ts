import { markets, marketCodes, type MarketCode } from "@/data/markets";
import { calma } from "./calma";
import { manada } from "./manada";
import { rumbo } from "./rumbo";
import type { PaymentMethod, SiteConfig } from "./types";

/**
 * Registro de webs de producto. Cada web es un despliegue independiente del
 * mismo código, elegido con la variable de entorno SITE_ID (un proyecto de
 * Vercel por web). Para crear otra: `npm run new-site -- <id> "<Marca>"`.
 */
export const sites: Record<string, SiteConfig> = { manada, calma, rumbo };

const DEFAULT_SITE_ID = "manada";

function validate(site: SiteConfig): SiteConfig {
  const enabled = Object.keys(site.markets) as MarketCode[];
  if (!enabled.includes(site.defaultMarket)) {
    throw new Error(`[${site.id}] defaultMarket "${site.defaultMarket}" no está en sus mercados`);
  }
  for (const code of enabled) {
    if (!site.product.copy[markets[code].lang]) {
      throw new Error(`[${site.id}] falta texto "${markets[code].lang}" para el mercado ${code}`);
    }
    if (!site.markets[code]?.length) {
      throw new Error(`[${site.id}] el mercado ${code} no tiene métodos de pago`);
    }
  }
  return site;
}

export function getSite(): SiteConfig {
  const id = process.env.SITE_ID ?? DEFAULT_SITE_ID;
  const site = sites[id];
  if (!site) {
    throw new Error(`SITE_ID "${id}" no existe. Opciones: ${Object.keys(sites).join(", ")}`);
  }
  return validate(site);
}

export function siteMarketCodes(site: SiteConfig): MarketCode[] {
  return marketCodes.filter((c) => c in site.markets);
}

export function paymentMethods(site: SiteConfig, code: MarketCode): PaymentMethod[] {
  return site.markets[code] ?? [];
}

export type { SiteConfig, PaymentMethod };
