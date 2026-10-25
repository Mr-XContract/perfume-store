import type { Lang, Market } from "@/data/markets";

export interface Ui {
  codBanner: string;
  cardBanner: string;
  guarantee: string;
  shipsTo: string;
  from: string;
  chooseOption: string;
  payWith: string;
  codLabel: string;
  cardLabel: string;
  codCta: string;
  buy: string;
  wait: string;
  retry: string;
  cardError: string;
  codBullet: string;
  cardBullet: string;
  delivery: string;
  orderReceived: string;
  orderReceivedBody: string;
  formIntro: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
  confirmOrder: string;
  sending: string;
  orderError: string;
  howItWorks: string;
  dailyLife: string;
  riskFree: string;
  riskFreeBody: string;
  faq: string;
  moreQuestions: string;
  pickMobile: string;
  deliveryQ: string;
  thanks: string;
  thanksBody: string;
  backToProduct: string;
  contact: string;
  contactBody: string;
  footerTagline: string;
  links: { shipping: string; returns: string; privacy: string; terms: string; contact: string };
}

export const ui: Record<Lang, Ui> = {
  es: {
    codBanner: "Pagas al recibir",
    cardBanner: "Pago seguro",
    guarantee: "Garantía de 30 días",
    shipsTo: "Envíos a",
    from: "Desde",
    chooseOption: "Elige tu opción",
    payWith: "Método de pago",
    codLabel: "Pago al recibir",
    cardLabel: "Tarjeta",
    codCta: "Pedir ahora · Pago al recibir",
    buy: "Comprar",
    wait: "Un momento…",
    retry: "Reintentar",
    cardError: "No pudimos iniciar el pago. Inténtalo de nuevo.",
    codBullet: "Pagas en efectivo al recibir el pedido",
    cardBullet: "Pago seguro con tarjeta",
    delivery: "Entrega en",
    orderReceived: "¡Pedido recibido!",
    orderReceivedBody: "Te contactaremos por teléfono o WhatsApp para confirmarlo. Pagas {total} al recibirlo.",
    formIntro: "Déjanos tus datos de entrega. Pagas al recibir y te llamaremos para confirmar el pedido.",
    fullName: "Nombre completo",
    phone: "Teléfono / WhatsApp",
    city: "Ciudad",
    address: "Dirección de entrega",
    notes: "Indicaciones (opcional)",
    confirmOrder: "Confirmar pedido",
    sending: "Enviando…",
    orderError: "No pudimos registrar tu pedido. Revisa los datos e inténtalo de nuevo.",
    howItWorks: "Cómo funciona",
    dailyLife: "Pensado para el día a día",
    riskFree: "Pruébalo sin riesgo",
    riskFreeBody: "Si en 30 días desde la entrega no te convence, lo devuelves y te reembolsamos el precio del producto.",
    faq: "Preguntas frecuentes",
    moreQuestions: "¿Más dudas? Escríbenos a",
    pickMobile: "Elegir mi opción",
    deliveryQ: "¿Cuánto tarda en llegar?",
    thanks: "¡Gracias por tu compra!",
    thanksBody: "Te hemos enviado la confirmación por correo. Escríbenos si tienes cualquier duda.",
    backToProduct: "Volver",
    contact: "Contacto",
    contactBody: "Escríbenos con tu número de pedido y respondemos en un máximo de 2 días hábiles.",
    footerTagline: "Productos útiles para el día a día",
    links: { shipping: "Envíos", returns: "Devoluciones", privacy: "Privacidad", terms: "Términos", contact: "Contacto" },
  },
  en: {
    codBanner: "Pay on delivery",
    cardBanner: "Secure payment",
    guarantee: "30-day guarantee",
    shipsTo: "Shipping to",
    from: "From",
    chooseOption: "Choose your option",
    payWith: "Payment method",
    codLabel: "Pay on delivery",
    cardLabel: "Card",
    codCta: "Order now · Pay on delivery",
    buy: "Buy",
    wait: "One moment…",
    retry: "Try again",
    cardError: "We couldn't start the payment. Please try again.",
    codBullet: "You pay in cash when the order arrives",
    cardBullet: "Secure card payment",
    delivery: "Delivery in",
    orderReceived: "Order received!",
    orderReceivedBody: "We'll contact you by phone or WhatsApp to confirm it. You pay {total} on delivery.",
    formIntro: "Leave your delivery details. You pay on delivery and we'll call to confirm the order.",
    fullName: "Full name",
    phone: "Phone / WhatsApp",
    city: "City",
    address: "Delivery address",
    notes: "Notes (optional)",
    confirmOrder: "Confirm order",
    sending: "Sending…",
    orderError: "We couldn't place your order. Check your details and try again.",
    howItWorks: "How it works",
    dailyLife: "Made for everyday life",
    riskFree: "Try it risk-free",
    riskFreeBody: "If you're not happy within 30 days of delivery, send it back and we'll refund the product price.",
    faq: "Frequently asked questions",
    moreQuestions: "More questions? Email us at",
    pickMobile: "Choose my option",
    deliveryQ: "How long does delivery take?",
    thanks: "Thank you for your order!",
    thanksBody: "We've emailed you the confirmation. Write to us if you have any questions.",
    backToProduct: "Back",
    contact: "Contact",
    contactBody: "Write to us with your order number and we'll reply within 2 business days.",
    footerTagline: "Useful products for everyday life",
    links: { shipping: "Shipping", returns: "Returns", privacy: "Privacy", terms: "Terms", contact: "Contact" },
  },
};

export function formatDelivery(market: Market): string {
  const [min, max] = market.deliveryDays;
  return market.lang === "en" ? `${min}–${max} business days` : `${min}–${max} días hábiles`;
}
