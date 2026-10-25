import type { Market } from "@/data/markets";

export interface Policy {
  title: string;
  sections: { heading: string; body: string[] }[];
}

export const policySlugs = ["envios", "devoluciones", "privacidad", "terminos"] as const;
export type PolicySlug = (typeof policySlugs)[number];

/**
 * Borrador de las políticas que piden Meta, TikTok y Shopify Payments.
 * Plazos y datos de empresa son supuestos: revísalos con el proveedor y
 * con un asesor legal de cada país antes de lanzar (ver docs/LAUNCH-PLAN.md).
 */
export function getPolicies(market: Market): Record<PolicySlug, Policy> {
  const cod = market.payment === "cod";
  return {
    envios: {
      title: "Política de envíos",
      sections: [
        {
          heading: "Plazos",
          body: [
            `Enviamos a ${market.name}. Preparamos tu pedido en 1–2 días hábiles y la entrega tarda ${market.deliveryDays} desde la confirmación.`,
            "Te enviaremos el número de seguimiento en cuanto el pedido salga.",
          ],
        },
        ...(cod
          ? [
              {
                heading: "Pago contra entrega",
                body: [
                  "Pagas al recibir el pedido, sin adelantar dinero. Antes de enviar, nuestro equipo te contactará por teléfono o WhatsApp para confirmar los datos de entrega.",
                  "Si no podemos confirmar tu pedido, no se enviará. Ten el importe a mano el día de la entrega.",
                ],
              },
            ]
          : [
              {
                heading: "Costes",
                body: ["El coste de envío se calcula en el pago y se muestra antes de confirmar la compra."],
              },
            ]),
        {
          heading: "Pedido retrasado o extraviado",
          body: [
            "Si tu pedido no llega en el plazo indicado o aparece como extraviado, escríbenos y lo reenviamos o te devolvemos el importe.",
          ],
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
          body: [
            "Envíanos una foto en un máximo de 7 días tras la entrega y te enviamos uno nuevo o te devolvemos el dinero, sin que tengas que devolver el producto.",
          ],
        },
        {
          heading: "Reembolsos",
          body: [
            cod
              ? "Como pagaste en efectivo, el reembolso se hace por transferencia bancaria a la cuenta que nos indiques."
              : "El reembolso se hace al mismo medio de pago que usaste en la compra.",
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
          body: [
            "Los datos que nos das al comprar (nombre, dirección, correo, teléfono) y datos de navegación mediante cookies y píxeles de publicidad.",
          ],
        },
        {
          heading: "Para qué los usamos",
          body: [
            "Para procesar y enviar tu pedido, atender tu soporte y medir y mejorar nuestra publicidad. No vendemos tus datos.",
            ...(cod
              ? []
              : ["Los pagos los procesa Shopify y su pasarela de pago; esta web nunca ve ni guarda los datos de tu tarjeta."]),
          ],
        },
        {
          heading: "Tus derechos",
          body: ["Puedes pedirnos acceso, rectificación o eliminación de tus datos escribiéndonos desde la página de contacto."],
        },
      ],
    },
    terminos: {
      title: "Términos del servicio",
      sections: [
        {
          heading: "Uso del sitio",
          body: [
            `Al comprar en esta tienda aceptas estos términos. Los precios se muestran en ${market.currency} e incluyen los impuestos que correspondan, y pueden cambiar sin previo aviso.`,
          ],
        },
        {
          heading: "Pedidos",
          body: [
            "Un pedido se considera aceptado cuando lo confirmamos. Podemos cancelar pedidos por error de precio o falta de disponibilidad y devolverte el importe íntegro si lo hubieras pagado.",
          ],
        },
        {
          heading: "Uso del producto",
          body: [
            "Usa cada producto siguiendo sus instrucciones. Los productos no son productos sanitarios ni sustituyen la atención profesional.",
          ],
        },
      ],
    },
  };
}
