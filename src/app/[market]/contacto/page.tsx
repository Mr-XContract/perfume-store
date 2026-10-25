import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { isMarketCode, markets } from "@/data/markets";
import { ui } from "@/lib/i18n";
import { getSite } from "@/sites";

export const metadata: Metadata = { title: "Contacto" };

export default async function ContactPage({ params }: PageProps<"/[market]/contacto">) {
  const { market: code } = await params;
  if (!isMarketCode(code) || !(code in getSite().markets)) notFound();
  const t = ui[markets[code].lang];
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "soporte@example.com";

  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-4xl font-semibold">{t.contact}</h1>
      <p className="mt-4 text-mist">{t.contactBody}</p>
      <a className="mt-6 inline-block text-lg font-semibold text-brand underline" href={`mailto:${email}`}>{email}</a>
    </Container>
  );
}
