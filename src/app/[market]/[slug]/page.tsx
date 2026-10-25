import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ProductVisual } from "@/components/product/ProductVisual";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { activeProducts, getProductBySlug } from "@/data/products";
import { isMarketCode, marketCodes, markets } from "@/data/markets";
import { resolveVariants } from "@/lib/getProduct";
import { formatMoney } from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return marketCodes.flatMap((market) => activeProducts.map((p) => ({ market, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[market]/[slug]">): Promise<Metadata> {
  const { market, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || !isMarketCode(market)) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/${market}/${slug}`,
      languages: Object.fromEntries(marketCodes.map((c) => [markets[c].locale, `/${c}/${slug}`])),
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/[market]/[slug]">) {
  const { market: code, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || !isMarketCode(code)) notFound();
  const market = markets[code];

  const variants = await resolveVariants(market, product);
  const lowest = Math.min(...variants.map((v) => v.price));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: market.currency,
      lowPrice: lowest,
      offerCount: variants.length,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section id="comprar" className="py-10 lg:py-16">
        <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductVisual label={product.name} />
          <div>
            <p className="text-sm font-semibold tracking-wide text-moss uppercase">{siteConfig.name}</p>
            <h1 className="font-display mt-2 text-4xl leading-tight font-semibold text-balance lg:text-5xl">
              {product.tagline}
            </h1>
            <p className="mt-4 text-lg text-mist">{product.description}</p>
            <p className="mt-2 text-sm text-mist">Desde {formatMoney(market, lowest)}</p>
            <div className="mt-8">
              <PurchasePanel
                market={market.code}
                productSlug={product.slug}
                name={product.name}
                variants={variants}
                defaultVariantKey={product.defaultVariantKey}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-16">
        <Container>
          <h2 className="font-display text-center text-3xl font-semibold text-balance">Cómo funciona</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {product.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-cream p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-moss font-bold text-white">{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-mist">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="font-display text-center text-3xl font-semibold text-balance">Pensado para el día a día</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {product.benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-ink/10 p-6">
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-mist">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-moss py-14 text-center text-white">
        <Container>
          <h2 className="font-display text-3xl font-semibold">Pruébalo sin riesgo</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Si en 30 días desde la entrega no te convence, lo devuelves y te reembolsamos el precio del producto.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <h2 className="font-display text-center text-3xl font-semibold">Preguntas frecuentes</h2>
          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {[
              ...product.faqs,
              { q: "¿Cuánto tarda en llegar?", a: `Entre ${market.deliveryDays}. ${market.payment === "cod" ? "Pagas al recibir." : "Recibirás un número de seguimiento por correo."}` },
            ].map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}</summary>
                <p className="mt-2 text-mist">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-mist">
            ¿Más dudas? Escríbenos a{" "}
            <a className="underline" href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
          </p>
        </Container>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-cream/95 p-3 backdrop-blur md:hidden">
        <LinkButton href="#comprar" className="w-full py-3">
          Elegir mi opción
        </LinkButton>
      </div>
    </>
  );
}
