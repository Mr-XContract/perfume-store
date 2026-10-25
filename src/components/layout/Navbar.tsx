import { Brand } from "@/components/layout/Brand";
import { Container } from "@/components/ui/Container";
import { markets, type MarketCode } from "@/data/markets";
import { formatDelivery, ui } from "@/lib/i18n";
import { paymentMethods, siteMarketCodes } from "@/sites";
import type { SiteConfig } from "@/sites/types";
import Link from "next/link";

export function Navbar({ site, market: code }: { site: SiteConfig; market: MarketCode }) {
  const market = markets[code];
  const t = ui[market.lang];
  const methods = paymentMethods(site, code);
  const others = siteMarketCodes(site);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="bg-brand py-2 text-center text-xs font-medium text-white">
        {methods.includes("cod") ? t.codBanner : t.cardBanner} · {t.guarantee} · {t.shipsTo} {market.name}
        <span className="sr-only"> ({formatDelivery(market)})</span>
      </div>
      <Container className="flex h-16 items-center justify-between">
        <Brand site={site} href={`/${code}`} />
        {others.length > 1 && (
          <nav aria-label="País / Country" className="flex items-center gap-1 text-sm">
            {others.map((c) => (
              <Link
                key={c}
                href={`/${c}`}
                aria-current={c === code ? "true" : undefined}
                className={`rounded-full px-3 py-1.5 font-medium ${
                  c === code ? "bg-brand text-white" : "text-mist hover:text-ink"
                }`}
              >
                {markets[c].country}
              </Link>
            ))}
          </nav>
        )}
      </Container>
    </header>
  );
}
