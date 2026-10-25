import type { SiteConfig } from "./types";

export const manada: SiteConfig = {
  id: "manada",
  brand: {
    name: "Manada",
    colors: { primary: "#2f5d46", accent: "#c8602a", accentDark: "#a84d1f" },
  },
  markets: {
    co: ["cod"],
    mx: ["cod"],
    ve: ["cod"],
    es: ["card"],
    us: ["card"],
  },
  defaultMarket: "co",
  product: {
    slug: "kit-deslanador",
    defaultVariantKey: "kit",
    variants: [
      {
        key: "glove",
        label: { es: "Guante deslanador", en: "Deshedding glove" },
        description: { es: "1 guante de silicona ajustable", en: "1 adjustable silicone glove" },
        baseUsd: 19.9,
      },
      {
        key: "kit",
        label: { es: "Kit completo", en: "Complete kit" },
        description: { es: "Guante + cepillo autolimpiante", en: "Glove + self-cleaning brush" },
        baseUsd: 34.9,
        badge: { es: "Más elegido", en: "Most popular" },
      },
      {
        key: "pack2",
        label: { es: "Pack 2 kits", en: "2-kit pack" },
        description: { es: "Para casas con 2 mascotas o para regalar", en: "For two-pet homes or as a gift" },
        baseUsd: 59.9,
        compareAtOf: { key: "kit", qty: 2 },
        badge: { es: "Mejor precio", en: "Best value" },
      },
    ],
    copy: {
      es: {
        name: "Kit Deslanador para Mascotas",
        tagline: "Menos pelo en el sofá. Más tiempo con tu mascota.",
        description:
          "Guante de silicona y cepillo autolimpiante para retirar el pelo suelto de perros y gatos mientras los acaricias.",
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
      en: {
        name: "Pet Deshedding Kit",
        tagline: "Less fur on the couch. More time with your pet.",
        description:
          "A silicone glove and a self-cleaning brush to lift loose fur from dogs and cats while you pet them.",
        steps: [
          { title: "Pet", text: "Run the glove along their back as if you were petting them. The silicone tips catch loose fur." },
          { title: "Lift", text: "Fur gathers into small clumps that are easy to pick off by hand." },
          { title: "Clean", text: "With the brush, press the button and the fur releases in one go, no bristle-pulling." },
        ],
        benefits: [
          { title: "Feels like a pat", text: "Soft silicone tips designed for brushing dogs and cats." },
          { title: "No batteries, no noise", text: "It works by hand, so it won't scare pets that dislike gadgets." },
          { title: "Cleans in seconds", text: "The self-cleaning brush releases the fur with one button." },
          { title: "Reusable", text: "One kit all year, with no refills or disposable rollers." },
        ],
        faqs: [
          { q: "Does it work for dogs and cats?", a: "Yes, it's designed for both. Try a few seconds first and watch how your pet reacts." },
          { q: "What about very long or very short coats?", a: "The glove works well on short and medium coats. For long coats, start with the brush and finish with the glove." },
          { q: "Is it a veterinary product?", a: "No. It's a grooming accessory. If your pet has skin or coat problems, talk to your vet." },
          { q: "What if I don't like it?", a: "You have 30 days from delivery to return it; see the returns policy." },
        ],
      },
    },
  },
};
