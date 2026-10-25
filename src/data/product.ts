export interface VariantOption {
  /** Must match the variant title configured in Shopify (case-insensitive). */
  key: string;
  label: string;
  description: string;
  price: number;
  /** Only set to a real reference price (e.g. the sum of the parts), never an invented "before" price. */
  compareAtPrice?: number;
  badge?: string;
}

export interface Product {
  handle: string;
  brand: string;
  name: string;
  tagline: string;
  description: string;
  currency: "USD";
  variants: VariantOption[];
  defaultVariantKey: string;
}

/**
 * Precios y variantes de lanzamiento. Son supuestos de partida (ver
 * docs/LAUNCH-PLAN.md): ajústalos con el coste real de tu proveedor.
 * Si Shopify está conectado, el precio y el id de variante reales se
 * toman de allí (ver src/lib/getProduct.ts).
 */
export const product: Product = {
  handle: "kit-deslanador",
  brand: "Manada",
  name: "Kit Deslanador para Mascotas",
  tagline: "Menos pelo en el sofá. Más tiempo con tu mascota.",
  description:
    "Guante de silicona y cepillo autolimpiante para retirar el pelo suelto de perros y gatos mientras los acaricias.",
  currency: "USD",
  defaultVariantKey: "Kit completo",
  variants: [
    {
      key: "Guante",
      label: "Guante deslanador",
      description: "1 guante de silicona ajustable",
      price: 19.9,
    },
    {
      key: "Kit completo",
      label: "Kit completo",
      description: "Guante + cepillo autolimpiante",
      price: 34.9,
      badge: "Más elegido",
    },
    {
      key: "Pack 2 kits",
      label: "Pack 2 kits",
      description: "Para casas con 2 mascotas o para regalar",
      price: 59.9,
      compareAtPrice: 69.8,
      badge: "Mejor precio",
    },
  ],
};

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}
