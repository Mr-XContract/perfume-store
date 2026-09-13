import type { Product } from "@/types/product";

/**
 * Mock data. In production this would come from a CMS/DB, and
 * `cinematic.videoSrc` would be filled in by the Higgsfield generation
 * pipeline (see src/lib/higgsfield.ts) once the job resolves.
 */
export const featuredProduct: Product = {
  slug: "bleu-de-chanel-edt",
  brand: "CHANEL",
  name: "Bleu de Chanel",
  tagline: "Un himno a la libertad masculina.",
  description:
    "Una fragancia aromática amaderada con un rastro cautivador. Bleu de Chanel Eau de Toilette se despliega con un aire de misterio contenido: un aromático amaderado que traza el retrato de un hombre libre, imprevisible.",
  notes: {
    top: ["Limón", "Menta", "Pimienta rosa", "Pomelo"],
    heart: ["Jengibre", "Nuez moscada", "Jazmín"],
    base: ["Sándalo", "Cedro", "Incienso", "Vetiver"],
  },
  price: 150.0,
  currency: "USD",
  cinematic: {
    higgsfieldJobId: "hf_demo_bleu_de_chanel_001",
    videoSrc: "/videos/bleu-de-chanel-cinematic.mp4",
    posterSrc: "/images/bleu-de-chanel-poster.png",
  },
  shopify: null,
};

export const products: Product[] = [featuredProduct];
