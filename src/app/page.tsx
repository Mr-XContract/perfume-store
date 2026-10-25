import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ProductVisual } from "@/components/product/ProductVisual";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { formatPrice } from "@/data/product";
import { getProduct } from "@/lib/getProduct";
import { siteConfig } from "@/lib/site";

const steps = [
  { title: "Acaricia", text: "Pasa el guante por el lomo como si lo acariciaras. Las puntas de silicona atrapan el pelo suelto." },
  { title: "Retira", text: "Los mechones se juntan en bolitas fáciles de quitar con la mano." },
  { title: "Limpia", text: "Con el cepillo, pulsa el botón y el pelo sale de golpe. Sin tirar de las cerdas." },
];

const benefits = [
  { title: "Se siente como una caricia", text: "Puntas de silicona suave pensadas para el cepillado de perros y gatos." },
  { title: "Sin pilas ni ruido", text: "Funciona a mano: no asusta a mascotas sensibles a los aparatos." },
  { title: "Se limpia en segundos", text: "El cepillo autolimpiante expulsa el pelo con un botón." },
  { title: "Reutilizable", text: "Un solo kit para todo el año, sin recambios ni rodillos desechables." },
];

const faqs = [
  { q: "¿Sirve para perros y gatos?", a: "Sí, está pensado para ambos. Prueba primero unos segundos y fíjate en cómo reacciona tu mascota." },
  { q: "¿Y si mi mascota tiene el pelo muy largo o muy corto?", a: "El guante funciona bien en pelo corto y medio. En pelo largo, empieza por el cepillo y termina con el guante." },
  { q: "¿Cuánto tarda en llegar?", a: "Entre 7 y 15 días hábiles. Recibirás un número de seguimiento por correo." },
  { q: "¿Y si no me convence?", a: "Tienes 30 días desde la entrega para devolverlo y te reembolsamos el precio del producto." },
  { q: "¿Es un producto veterinario?", a: "No. Es un accesorio de cepillado. Si tu mascota tiene problemas de piel o pelo, consulta a tu veterinario." },
];

export default async function Home() {
  const product = await getProduct();
  const lowest = Math.min(...product.variants.map((v) => v.price));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: lowest,
      offerCount: product.variants.length,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section id="comprar" className="py-10 lg:py-16">
        <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductVisual />
          <div>
            <p className="text-sm font-semibold tracking-wide text-moss uppercase">{product.brand}</p>
            <h1 className="font-display mt-2 text-4xl leading-tight font-semibold text-balance lg:text-5xl">
              {product.tagline}
            </h1>
            <p className="mt-4 text-lg text-mist">{product.description}</p>
            <p className="mt-2 text-sm text-mist">Desde {formatPrice(lowest)}</p>
            <div className="mt-8">
              <PurchasePanel
                name={product.name}
                variants={product.variants}
                defaultVariantKey={product.defaultVariantKey}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-16">
        <Container>
          <h2 className="font-display text-center text-3xl font-semibold text-balance">
            Cómo funciona
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-cream p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-moss font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-mist">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="font-display text-center text-3xl font-semibold text-balance">
            Pensado para el día a día
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-ink/10 p-6">
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-mist">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-moss py-14 text-center text-white">
        <Container>
          <h2 className="font-display text-3xl font-semibold">Pruébalo sin riesgo</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Si en 30 días desde la entrega no te convence, lo devuelves y te reembolsamos el precio del producto.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <h2 className="font-display text-center text-3xl font-semibold">Preguntas frecuentes</h2>
          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-2 text-mist">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-mist">
            ¿Más dudas? Escríbenos a{" "}
            <a className="underline" href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
          </p>
        </Container>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-cream/95 p-3 backdrop-blur md:hidden">
        <LinkButton href="#comprar" className="w-full py-3">
          Elegir mi kit
        </LinkButton>
      </div>
    </>
  );
}
