import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@/components/layout/Analytics";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Productos útiles para el día a día`,
    template: `%s · ${siteConfig.name}`,
  },
  description:
    "Productos útiles para el día a día, con garantía de devolución de 30 días.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
