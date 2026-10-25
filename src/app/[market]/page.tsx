import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { activeProducts } from "@/data/products";
import { isMarketCode, markets } from "@/data/markets";

export const metadata: Metadata = {
  description: "Productos útiles para el día a día, con garantía de devolución de 30 días.",
};

export default async function MarketHome({ params }: PageProps<"/[market]">) {
  const { market: code } = await params;
  if (!isMarketCode(code)) notFound();
  const market = markets[code];

  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl font-semibold text-balance">Elige tu producto</h1>
      <p className="mt-2 text-mist">
        {market.payment === "cod" ? "Pagas al recibir." : "Pago seguro."} Garantía de devolución de 30 días.
      </p>
      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {activeProducts.map((p) => (
          <ProductCard key={p.slug} market={market} product={p} />
        ))}
      </div>
    </Container>
  );
}
