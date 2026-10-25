// Uso: npm run new-site -- <id> "<Marca>" [slug-del-producto]
// Crea src/sites/<id>.ts con una plantilla y lo registra en src/sites/index.ts.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const [id, brand, slug = id] = process.argv.slice(2);
if (!id || !brand || !/^[a-z0-9-]+$/.test(id)) {
  console.error('Uso: npm run new-site -- <id-en-minusculas> "<Marca>" [slug]');
  process.exit(1);
}

const file = `src/sites/${id}.ts`;
if (existsSync(file)) {
  console.error(`${file} ya existe`);
  process.exit(1);
}

const ident = id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

writeFileSync(
  file,
  `import type { SiteConfig } from "./types";

// TODO: completa marca, colores, producto, variantes y textos. Los precios
// base (USD) y los mercados activos deciden el resto; ver docs/LAUNCH-PLAN.md.
export const ${ident}: SiteConfig = {
  id: "${id}",
  brand: {
    name: ${JSON.stringify(brand)},
    // logo: { src: "/sites/${id}/logo.svg", width: 160, height: 36 },
    colors: { primary: "#1f3a5f", accent: "#c4501b", accentDark: "#a24115" },
  },
  markets: { co: ["cod"], mx: ["cod"], ve: ["cod"], es: ["card"] },
  defaultMarket: "co",
  product: {
    slug: "${slug}",
    defaultVariantKey: "single",
    variants: [
      {
        key: "single",
        label: { es: "1 unidad", en: "1 unit" },
        description: { es: "Descripción", en: "Description" },
        baseUsd: 19.9,
      },
    ],
    copy: {
      es: {
        name: "Nombre del producto",
        tagline: "Promesa principal, sin afirmaciones médicas.",
        description: "Qué es y para qué sirve, en una frase.",
        steps: [
          { title: "Paso 1", text: "..." },
          { title: "Paso 2", text: "..." },
          { title: "Paso 3", text: "..." },
        ],
        benefits: [
          { title: "Beneficio 1", text: "..." },
          { title: "Beneficio 2", text: "..." },
        ],
        faqs: [{ q: "¿Pregunta frecuente?", a: "Respuesta." }],
      },
    },
  },
};
`,
);

const indexPath = "src/sites/index.ts";
let index = readFileSync(indexPath, "utf8");
index = index.replace(
  /(import \{ rumbo \} from "\.\/rumbo";)/,
  `$1\nimport { ${ident} } from "./${id}";`,
);
index = index.replace(/\{ manada, calma, rumbo \}/, `{ manada, calma, rumbo, ${ident} }`);
writeFileSync(indexPath, index);

console.log(`Creado ${file} y registrado en ${indexPath}.`);
console.log(`Despliega con SITE_ID=${id} (un proyecto de Vercel por web).`);
