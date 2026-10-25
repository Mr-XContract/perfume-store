import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { isMarketCode, marketCodes, markets } from "@/data/markets";
import { getPolicies, policySlugs, type PolicySlug } from "@/data/policies";

export const dynamicParams = false;

export function generateStaticParams() {
  return marketCodes.flatMap((market) => policySlugs.map((slug) => ({ market, slug })));
}

const isPolicySlug = (s: string): s is PolicySlug => (policySlugs as readonly string[]).includes(s);

export async function generateMetadata({ params }: PageProps<"/[market]/politicas/[slug]">): Promise<Metadata> {
  const { market, slug } = await params;
  if (!isMarketCode(market) || !isPolicySlug(slug)) return {};
  return { title: getPolicies(markets[market])[slug].title };
}

export default async function PolicyPage({ params }: PageProps<"/[market]/politicas/[slug]">) {
  const { market: code, slug } = await params;
  if (!isMarketCode(code) || !isPolicySlug(slug)) notFound();
  const policy = getPolicies(markets[code])[slug];

  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-4xl font-semibold">{policy.title}</h1>
      {policy.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-xl font-semibold">{s.heading}</h2>
          {s.body.map((p) => (
            <p key={p} className="mt-2 text-mist">{p}</p>
          ))}
        </section>
      ))}
    </Container>
  );
}
