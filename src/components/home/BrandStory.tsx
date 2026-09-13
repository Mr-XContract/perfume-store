import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function BrandStory() {
  return (
    <section id="historia" className="border-t border-porcelain/10 py-24">
      <Container className="max-w-2xl text-center">
        <RevealOnScroll>
          <p className="text-xs tracking-[0.3em] text-gold uppercase">
            La Casa
          </p>
          <p className="mt-6 font-serif text-2xl leading-relaxed text-porcelain md:text-3xl">
            Creemos que una fragancia se experimenta antes de olerse. Por
            eso cada pieza de nuestra colección se presenta con un render
            cinemático propio, una forma de contar su carácter antes de que
            llegue a tus manos.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
