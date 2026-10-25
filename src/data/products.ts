export interface VariantDef {
  /** Debe coincidir con el título de la variante en Shopify (mercados con tarjeta). */
  key: string;
  label: string;
  description: string;
  /** Precio base en USD; cada mercado lo convierte (ver src/lib/pricing.ts). */
  baseUsd: number;
  /**
   * Referencia real para el precio tachado: `qty` unidades de otra variante
   * (p. ej. el pack de 2 frente a comprar 2 kits). Nunca un "antes" inventado.
   */
  compareAtOf?: { key: string; qty: number };
  badge?: string;
}

export interface Product {
  slug: string;
  /** Handle del producto en Shopify. */
  shopifyHandle: string;
  name: string;
  tagline: string;
  description: string;
  /** "test" = en validación; "winner" = ya rinde; "paused" = se oculta. */
  status: "test" | "winner" | "paused";
  steps: { title: string; text: string }[];
  benefits: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  variants: VariantDef[];
  defaultVariantKey: string;
}

/**
 * Portafolio inicial. Son candidatos a validar con tests pequeños, no
 * apuestas: el catálogo es un dato, así que sumar, pausar o cambiar un
 * producto no toca el código de la web. Ver docs/LAUNCH-PLAN.md.
 *
 * Reglas de copy: sin promesas médicas, sin cifras de eficacia no
 * demostradas, sin reseñas ni precios "antes" inventados.
 */
export const products: Product[] = [
  {
    slug: "kit-deslanador",
    shopifyHandle: "kit-deslanador",
    name: "Kit Deslanador para Mascotas",
    tagline: "Menos pelo en el sofá. Más tiempo con tu mascota.",
    description:
      "Guante de silicona y cepillo autolimpiante para retirar el pelo suelto de perros y gatos mientras los acaricias.",
    status: "test",
    defaultVariantKey: "Kit completo",
    variants: [
      { key: "Guante", label: "Guante deslanador", description: "1 guante de silicona ajustable", baseUsd: 19.9 },
      { key: "Kit completo", label: "Kit completo", description: "Guante + cepillo autolimpiante", baseUsd: 34.9, badge: "Más elegido" },
      { key: "Pack 2 kits", label: "Pack 2 kits", description: "Para casas con 2 mascotas o para regalar", baseUsd: 59.9, compareAtOf: { key: "Kit completo", qty: 2 }, badge: "Mejor precio" },
    ],
    steps: [
      { title: "Acaricia", text: "Pasa el guante por el lomo como si lo acariciaras. Las puntas de silicona atrapan el pelo suelto." },
      { title: "Retira", text: "Los mechones se juntan en bolitas fáciles de quitar con la mano." },
      { title: "Limpia", text: "Con el cepillo, pulsa el botón y el pelo sale de golpe, sin tirar de las cerdas." },
    ],
    benefits: [
      { title: "Se siente como una caricia", text: "Puntas de silicona suave pensadas para el cepillado de perros y gatos." },
      { title: "Sin pilas ni ruido", text: "Funciona a mano: no asusta a mascotas sensibles a los aparatos." },
      { title: "Se limpia en segundos", text: "El cepillo autolimpiante expulsa el pelo con un botón." },
      { title: "Reutilizable", text: "Un solo kit para todo el año, sin recambios ni rodillos desechables." },
    ],
    faqs: [
      { q: "¿Sirve para perros y gatos?", a: "Sí, está pensado para ambos. Prueba primero unos segundos y fíjate en cómo reacciona tu mascota." },
      { q: "¿Y si el pelo es muy largo o muy corto?", a: "El guante funciona bien en pelo corto y medio. En pelo largo, empieza por el cepillo y termina con el guante." },
      { q: "¿Es un producto veterinario?", a: "No. Es un accesorio de cepillado. Si tu mascota tiene problemas de piel o pelo, consulta a tu veterinario." },
      { q: "¿Y si no me convence?", a: "Tienes 30 días desde la entrega para devolverlo; consulta la política de devoluciones." },
    ],
  },
  {
    slug: "set-gua-sha",
    shopifyHandle: "set-gua-sha",
    name: "Set Gua Sha y Rodillo Facial",
    tagline: "Tu ritual de cuidado facial de 5 minutos.",
    description:
      "Gua sha y rodillo de piedra natural para masajear el rostro con tu crema o sérum favorito. Un accesorio de cuidado personal, no un tratamiento.",
    status: "test",
    defaultVariantKey: "Set completo",
    variants: [
      { key: "Gua sha", label: "Gua sha", description: "1 gua sha de piedra", baseUsd: 14.9 },
      { key: "Set completo", label: "Set completo", description: "Gua sha + rodillo facial + bolsa", baseUsd: 27.9, badge: "Más elegido" },
      { key: "Pack regalo", label: "Pack regalo", description: "2 sets en caja de regalo", baseUsd: 49.9, compareAtOf: { key: "Set completo", qty: 2 }, badge: "Para regalar" },
    ],
    steps: [
      { title: "Aplica", text: "Extiende tu crema o sérum habitual sobre el rostro limpio." },
      { title: "Desliza", text: "Con suavidad, desliza el gua sha del centro hacia fuera, sin presionar de más." },
      { title: "Guarda", text: "Límpialo con un paño húmedo y guárdalo en su bolsa." },
    ],
    benefits: [
      { title: "Un momento para ti", text: "Convierte tu rutina diaria en un pequeño ritual de calma." },
      { title: "Piedra natural", text: "Superficie lisa y fresca al tacto, agradable de usar." },
      { title: "Fácil de limpiar", text: "Sin piezas ni pilas: un paño húmedo basta." },
      { title: "Buen regalo", text: "Viene en bolsa y el pack incluye caja de regalo." },
    ],
    faqs: [
      { q: "¿Qué resultados puedo esperar?", a: "Es un accesorio para masajear el rostro con tus productos. No es un tratamiento médico ni estético y no prometemos resultados concretos." },
      { q: "¿Sirve para cualquier tipo de piel?", a: "Es un accesorio externo. Si tienes la piel muy sensible o alguna afección, consulta antes con un profesional." },
      { q: "¿De qué material es?", a: "Piedra natural; el tono y las vetas pueden variar ligeramente entre piezas." },
      { q: "¿Y si no me convence?", a: "Tienes 30 días desde la entrega para devolverlo; consulta la política de devoluciones." },
    ],
  },
  {
    slug: "soporte-magnetico-auto",
    shopifyHandle: "soporte-magnetico-auto",
    name: "Soporte Magnético para Auto",
    tagline: "Tu celular a la vista, tus manos en el volante.",
    description:
      "Soporte magnético para el tablero o la rejilla del aire, con anillo metálico adhesivo para cualquier celular.",
    status: "test",
    defaultVariantKey: "Soporte + 2 anillos",
    variants: [
      { key: "Soporte", label: "Soporte", description: "1 soporte magnético + 1 anillo", baseUsd: 12.9 },
      { key: "Soporte + 2 anillos", label: "Soporte + 2 anillos", description: "Soporte + anillos para 2 celulares", baseUsd: 19.9, badge: "Más elegido" },
      { key: "Pack 2 soportes", label: "Pack 2 soportes", description: "Para 2 autos o para regalar", baseUsd: 32.9, compareAtOf: { key: "Soporte + 2 anillos", qty: 2 }, badge: "Mejor precio" },
    ],
    steps: [
      { title: "Pega", text: "Fija el anillo metálico en el celular (o dentro de la funda)." },
      { title: "Coloca", text: "Instala el soporte en el tablero o en la rejilla del aire." },
      { title: "Acopla", text: "Acerca el celular: el imán lo sujeta. Para quitarlo, tira suavemente." },
    ],
    benefits: [
      { title: "Un solo gesto", text: "Se acopla y se retira con una mano." },
      { title: "Para casi cualquier celular", text: "El anillo adhesivo permite usarlo con modelos sin carga magnética." },
      { title: "Compacto", text: "Sin brazos ni pinzas: no estorba en el tablero." },
      { title: "Fácil de instalar", text: "No requiere herramientas ni cables." },
    ],
    faqs: [
      { q: "¿Funciona con mi celular y mi funda?", a: "Con el anillo metálico, sí en la mayoría. Fundas muy gruesas pueden reducir la fuerza del imán: colócalo dentro de la funda." },
      { q: "¿Afecta al celular o a la tarjeta del banco?", a: "Los imanes pequeños no dañan los celulares actuales, pero evita acercar tarjetas con banda magnética." },
      { q: "¿Aguanta los baches?", a: "Está pensado para uso normal en carretera. Revisa el agarre y no lo uses si el soporte no sujeta bien el celular." },
      { q: "¿Y si no me convence?", a: "Tienes 30 días desde la entrega para devolverlo; consulta la política de devoluciones." },
    ],
  },
];

export const activeProducts = products.filter((p) => p.status !== "paused");

export function getProductBySlug(slug: string): Product | undefined {
  return activeProducts.find((p) => p.slug === slug);
}
