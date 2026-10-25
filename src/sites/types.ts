import type { Lang, MarketCode } from "@/data/markets";

export type PaymentMethod = "cod" | "card";

export interface VariantDef {
  key: string;
  /** Texto por idioma. */
  label: Record<Lang, string>;
  description: Record<Lang, string>;
  /** Precio base en USD; cada mercado lo convierte (ver src/lib/pricing.ts). */
  baseUsd: number;
  /**
   * Referencia real para el precio tachado: `qty` unidades de otra variante
   * (p. ej. el pack de 2 frente a comprar 2 kits). Nunca un "antes" inventado.
   */
  compareAtOf?: { key: string; qty: number };
  badge?: Record<Lang, string>;
}

export interface ProductCopy {
  name: string;
  tagline: string;
  description: string;
  steps: { title: string; text: string }[];
  benefits: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export interface SiteConfig {
  /** Valor de la variable de entorno SITE_ID que activa este sitio. */
  id: string;
  brand: {
    name: string;
    /** Archivo en /public (p. ej. /sites/manada/logo.svg). Sin logo se muestra el nombre. */
    logo?: { src: string; width: number; height: number };
    colors: {
      primary: string;
      accent: string;
      accentDark: string;
      /** Opcionales: fondo de página y de secciones alternas. */
      background?: string;
      surface?: string;
    };
  };
  product: {
    slug: string;
    variants: VariantDef[];
    defaultVariantKey: string;
    /** Debe existir texto para cada idioma de los mercados activos. */
    copy: { es: ProductCopy } & Partial<Record<Lang, ProductCopy>>;
  };
  /** Mercados activos y sus métodos de pago (el primero es el predeterminado). */
  markets: Partial<Record<MarketCode, PaymentMethod[]>>;
  defaultMarket: MarketCode;
}
