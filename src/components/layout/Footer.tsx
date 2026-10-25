import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Market } from "@/data/markets";
import { siteConfig } from "@/lib/site";

export function Footer({ market }: { market: Market }) {
  const base = `/${market.code}`;
  const links = [
    { href: `${base}/politicas/envios`, label: "Envíos" },
    { href: `${base}/politicas/devoluciones`, label: "Devoluciones" },
    { href: `${base}/politicas/privacidad`, label: "Privacidad" },
    { href: `${base}/politicas/terminos`, label: "Términos" },
    { href: `${base}/contacto`, label: "Contacto" },
  ];
  return (
    <footer className="border-t border-ink/10 bg-sand py-12 pb-28 md:pb-12">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-moss">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-mist">Productos útiles para el día a día · {market.name}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-mist">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
