import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { isMarketCode, markets } from "@/data/markets";
import { getSite, siteMarketCodes } from "@/sites";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteMarketCodes(getSite()).map((market) => ({ market }));
}

export default async function MarketLayout({ children, params }: LayoutProps<"/[market]">) {
  const { market: code } = await params;
  const site = getSite();
  if (!isMarketCode(code) || !(code in site.markets)) notFound();

  return (
    <div lang={markets[code].lang} className="flex flex-1 flex-col">
      <Navbar site={site} market={code} />
      <main className="flex-1">{children}</main>
      <Footer site={site} market={code} />
    </div>
  );
}
