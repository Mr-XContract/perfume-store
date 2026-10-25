export interface Policy {
  title: string;
  sections: { heading: string; body: string[] }[];
}

/**
 * Borrador de políticas necesarias para Meta/TikTok/Shopify Payments.
 * Plazos y datos de empresa son supuestos: revísalos con tu proveedor y
 * con un asesor legal antes de lanzar (ver docs/LAUNCH-PLAN.md).
 */
export const policies: Record<string, Policy> = {
  envios: {
    title: "Política de envíos",
    sections: [
      {
        heading: "Plazos",
        body: [
          "Preparamos tu pedido en 1–3 días hábiles. El envío tarda entre 7 y 15 días hábiles según tu destino.",
          "Recibirás un correo con el número de seguimiento en cuanto el pedido salga.",
        ],
      },
      {
        heading: "Costes",
        body: [
          "El coste de envío se calcula en el pago y se muestra antes de confirmar la compra.",
        ],
      },
      {
        heading: "Pedido retrasado o extraviado",
        body: [
          "Si tu pedido no llega en 25 días hábiles o aparece como extraviado, escríbenos y lo reenviamos o te devolvemos el importe.",
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
        ],
      },
      {
        heading: "Producto defectuoso o dañado",
        body: [
          "Envíanos una foto en un máximo de 7 días tras la entrega y te enviamos uno nuevo o te devolvemos el dinero, sin que tengas que devolver el producto.",
        ],
      },
      {
        heading: "Cómo solicitarlo",
        body: [
          "Escríbenos desde la página de contacto con tu número de pedido. Respondemos en un máximo de 2 días hábiles.",
        ],
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
          "Los pagos los procesa Shopify y su pasarela de pago; esta web nunca ve ni guarda los datos de tu tarjeta.",
        ],
      },
      {
        heading: "Tus derechos",
        body: [
          "Puedes pedirnos acceso, rectificación o eliminación de tus datos escribiéndonos desde la página de contacto.",
        ],
      },
    ],
  },
  terminos: {
    title: "Términos del servicio",
    sections: [
      {
        heading: "Uso del sitio",
        body: [
          "Al comprar en esta tienda aceptas estos términos. Los precios se muestran en dólares estadounidenses y pueden cambiar sin previo aviso.",
        ],
      },
      {
        heading: "Pedidos",
        body: [
          "Un pedido se considera aceptado cuando recibes la confirmación por correo. Podemos cancelar pedidos por error de precio o falta de disponibilidad y devolverte el importe íntegro.",
        ],
      },
      {
        heading: "Uso del producto",
        body: [
          "El producto está pensado para el cepillado de perros y gatos. Observa siempre a tu mascota: si muestra molestias, deja de usarlo. No sustituye la atención veterinaria.",
        ],
      },
    ],
  },
};
