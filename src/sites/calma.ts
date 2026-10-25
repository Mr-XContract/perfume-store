import type { SiteConfig } from "./types";

export const calma: SiteConfig = {
  id: "calma",
  brand: {
    name: "Calma",
    colors: {
      primary: "#7a3b55",
      accent: "#a9532f",
      accentDark: "#8a4325",
      background: "#fbf4f4",
      surface: "#f3e4e4",
    },
  },
  markets: { co: ["cod"], mx: ["cod"], ve: ["cod"], es: ["card"] },
  defaultMarket: "co",
  product: {
    slug: "set-gua-sha",
    defaultVariantKey: "set",
    variants: [
      {
        key: "guasha",
        label: { es: "Gua sha", en: "Gua sha" },
        description: { es: "1 gua sha de piedra", en: "1 stone gua sha" },
        baseUsd: 14.9,
      },
      {
        key: "set",
        label: { es: "Set completo", en: "Complete set" },
        description: { es: "Gua sha + rodillo facial + bolsa", en: "Gua sha + face roller + pouch" },
        baseUsd: 27.9,
        badge: { es: "Más elegido", en: "Most popular" },
      },
      {
        key: "gift",
        label: { es: "Pack regalo", en: "Gift pack" },
        description: { es: "2 sets en caja de regalo", en: "2 sets in a gift box" },
        baseUsd: 49.9,
        compareAtOf: { key: "set", qty: 2 },
        badge: { es: "Para regalar", en: "For gifting" },
      },
    ],
    copy: {
      es: {
        name: "Set Gua Sha y Rodillo Facial",
        tagline: "Tu ritual de cuidado facial de 5 minutos.",
        description:
          "Gua sha y rodillo de piedra natural para masajear el rostro con tu crema o sérum favorito. Un accesorio de cuidado personal, no un tratamiento.",
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
    },
  },
};
