import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { policies } from "@/data/policies";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/politicas/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const policy = policies[slug];
  return { title: policy?.title };
}

export default async function PolicyPage(props: PageProps<"/politicas/[slug]">) {
  const { slug } = await props.params;
  const policy = policies[slug];
  if (!policy) notFound();

  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-4xl font-semibold">{policy.title}</h1>
      {policy.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-xl font-semibold">{s.heading}</h2>
          {s.body.map((p) => (
            <p key={p} className="mt-2 text-mist">
              {p}
            </p>
          ))}
        </section>
      ))}
    </Container>
  );
}
