import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { TrackOnMount } from "@/components/product/TrackOnMount";
import { isMarketCode, markets } from "@/data/markets";
import { ui } from "@/lib/i18n";
import { getSite } from "@/sites";

export const metadata: Metadata = { title: "Gracias", robots: { index: false } };

export default async function ThanksPage({ params }: PageProps<"/[market]/gracias">) {
  const { market: code } = await params;
  if (!isMarketCode(code) || !(code in getSite().markets)) notFound();
  const t = ui[markets[code].lang];

  return (
    <Container className="max-w-xl py-20 text-center">
      <TrackOnMount />
      <h1 className="font-display text-4xl font-semibold text-brand">{t.thanks}</h1>
      <p className="mt-4 text-mist">{t.thanksBody}</p>
      <LinkButton href={`/${code}`} className="mt-8">{t.backToProduct}</LinkButton>
    </Container>
  );
}
