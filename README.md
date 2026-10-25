# Manada

Tienda Next.js de un solo producto (kit deslanador para mascotas) con checkout
headless en Shopify. Estrategia, números y pasos de lanzamiento en
[`docs/LAUNCH-PLAN.md`](docs/LAUNCH-PLAN.md).

```bash
cp .env.example .env.local   # rellena Shopify, soporte y píxeles
npm install
npm run dev
```

- `src/data/product.ts` — producto, variantes y precios de lanzamiento.
- `src/data/policies.ts` — envíos, devoluciones, privacidad y términos (borrador).
- `src/lib/getProduct.ts` — mezcla datos locales con precio/variantes de Shopify.
- Sin credenciales de Shopify la tienda se ve completa pero el botón queda en "Próximamente".
