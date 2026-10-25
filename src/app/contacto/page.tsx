import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-4xl font-semibold">Contacto</h1>
      <p className="mt-4 text-mist">
        Escríbenos con tu número de pedido y respondemos en un máximo de 2 días hábiles.
      </p>
      <a
        className="mt-6 inline-block text-lg font-semibold text-moss underline"
        href={`mailto:${siteConfig.supportEmail}`}
      >
        {siteConfig.supportEmail}
      </a>
    </Container>
  );
}
