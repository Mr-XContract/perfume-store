import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { marketCodes, markets, type Market } from "@/data/markets";
import { siteConfig } from "@/lib/site";

export function Navbar({ market }: { market: Market }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="bg-moss py-2 text-center text-xs font-medium text-white">
        {market.payment === "cod" ? "Pagas al recibir" : "Pago seguro"} · Garantía de 30 días · Envíos a {market.name}
      </div>
      <Container className="flex h-16 items-center justify-between">
        <Link href={`/${market.code}`} className="font-display text-2xl font-semibold text-moss">
          {siteConfig.name}
        </Link>
        <nav aria-label="País" className="flex items-center gap-1 text-sm">
          {marketCodes.map((code) => (
            <Link
              key={code}
              href={`/${code}`}
              aria-current={code === market.code ? "true" : undefined}
              className={`rounded-full px-3 py-1.5 font-medium ${
                code === market.code ? "bg-moss text-white" : "text-mist hover:text-ink"
              }`}
            >
              {markets[code].country}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
