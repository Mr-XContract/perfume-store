# Manada — plan de lanzamiento

Tienda de dropshipping de **un solo producto**: kit deslanador para mascotas
(guante de silicona + cepillo autolimpiante).

> Todo lo numérico de este documento son **supuestos** para decidir y
> planificar. No hay garantía de ingresos: valida con cotizaciones reales de
> proveedor y con datos de tus propios tests.

## 1. Por qué este producto

Criterios aplicados: sin marca registrada, sin tallas (pocas devoluciones),
demostrable en 5 segundos de vídeo (antes/después), compra repetida/regalo,
precio de 20–60 USD (margen para pagar publicidad).

- Mascotas: nicho citado como duradero, con baja sensibilidad al precio y
  recompra ([Dropified](https://www.dropified.com/blog/14-most-profitable-dropshipping-niches-for-2026-low-competition-high-demand/), [Inventory Source](https://www.inventorysource.com/best-dropshipping-products-to-sell-this-year/)).
- Rango 20–100 USD como zona con margen suficiente tras publicidad ([TrueProfit](https://trueprofit.io/blog/dropshipping-products-with-high-profit-margin)).
- Objetivo mínimo de margen bruto ~40% antes de publicidad ([Ecommerce Fastlane](https://ecommercefastlane.com/how-to-find-winning-dropshipping-niches/)).
- Riesgos: producto muy copiado (diferénciate con marca, oferta, creatividades) y
  fuentes que son vendedores de herramientas: tómalas como orientativas.

Descartado: perfumes de marca (marcas registradas → cierre de anuncios y
reclamaciones).

## 2. Economía unitaria (supuestos a validar)

| Opción | Precio | Coste proveedor + envío (supuesto) | Margen antes de ads |
|---|---|---|---|
| Guante | 19,90 | ~6 | ~13,90 |
| Kit completo | 34,90 | ~10 | ~24,90 |
| Pack 2 kits | 59,90 | ~20 | ~39,90 |

Con un pedido medio de ~38 USD y ~11 USD de margen tras comisiones de pago
(~3–4%) y publicidad a un CPA objetivo ≤ 15 USD el **margen es ajustado**:
la palanca es subir el AOV (pack, bundles, upsell post-compra) y bajar el CPA
con creatividades.

### Qué implica llegar a 15.000 USD/mes de beneficio

Con ~20 USD de beneficio neto por pedido (tras producto, comisiones y ads),
son ~750 pedidos/mes (~25/día). Con conversión de 1,5–2% eso son 40–50 mil
visitas/mes. Es un objetivo de escala (meses), no de lanzamiento.

## 3. Pasos previos (los haces tú; yo no tengo acceso)

1. Cuenta de Shopify. Crear el producto con handle `kit-deslanador` y 3
   variantes con título exacto: `Guante`, `Kit completo`, `Pack 2 kits`.
2. Token de Storefront API → `.env.local` (ver `.env.example`).
3. Proveedor: pedir muestras de 2–3 (CJ, Spocket, Zendrop o fábrica directa).
   Verificar: plazo real, material de silicona, seguimiento, packaging neutro.
   **Ajusta la página de envíos al plazo real** (`src/data/policies.ts`).
4. Datos legales: razón social/dirección, correo de soporte
   (`NEXT_PUBLIC_SUPPORT_EMAIL`), revisión legal de las políticas.
5. Dominio + despliegue en Vercel.
6. Fotos/vídeo reales: sustituir `ProductVisual` por imágenes del producto.
7. Crear píxeles Meta/TikTok → `NEXT_PUBLIC_META_PIXEL_ID` / `..._TIKTOK_PIXEL_ID`.

## 4. Testing publicitario (semanas 1–4)

- Presupuesto de prueba: 30–50 USD/día repartidos en 3–4 creatividades.
- Plataformas: Meta (principal) y TikTok (vídeo).
- Ángulos a probar: (1) antes/después en sofá/ropa, (2) "se siente como una
  caricia" (reacción de la mascota), (3) limpieza con un botón, (4) regalo para
  amantes de mascotas.
- Formato: UGC en vídeo vertical 15–30 s, gancho en los primeros 2 s. Prefiere
  tomas reales del producto probado con mascotas; no inventes testimonios ni
  reseñas.
- Criterios de decisión tras ~2.000–3.000 USD de gasto o 7 días por creatividad:
  CPA ≤ 15 USD y ROAS ≥ ~2,3 → escalar un 20–30% cada 2–3 días; peor → matar
  creatividad. Si ningún ángulo sale tras 3–4 rondas, cambiar de producto.

## 5. Reglas que se han respetado en la web

- Sin reseñas, contadores de urgencia ni stock falso. Añade reseñas **solo
  reales**, cuando existan.
- Sin precio "antes" inventado: el tachado del pack es la suma real de 2 kits.
- Sin promesas médicas ni cifras de eficacia no demostradas.
- Pago siempre en el checkout alojado de Shopify.

## 6. Pendiente de construir (siguiente iteración)

- Reseñas reales (app de Shopify o propias) y fotos de clientes.
- Upsell/cross-sell post-compra y email de carrito abandonado (Klaviyo).
- Conversions API de Meta/TikTok del lado servidor.
- Variantes por tipo de mascota/pelo si los datos lo justifican.
