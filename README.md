# Webs one-page por producto

Un repositorio, muchas tiendas de un solo producto (dropshipping). Cada web
tiene su marca, colores, logo, mercados y métodos de pago, y se despliega como
un proyecto independiente. Estrategia y conexiones necesarias en
[`docs/LAUNCH-PLAN.md`](docs/LAUNCH-PLAN.md).

```bash
cp .env.example .env.local   # elige SITE_ID y rellena pagos, soporte y píxeles
npm install
npm run dev                  # sirve la web indicada en SITE_ID
npm run new-site -- <id> "<Marca>" [slug]   # crea la web de un producto nuevo
```

- `src/sites/*.ts` — una web por archivo (marca, producto, textos, mercados, pagos).
- `src/data/markets.ts` — CO, MX, VE, ES, US: moneda, cambio, idioma y entrega.
- `src/data/policies.ts` — políticas por mercado e idioma (borrador).
- `src/app/api/orders` — contra entrega → `ORDER_WEBHOOK_URL`.
- `src/app/api/checkout` — tarjeta con Stripe Checkout (`STRIPE_SECRET_KEY`).
- `src/proxy.ts` — redirige `/` al mercado del visitante.
