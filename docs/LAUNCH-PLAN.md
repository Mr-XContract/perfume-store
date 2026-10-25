# Manada — plan de portafolio (varios mercados, varios productos)

Objetivo: no depender de un solo producto ni de un solo país. El catálogo
(`src/data/products.ts`) y los mercados (`src/data/markets.ts`) son **datos**:
añadir, pausar o cambiar uno no toca el código.

> Todo lo numérico son **supuestos** para planificar. No hay garantía de
> ingresos: valida con cotizaciones reales de proveedor y con tus propios tests.

## 1. Cómo está montada la tienda

| Mercado | Moneda | Pago | Entrega (supuesto) |
|---|---|---|---|
| Colombia `/co` | COP | Contra entrega | 2–5 días |
| México `/mx` | MXN | Contra entrega | 3–7 días |
| España `/es` | EUR | Tarjeta (Shopify) | 7–15 días |

- `/` redirige al mercado del país del visitante (cabecera de Vercel); el resto va a Colombia.
- **Precios:** parten de un precio base en USD × tipo de cambio × `priceIndex`
  (poder adquisitivo) y se redondean a precios psicológicos. Sin `priceIndex`,
  Colombia quedaba en ~140.000 COP para una compra por impulso. Calibra los
  tres valores con tus tests.
- **Contra entrega:** el formulario manda el pedido a `ORDER_WEBHOOK_URL`
  (Make, Zapier, Google Sheets o integración con Dropi). El total se recalcula
  en el servidor. Un equipo debe **llamar/escribir por WhatsApp para confirmar**
  antes de enviar.
- **Tarjeta:** checkout alojado de Shopify. El precio mostrado es el nuestro
  salvo que Shopify devuelva la misma moneda; no se mezclan monedas.
- Políticas, plazos y textos legales se generan por mercado
  (`src/data/policies.ts`). Son un borrador: revísalos con asesor legal local
  (retracto y consumo difieren entre CO, MX y ES).

## 2. Portafolio inicial: 3 productos × 3 mercados

Los tres productos son **candidatos a validar**, no apuestas; ninguno es
suplemento ni promete resultados de salud (riesgo de rechazo de anuncios y
registro sanitario).

| Producto | Por qué entra | Riesgo |
|---|---|---|
| Kit deslanador mascotas | Demostrable en vídeo, recompra/regalo | Muy copiado: diferénciate con oferta y creatividades |
| Set gua sha + rodillo | Margen alto, regalo | Evitar toda promesa estética/médica |
| Soporte magnético auto | Ligero, pocas devoluciones | Producto muy común: pelea por precio |

Fuentes de la selección:
[TrueProfit](https://trueprofit.io/blog/dropshipping-products-with-high-profit-margin),
[Inventory Source](https://www.inventorysource.com/best-dropshipping-products-to-sell-this-year/),
[Dropified](https://www.dropified.com/blog/14-most-profitable-dropshipping-niches-for-2026-low-competition-high-demand/),
[Ecommerce Fastlane](https://ecommercefastlane.com/how-to-find-winning-dropshipping-niches/).
(Blogs de vendedores de herramientas: orientativas.)

## 3. Método del vídeo, adaptado

1. **Producto con datos** — en Dropi (CO/MX) filtra por *ventas últimas 7 días*,
   stock y precio de proveedor. Pasa los candidatos a `products.ts` con
   `status: "test"`. Exige: sin promesas de salud, margen bruto ≥ 40% tras
   proveedor + flete + tasa de rechazo de contra entrega.
2. **Anuncio con datos** — en Adskiller / Biblioteca de anuncios de Meta busca
   anuncios activos **más de 60–77 días** del producto: es la señal de que
   alguien sigue pagando por ellos. Extrae **ángulo, gancho y formato**, no el
   material: no copies vídeos, fotos ni textos ajenos (derechos de autor y
   políticas de Meta).
3. **Campaña** — crear siempre **en pausa** y activarla tú. Con un conector
   (p. ej. Adspirer) puedo preparar la campaña; el gasto lo apruebas tú.

## 4. Cómo no diluir el presupuesto

Nueve combinaciones a 30 USD/día cada una son 270 USD/día: no hace falta. Las
fases son:

1. **Semana 1–2 — 1 mercado barato (CO o MX) × 3 productos**, 10–15 USD/día por
   producto, 2–3 creatividades cada uno. Se decide por **CPA y tasa de
   confirmación**, no por clics.
2. **Semana 3–4 — el mejor producto en el 2.º mercado**, y los otros dos solo si
   mantienen CPA objetivo.
3. **Escalar** lo que funcione un 20–30% cada 2–3 días; **pausar** lo que no
   (`status: "paused"`) y meter un producto nuevo del ranking de Dropi.
4. España (tarjeta) entra cuando haya un ganador demostrado: tiene CPM más alto
   y menos margen por envío largo.

Reglas de corte (ajústalas al margen real): tras ~2–3× el precio de venta en
gasto sin pedidos confirmados, matar la creatividad; si ningún ángulo funciona
tras 3–4 rondas, cambiar de producto.

## 5. Contra entrega: qué vigilar

- **Tasa de confirmación y de entrega** (supuesto de partida: 60–75% de los
  pedidos acaban entregados). Un CPA bueno sobre pedidos no confirmados engaña.
- El evento `Purchase` se dispara al **registrar** el pedido (sirve para
  optimizar anuncios). Los cancelados no se descuentan solos: lleva tu propio
  recuento de entregas.
- Reembolso de contra entrega = transferencia bancaria.

## 6. Reglas respetadas en la web

- Sin reseñas, contadores de urgencia ni stock falsos. Añade reseñas **solo reales**.
- Sin precio "antes" inventado: el tachado del pack es la suma real de comprar
  las unidades sueltas.
- Sin promesas médicas ni cifras de eficacia no demostradas.
- Pagos con tarjeta solo en el checkout alojado de Shopify.

## 7. Pasos previos (los haces tú)

1. Shopify: productos con los handles y títulos de variante exactos de
   `products.ts` (solo para mercados con tarjeta) + token → `.env.local`.
2. `ORDER_WEBHOOK_URL` para contra entrega + una persona/proceso que confirme pedidos.
3. Proveedor por producto y mercado: muestras, plazo y coste reales →
   ajustar `markets.ts`/`products.ts` y las políticas.
4. Razón social, correo de soporte (`NEXT_PUBLIC_SUPPORT_EMAIL`), dominio, revisión legal.
5. Fotos y vídeo reales (sustituir `ProductVisual`).
6. Píxeles Meta/TikTok (`NEXT_PUBLIC_*_PIXEL_ID`).

## 8. Siguiente iteración

Reseñas reales, carrito abandonado, Conversions API de servidor, subtotales
con envío por ciudad, y mercados nuevos (basta con una entrada en `markets.ts`).
