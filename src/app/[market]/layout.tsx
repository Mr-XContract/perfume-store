import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { isMarketCode, marketCodes, markets } from "@/data/markets";

export const dynamicParams = false;

export function generateStaticParams() {
  return marketCodes.map((market) => ({ market }));
}

export default async function MarketLayout({ children, params }: LayoutProps<"/[market]">) {
  const { market: code } = await params;
  if (!isMarketCode(code)) notFound();
  const market = markets[code];

  return (
    <>
      <Navbar market={market} />
      <main className="flex-1">{children}</main>
      <Footer market={market} />
    </>
  );
}
