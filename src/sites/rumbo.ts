import type { SiteConfig } from "./types";

export const rumbo: SiteConfig = {
  id: "rumbo",
  brand: {
    name: "Rumbo",
    colors: {
      primary: "#1f3a5f",
      accent: "#c4501b",
      accentDark: "#a24115",
      background: "#f4f6f9",
      surface: "#e4e9f0",
    },
  },
  markets: { co: ["cod"], mx: ["cod"], ve: ["cod"], es: ["card"] },
  defaultMarket: "co",
  product: {
    slug: "soporte-magnetico-auto",
    defaultVariantKey: "rings2",
    variants: [
      {
        key: "single",
        label: { es: "Soporte", en: "Mount" },
        description: { es: "1 soporte magnético + 1 anillo", en: "1 magnetic mount + 1 ring" },
        baseUsd: 12.9,
      },
      {
        key: "rings2",
        label: { es: "Soporte + 2 anillos", en: "Mount + 2 rings" },
        description: { es: "Soporte + anillos para 2 celulares", en: "Mount + rings for 2 phones" },
        baseUsd: 19.9,
        badge: { es: "Más elegido", en: "Most popular" },
      },
      {
        key: "pack2",
        label: { es: "Pack 2 soportes", en: "2-mount pack" },
        description: { es: "Para 2 autos o para regalar", en: "For 2 cars or as a gift" },
        baseUsd: 32.9,
        compareAtOf: { key: "rings2", qty: 2 },
        badge: { es: "Mejor precio", en: "Best value" },
      },
    ],
    copy: {
      es: {
        name: "Soporte Magnético para Auto",
        tagline: "Tu celular a la vista, tus manos en el volante.",
        description:
          "Soporte magnético para el tablero o la rejilla del aire, con anillo metálico adhesivo para cualquier celular.",
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
    },
  },
};
