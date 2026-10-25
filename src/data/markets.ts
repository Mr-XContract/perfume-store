export type MarketCode = "co" | "mx" | "ve" | "es" | "us";
export type Lang = "es" | "en";

export interface Market {
  code: MarketCode;
  /** ISO 3166-1 alpha-2, used to match the visitor's country. */
  country: string;
  name: string;
  lang: Lang;
  locale: string;
  currency: "COP" | "MXN" | "EUR" | "USD";
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
  /** Plazo de entrega [mín, máx] en días hábiles (ajustar al proveedor real). */
  deliveryDays: [number, number];
}

export const markets: Record<MarketCode, Market> = {
  co: {
    code: "co", country: "CO", name: "Colombia", lang: "es", locale: "es-CO", currency: "COP",
    fx: 4000, priceIndex: 0.55, roundTo: 1000, priceEnding: -100, deliveryDays: [2, 5],
  },
  mx: {
    code: "mx", country: "MX", name: "México", lang: "es", locale: "es-MX", currency: "MXN",
    fx: 18, priceIndex: 0.8, roundTo: 10, priceEnding: -1, deliveryDays: [3, 7],
  },
  ve: {
    code: "ve", country: "VE", name: "Venezuela", lang: "es", locale: "es-VE", currency: "USD",
    fx: 1, priceIndex: 0.75, roundTo: 1, priceEnding: -0.1, deliveryDays: [5, 12],
  },
  es: {
    code: "es", country: "ES", name: "España", lang: "es", locale: "es-ES", currency: "EUR",
    fx: 0.92, priceIndex: 1, roundTo: 1, priceEnding: -0.1, deliveryDays: [7, 15],
  },
  us: {
    code: "us", country: "US", name: "United States", lang: "en", locale: "en-US", currency: "USD",
    fx: 1, priceIndex: 1, roundTo: 1, priceEnding: -0.1, deliveryDays: [7, 14],
  },
};

export const marketCodes = Object.keys(markets) as MarketCode[];

export function isMarketCode(value: string): value is MarketCode {
  return value in markets;
}
