import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="bg-moss py-2 text-center text-xs font-medium text-white">
        Garantía de devolución de 30 días · Envío con seguimiento
      </div>
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-2xl font-semibold text-moss">
          {siteConfig.name}
        </Link>
        <Link
          href="/#comprar"
          className="rounded-full bg-moss px-5 py-2 text-sm font-semibold text-white hover:bg-moss/90"
        >
          Comprar
        </Link>
      </Container>
    </header>
  );
}
