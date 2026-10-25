# Plan: una web one-page por producto

Cada producto ganador tiene **su propia web de una página**, con su marca,
logo, colores, mercados y métodos de pago. No hay catálogo compartido: lo que
funciona se despliega como una tienda independiente, y lo que no, se descarta
sin afectar a las demás.

> Todo lo numérico son **supuestos** para planificar. No hay garantía de
> ingresos: valida con cotizaciones reales de proveedor y con tus propios tests.

## 1. Cómo está montado

- **Un repositorio, muchas webs.** Cada web es un archivo `src/sites/<id>.ts`
  (marca, colores, logo, producto, variantes, textos, mercados y pagos).
- **Un despliegue por web:** un proyecto de Vercel por web con la variable
  `SITE_ID=<id>` y su propio dominio. Los píxeles, el webhook y el correo de
  soporte también son por proyecto.
- **Crear una web nueva:** `npm run new-site -- <id> "<Marca>" [slug]`, completar
  el archivo generado y registrar el proyecto en Vercel.
- **Mercados** (`src/data/markets.ts`): CO, MX, VE, ES, US. Cada web activa los
  que quiera y define el método de pago de cada uno. US se sirve en inglés
  (la web debe traer texto `en`; si no, no arranca).
- **Pagos por mercado** (el primero de la lista es el predeterminado; con
  varios, el cliente elige):
  - `cod` — contra entrega: el pedido va a `ORDER_WEBHOOK_URL` y un humano
    confirma por teléfono/WhatsApp antes de enviar.
  - `card` — tarjeta con **Stripe Checkout** (página alojada por Stripe; esta
    web no ve datos de tarjeta). Sin tienda de Shopify por producto.
  - El importe se recalcula siempre en el servidor, nunca se confía en el cliente.
- **Precios:** base en USD × tipo de cambio × `priceIndex` (poder adquisitivo),
  redondeados a precios psicológicos. Calibra `fx` y `priceIndex` con tests.
- **Entrada:** `/` redirige al mercado del país del visitante dentro de los
  mercados de esa web; si no está, va al predeterminado.
- Políticas, plazos y textos legales se generan por mercado e idioma
  (`src/data/policies.ts`). Son un borrador: revísalos con asesor legal local.

## 2. Webs creadas (candidatos a validar)

| Web | Producto | Mercados |
|---|---|---|
| `manada` | Kit deslanador para mascotas | CO, MX, VE (contra entrega) · ES, US (tarjeta) |
| `calma` | Set gua sha + rodillo | CO, MX, VE (contra entrega) · ES (tarjeta) |
| `rumbo` | Soporte magnético para auto | CO, MX, VE (contra entrega) · ES (tarjeta) |

Los nombres de marca y colores son provisionales. Ninguno es suplemento ni
promete resultados de salud.

### Cómo evaluar un producto nuevo (p. ej. un limpiador de oídos)

1. Márgenes: ≥ 40% bruto tras proveedor, flete y la tasa de rechazo de contra entrega.
2. **Riesgo de política y de producto:** lo que se introduce en el cuerpo, los
   dispositivos con "cámara para oídos" y todo lo que promete salud o
   eliminar cera/patologías tienen restricciones de anuncios y riesgo de
   lesiones y devoluciones. Se puede vender como accesorio de higiene con
   copy neutro, pero conviene validarlo con las políticas de Meta/TikTok antes
   de invertir.
3. Demostrable en vídeo, sin tallas, con anuncios de la competencia activos
   hace 60+ días.

## 3. Método de investigación (adaptado del vídeo)

1. **Producto con datos** — en Dropi (CO/MX/otros) filtra por ventas de los
   últimos 7 días, stock y precio de proveedor.
2. **Anuncio con datos** — en Adskiller / Biblioteca de anuncios de Meta busca
   anuncios activos **más de 60–77 días**. Extrae **ángulo, gancho y formato**;
   no copies vídeos, fotos ni textos ajenos.
3. **Web + creatividades + campaña** — se crea la web del producto, se generan
   creatividades propias (Higgsfield) y la campaña se prepara **siempre en
   pausa** para que la actives tú.

## 4. Cómo no diluir el presupuesto

Fases por web, no todas a la vez:

1. **Semana 1–2:** un mercado barato (CO o MX) por producto, 10–15 USD/día,
   2–3 creatividades. Se decide por **CPA y tasa de confirmación**, no por clics.
2. **Semana 3–4:** el mejor producto pasa al segundo mercado; los demás solo si
   mantienen el CPA objetivo.
3. **Escalar** un 20–30% cada 2–3 días lo que funcione; **retirar** lo que no
   y abrir la web de un producto nuevo.
4. US y ES (tarjeta) entran con un ganador demostrado: CPM más alto.

Corte: tras ~2–3× el precio de venta en gasto sin pedidos confirmados, matar la
creatividad; sin ángulo ganador tras 3–4 rondas, cambiar de producto.

## 5. Contra entrega: qué vigilar

- **Tasa de confirmación y de entrega** (supuesto: 60–75% de entregados). Un CPA
  bueno sobre pedidos no confirmados engaña.
- `Purchase` se dispara al **registrar** el pedido; los cancelados no se
  descuentan solos: lleva tu propio recuento.
- Reembolso de contra entrega = transferencia bancaria.
- Venezuela: tratar como USD en efectivo/transferencia confirmada por WhatsApp;
  valida con tu operador logístico qué métodos acepta antes de anunciar.

## 6. Reglas respetadas en las webs

- Sin reseñas, contadores de urgencia ni stock falsos (añade reseñas **solo reales**).
- Sin precio "antes" inventado: el tachado del pack es comprar las unidades sueltas.
- Sin promesas médicas ni cifras de eficacia no demostradas.
- Tarjeta solo en la página alojada de Stripe.

## 7. Conexiones y datos necesarios

**Ya conectadas en esta sesión:** GitHub, Vercel, Higgsfield.

**Prioridad 1 — para empezar a vender**
- Cuenta de **Stripe** (conector disponible en claude.ai) o PayPal, para
  mercados con tarjeta. Requiere una entidad en un país soportado; confirma que
  tu cuenta acepta cobrar en USD/EUR/MXN.
- **Webhook de pedidos** para contra entrega: Make o Zapier (conectores
  disponibles) o Google Sheets. Define `ORDER_WEBHOOK_URL`.
- **Dominio** por web y proyecto de Vercel por web (puedo crearlos con el
  conector de Vercel; la compra de dominios la apruebas tú).
- Datos del negocio: razón social/dirección, correo de soporte, WhatsApp.

**Prioridad 2 — para investigar y anunciar**
- **Dropi y Adskiller:** no hay conector público. Si tu versión del vídeo usa
  un MCP propio, dame su URL para añadirlo como conector personalizado; si no,
  exporta tablas/capturas del ranking y de los anuncios.
- **Meta Ads y TikTok Ads:** conector Adspirer (Meta + TikTok, crea campañas en
  pausa) o AdWhispr (investiga anuncios de competencia). Para solo leer métricas:
  Supermetrics o Windsor.ai. Necesitas Business Manager, cuenta publicitaria,
  píxel y dominio verificado.

**Prioridad 3 — operación**
- Google Sheets (registro de pedidos y entregas) y un canal de WhatsApp para
  confirmar pedidos (Bird, o manual al principio).
- Logo y fotos/vídeo reales del producto: sustituir `ProductVisual` y añadir
  `brand.logo` en la config de la web.

## 8. Siguiente iteración

Reseñas reales, carrito abandonado, Conversions API de servidor, tabla de envío
por ciudad, y un generador de web más completo (importar producto de Dropi).
