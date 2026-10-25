import Link from "next/link";
import { ProductVisual } from "@/components/product/ProductVisual";
import type { Market } from "@/data/markets";
import type { Product } from "@/data/products";
import { formatMoney, priceFor } from "@/lib/pricing";

export function ProductCard({ market, product }: { market: Market; product: Product }) {
  const lowest = Math.min(...product.variants.map((v) => v.baseUsd));
  return (
    <Link href={`/${market.code}/${product.slug}`} className="group block">
      <ProductVisual label={product.name} />
      <h2 className="font-display mt-4 text-xl font-semibold group-hover:text-moss">{product.name}</h2>
      <p className="mt-1 text-mist">{product.tagline}</p>
      <p className="mt-2 font-semibold">Desde {formatMoney(market, priceFor(market, lowest))}</p>
    </Link>
  );
}
