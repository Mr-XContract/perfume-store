import type { Market } from "@/data/markets";
import type { PaymentMethod } from "@/sites/types";
import { formatDelivery } from "@/lib/i18n";

export interface Policy {
  title: string;
  sections: { heading: string; body: string[] }[];
}

export const policySlugs = ["envios", "devoluciones", "privacidad", "terminos"] as const;
export type PolicySlug = (typeof policySlugs)[number];

/**
 * Borrador de las políticas que piden Meta, TikTok y las pasarelas de pago.
 * Plazos y datos de empresa son supuestos: revísalos con el proveedor y
 * con un asesor legal de cada país antes de lanzar (ver docs/LAUNCH-PLAN.md).
 */
export function getPolicies(market: Market, methods: PaymentMethod[]): Record<PolicySlug, Policy> {
  const cod = methods.includes("cod");
  const card = methods.includes("card");
  const days = formatDelivery(market);

  if (market.lang === "en") {
    return {
      envios: {
        title: "Shipping policy",
        sections: [
          {
            heading: "Delivery times",
            body: [
              `We ship to ${market.name}. We prepare your order in 1–2 business days and delivery takes ${days} from confirmation.`,
              "We'll email you a tracking number as soon as your order ships.",
            ],
          },
          ...(cod
            ? [{
                heading: "Pay on delivery",
                body: [
                  "You pay when the order arrives. Before shipping, our team will contact you by phone or WhatsApp to confirm your delivery details.",
                  "If we can't confirm your order, it won't be shipped.",
                ],
              }]
            : []),
          ...(card
            ? [{ heading: "Costs", body: ["Any shipping cost is shown at checkout before you confirm your purchase."] }]
            : []),
          {
            heading: "Late or lost orders",
            body: ["If your order doesn't arrive within the stated time or shows as lost, write to us and we'll resend it or refund you."],
          },
        ],
      },
      devoluciones: {
        title: "Returns and guarantee",
        sections: [
          {
            heading: "30-day guarantee",
            body: [
              "If you're not happy with the product, you can return it within 30 days of delivery and we'll refund the product price.",
              "The product must be in good condition. Return shipping is paid by the customer unless the product arrives defective or wrong.",
              "This guarantee is in addition to your statutory consumer rights, which are not affected.",
            ],
          },
          {
            heading: "Defective or damaged product",
            body: ["Send us a photo within 7 days of delivery and we'll send a replacement or refund you, with no need to return the item."],
          },
          {
            heading: "Refunds",
            body: [
              cod && !card
                ? "Since you paid in cash, refunds are made by bank transfer to the account you give us."
                : "Card refunds go back to the original payment method.",
            ],
          },
          {
            heading: "How to request one",
            body: ["Write to us from the contact page with your order number. We reply within 2 business days."],
          },
        ],
      },
      privacidad: {
        title: "Privacy policy",
        sections: [
          {
            heading: "What we collect",
            body: ["The details you give us when you buy (name, address, email, phone) and browsing data through cookies and advertising pixels."],
          },
          {
            heading: "How we use it",
            body: [
              "To process and ship your order, provide support, and measure and improve our advertising. We don't sell your data.",
              ...(card ? ["Card payments are processed by our payment provider; this site never sees or stores your card details."] : []),
            ],
          },
          { heading: "Your rights", body: ["You can ask us to access, correct or delete your data by writing to us from the contact page."] },
        ],
      },
      terminos: {
        title: "Terms of service",
        sections: [
          {
            heading: "Using the site",
            body: [`By buying from this store you accept these terms. Prices are shown in ${market.currency} and may change without notice.`],
          },
          {
            heading: "Orders",
            body: ["An order is accepted once we confirm it. We may cancel orders because of a pricing error or lack of stock and refund you in full if you paid."],
          },
          {
            heading: "Using the product",
            body: ["Use each product according to its instructions. Products are not medical devices and do not replace professional care."],
          },
        ],
      },
    };
  }

  return {
    envios: {
      title: "Política de envíos",
      sections: [
        {
          heading: "Plazos",
          body: [
            `Enviamos a ${market.name}. Preparamos tu pedido en 1–2 días hábiles y la entrega tarda ${days} desde la confirmación.`,
            "Te enviaremos el número de seguimiento en cuanto el pedido salga.",
          ],
        },
        ...(cod
          ? [{
              heading: "Pago contra entrega",
              body: [
                "Pagas al recibir el pedido, sin adelantar dinero. Antes de enviar, nuestro equipo te contactará por teléfono o WhatsApp para confirmar los datos de entrega.",
                "Si no podemos confirmar tu pedido, no se enviará. Ten el importe a mano el día de la entrega.",
              ],
            }]
          : []),
        ...(card
          ? [{ heading: "Costes", body: ["El coste de envío, si lo hay, se muestra en el pago antes de confirmar la compra."] }]
          : []),
        {
          heading: "Pedido retrasado o extraviado",
          body: ["Si tu pedido no llega en el plazo indicado o aparece como extraviado, escríbenos y lo reenviamos o te devolvemos el importe."],
        },
      ],
    },
    devoluciones: {
      title: "Devoluciones y garantía",
      sections: [
        {
          heading: "Garantía de 30 días",
          body: [
            "Si el producto no te convence, puedes devolverlo en los 30 días siguientes a la entrega y te reembolsamos el precio del producto.",
            "El producto debe estar en buen estado. Los costes de devolución corren por cuenta del cliente salvo que el producto llegue defectuoso o equivocado.",
            "Esta garantía se suma a tus derechos legales como consumidor, que no se ven limitados.",
          ],
        },
        {
          heading: "Producto defectuoso o dañado",
          body: ["Envíanos una foto en un máximo de 7 días tras la entrega y te enviamos uno nuevo o te devolvemos el dinero, sin que tengas que devolver el producto."],
        },
        {
          heading: "Reembolsos",
          body: [
            cod && !card
              ? "Como pagaste en efectivo, el reembolso se hace por transferencia bancaria a la cuenta que nos indiques."
              : "El reembolso de pagos con tarjeta se hace al mismo medio de pago que usaste.",
          ],
        },
        {
          heading: "Cómo solicitarlo",
          body: ["Escríbenos desde la página de contacto con tu número de pedido. Respondemos en un máximo de 2 días hábiles."],
        },
      ],
    },
    privacidad: {
      title: "Política de privacidad",
      sections: [
        {
          heading: "Qué datos recogemos",
          body: ["Los datos que nos das al comprar (nombre, dirección, correo, teléfono) y datos de navegación mediante cookies y píxeles de publicidad."],
        },
        {
          heading: "Para qué los usamos",
          body: [
            "Para procesar y enviar tu pedido, atender tu soporte y medir y mejorar nuestra publicidad. No vendemos tus datos.",
            ...(card ? ["Los pagos con tarjeta los procesa nuestra pasarela de pago; esta web nunca ve ni guarda los datos de tu tarjeta."] : []),
          ],
        },
        { heading: "Tus derechos", body: ["Puedes pedirnos acceso, rectificación o eliminación de tus datos escribiéndonos desde la página de contacto."] },
      ],
    },
    terminos: {
      title: "Términos del servicio",
      sections: [
        {
          heading: "Uso del sitio",
          body: [`Al comprar en esta tienda aceptas estos términos. Los precios se muestran en ${market.currency} y pueden cambiar sin previo aviso.`],
        },
        {
          heading: "Pedidos",
          body: ["Un pedido se considera aceptado cuando lo confirmamos. Podemos cancelar pedidos por error de precio o falta de disponibilidad y devolverte el importe íntegro si lo hubieras pagado."],
        },
        {
          heading: "Uso del producto",
          body: ["Usa cada producto siguiendo sus instrucciones. Los productos no son productos sanitarios ni sustituyen la atención profesional."],
        },
      ],
    },
  };
}
