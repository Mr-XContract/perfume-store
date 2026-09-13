import type { Product } from "@/types/product";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { NotesPyramid } from "./NotesPyramid";
import { HiggsfieldVisualizer } from "./HiggsfieldVisualizer";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductShowcase({ product }: { product: Product }) {
  return (
    <section id="coleccion" className="py-24 md:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <RevealOnScroll>
          <HiggsfieldVisualizer asset={product.cinematic} />
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <p className="text-xs tracking-[0.3em] text-gold uppercase">
            {product.brand}
          </p>
          <h2 className="mt-3 font-serif text-4xl text-porcelain md:text-5xl">
            {product.name}
          </h2>
          <p className="mt-2 text-sm italic text-mist">{product.tagline}</p>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-porcelain/80">
            {product.description}
          </p>

          <div className="mt-10">
            <NotesPyramid notes={product.notes} />
          </div>

          <div className="mt-10 flex items-center gap-6">
            <span className="font-serif text-2xl text-porcelain">
              {currencyFormatter.format(product.price)}
            </span>
            <Button>Añadir a la bolsa</Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
