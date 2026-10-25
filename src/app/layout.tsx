import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@/components/layout/Analytics";
import { getSite } from "@/sites";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });

export function generateMetadata(): Metadata {
  const site = getSite();
  const copy = site.product.copy.es;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: { default: `${site.brand.name} — ${copy.name}`, template: `%s · ${site.brand.name}` },
    description: copy.description,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { colors } = getSite().brand;
  const theme = {
    "--color-brand": colors.primary,
    "--color-accent": colors.accent,
    "--color-accent-dark": colors.accentDark,
    ...(colors.background && { "--color-cream": colors.background }),
    ...(colors.surface && { "--color-sand": colors.surface }),
  } as CSSProperties;

  return (
    <html lang="es" style={theme} className={`${inter.variable} ${fraunces.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
