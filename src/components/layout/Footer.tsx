import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { markets, type MarketCode } from "@/data/markets";
import { ui } from "@/lib/i18n";
import type { SiteConfig } from "@/sites/types";

export function Footer({ site, market: code }: { site: SiteConfig; market: MarketCode }) {
  const market = markets[code];
  const t = ui[market.lang];
  const base = `/${code}`;
  const links = [
    { href: `${base}/politicas/envios`, label: t.links.shipping },
    { href: `${base}/politicas/devoluciones`, label: t.links.returns },
    { href: `${base}/politicas/privacidad`, label: t.links.privacy },
    { href: `${base}/politicas/terminos`, label: t.links.terms },
    { href: `${base}/contacto`, label: t.links.contact },
  ];
  return (
    <footer className="border-t border-ink/10 bg-sand py-12 pb-28 md:pb-12">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-brand">{site.brand.name}</p>
          <p className="mt-1 text-sm text-mist">{t.footerTagline} · {market.name}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink">{l.label}</Link>
          ))}
        </nav>
        <p className="text-xs text-mist">© {new Date().getFullYear()} {site.brand.name}</p>
      </Container>
    </footer>
  );
}
