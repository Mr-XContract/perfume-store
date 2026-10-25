# Manada

Tienda Next.js multi-mercado y multi-producto (dropshipping). Estrategia,
números y pasos de lanzamiento en [`docs/LAUNCH-PLAN.md`](docs/LAUNCH-PLAN.md).

```bash
cp .env.example .env.local   # Shopify, soporte, píxeles y webhook de pedidos
npm install
npm run dev
```

- `src/data/markets.ts` — mercados (moneda, tipo de cambio, pago, entrega). Añadir un país = una entrada.
- `src/data/products.ts` — catálogo y variantes; `status: "paused"` oculta un producto.
- `src/data/policies.ts` — políticas generadas por mercado (borrador).
- `src/proxy.ts` — redirige `/` al mercado del visitante.
- `src/app/api/orders` — pedidos contra entrega → `ORDER_WEBHOOK_URL`.
- `src/app/api/cart` — carrito y checkout de Shopify (mercados con tarjeta).
