import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/politicas/envios", label: "Envíos" },
  { href: "/politicas/devoluciones", label: "Devoluciones" },
  { href: "/politicas/privacidad", label: "Privacidad" },
  { href: "/politicas/terminos", label: "Términos" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-sand py-12 pb-28 md:pb-12">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-moss">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-mist">Cuidado simple para perros y gatos.</p>
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
