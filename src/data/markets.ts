export type MarketCode = "co" | "mx" | "es";

export interface Market {
  code: MarketCode;
  /** ISO 3166-1 alpha-2, used to match the visitor's country. */
  country: string;
  name: string;
  locale: string;
  currency: "COP" | "MXN" | "EUR";
  /**
   * Units of local currency per 1 USD of base price. SUPUESTO de partida:
   * revísalo con el tipo de cambio real antes de lanzar.
   */
  fx: number;
  /**
   * Ajuste por poder adquisitivo sobre el tipo de cambio (1 = paridad).
   * SUPUESTO: convertir solo por cambio deja precios demasiado altos para
   * compras por impulso en mercados con menor ingreso. Calíbralo con tests.
   */
  priceIndex: number;
  /** Prices are rounded to the nearest multiple of this (e.g. 1000 COP). */
  roundTo: number;
  /** Added after rounding, so a price can end in e.g. .90 instead of .00. */
  priceEnding: number;
  /**
   * cod  = pago contra entrega: el pedido se recoge en la propia web y lo
   *        confirma el equipo antes de enviarlo.
   * card = pago con tarjeta en el checkout alojado de Shopify.
   */
  payment: "cod" | "card";
  /** Plazo de entrega mostrado al cliente (ajustar al proveedor real). */
  deliveryDays: string;
}

export const markets: Record<MarketCode, Market> = {
  co: {
    code: "co",
    country: "CO",
    name: "Colombia",
    locale: "es-CO",
    currency: "COP",
    fx: 4000,
    priceIndex: 0.55,
    roundTo: 1000,
    priceEnding: -100, // 76.900
    payment: "cod",
    deliveryDays: "2–5 días hábiles",
  },
  mx: {
    code: "mx",
    country: "MX",
    name: "México",
    locale: "es-MX",
    currency: "MXN",
    fx: 18,
    priceIndex: 0.8,
    roundTo: 10,
    priceEnding: -1, // 499 en vez de 500
    payment: "cod",
    deliveryDays: "3–7 días hábiles",
  },
  es: {
    code: "es",
    country: "ES",
    name: "España",
    locale: "es-ES",
    currency: "EUR",
    fx: 0.92,
    priceIndex: 1,
    roundTo: 1,
    priceEnding: -0.1, // 31,90
    payment: "card",
    deliveryDays: "7–15 días hábiles",
  },
};

export const marketCodes = Object.keys(markets) as MarketCode[];
export const DEFAULT_MARKET: MarketCode = "co";

export function isMarketCode(value: string): value is MarketCode {
  return value in markets;
}

/** Maps a country code (e.g. Vercel's x-vercel-ip-country) to a market. */
export function marketForCountry(country: string | null | undefined): MarketCode {
  const match = marketCodes.find((c) => markets[c].country === country?.toUpperCase());
  return match ?? DEFAULT_MARKET;
}
