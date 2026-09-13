import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-porcelain/10 bg-ink/70 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.3em] text-porcelain"
        >
          MAISON&nbsp;NOIR
        </Link>

        <nav className="hidden gap-10 text-xs tracking-[0.2em] text-mist uppercase md:flex">
          <Link href="#coleccion" className="hover:text-gold transition-colors">
            Colección
          </Link>
          <Link href="#historia" className="hover:text-gold transition-colors">
            La Casa
          </Link>
          <Link href="#contacto" className="hover:text-gold transition-colors">
            Contacto
          </Link>
        </nav>

        <button
          aria-label="Abrir carrito"
          className="text-xs tracking-[0.2em] text-porcelain uppercase hover:text-gold transition-colors"
        >
          Bolsa (0)
        </button>
      </Container>
    </header>
  );
}
