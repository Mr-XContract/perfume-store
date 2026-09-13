import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-porcelain/10 py-14">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="font-serif text-lg tracking-[0.3em] text-porcelain">
          MAISON&nbsp;NOIR
        </p>
        <p className="max-w-md text-xs leading-relaxed text-mist">
          Fragancias exclusivas para caballeros. Prototipo de e-commerce con
          fines de demostración.
        </p>
        <p className="text-[11px] tracking-widest text-mist/60">
          © {new Date().getFullYear()} Maison Noir — Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
