import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ProductVisual } from "@/components/product/ProductVisual";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { isMarketCode, markets } from "@/data/markets";
import { formatDelivery, ui } from "@/lib/i18n";
import { formatMoney } from "@/lib/pricing";
import { resolveVariants } from "@/lib/variants";
import { getSite, paymentMethods, siteMarketCodes } from "@/sites";

export async function generateMetadata({ params }: PageProps<"/[market]">): Promise<Metadata> {
  const { market } = await params;
  const site = getSite();
  if (!isMarketCode(market) || !(market in site.markets)) return {};
  const copy = site.product.copy[markets[market].lang]!;
  return {
    title: copy.name,
    description: copy.description,
    alternates: {
      canonical: `/${market}`,
      languages: Object.fromEntries(siteMarketCodes(site).map((c) => [markets[c].locale, `/${c}`])),
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/[market]">) {
  const { market: code } = await params;
  const site = getSite();
  if (!isMarketCode(code) || !(code in site.markets)) notFound();

  const market = markets[code];
  const t = ui[market.lang];
  const copy = site.product.copy[market.lang]!;
  const methods = paymentMethods(site, code);
  const variants = resolveVariants(site, market);
  const lowest = Math.min(...variants.map((v) => v.price));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: copy.name,
    description: copy.description,
    brand: { "@type": "Brand", name: site.brand.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: market.currency,
      lowPrice: lowest,
      offerCount: variants.length,
    },
  };
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "soporte@example.com";
  const faqs = [
    ...copy.faqs,
    {
      q: t.deliveryQ,
      a: `${formatDelivery(market)}. ${methods.includes("cod") ? t.codBullet + "." : t.cardBullet + "."}`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section id="comprar" className="py-10 lg:py-16">
        <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductVisual label={copy.name} />
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">{site.brand.name}</p>
            <h1 className="font-display mt-2 text-4xl leading-tight font-semibold text-balance lg:text-5xl">
              {copy.tagline}
            </h1>
            <p className="mt-4 text-lg text-mist">{copy.description}</p>
            <p className="mt-2 text-sm text-mist">{t.from} {formatMoney(market, lowest)}</p>
            <div className="mt-8">
              <PurchasePanel
                market={code}
                productName={copy.name}
                variants={variants}
                defaultVariantKey={site.product.defaultVariantKey}
                methods={methods}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-16">
        <Container>
          <h2 className="font-display text-center text-3xl font-semibold text-balance">{t.howItWorks}</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {copy.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-cream p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-bold text-white">{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-mist">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="font-display text-center text-3xl font-semibold text-balance">{t.dailyLife}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {copy.benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-ink/10 p-6">
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-mist">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand py-14 text-center text-white">
        <Container>
          <h2 className="font-display text-3xl font-semibold">{t.riskFree}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{t.riskFreeBody}</p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <h2 className="font-display text-center text-3xl font-semibold">{t.faq}</h2>
          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}</summary>
                <p className="mt-2 text-mist">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-mist">
            {t.moreQuestions}{" "}
            <a className="underline" href={`mailto:${supportEmail}`}>{supportEmail}</a>
          </p>
        </Container>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-cream/95 p-3 backdrop-blur md:hidden">
        <LinkButton href="#comprar" className="w-full py-3">{t.pickMobile}</LinkButton>
      </div>
    </>
  );
}
