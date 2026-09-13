import { Hero } from "@/components/home/Hero";
import { BrandStory } from "@/components/home/BrandStory";
import { ProductShowcase } from "@/components/product/ProductShowcase";
import { PerfumeAssemblyCanvasLoader } from "@/components/scrollytelling/PerfumeAssemblyCanvasLoader";
import { getFeaturedProduct } from "@/lib/getFeaturedProduct";

export default async function Home() {
  const featuredProduct = await getFeaturedProduct();

  return (
    <>
      <Hero />
      <PerfumeAssemblyCanvasLoader product={featuredProduct} />
      <ProductShowcase product={featuredProduct} />
      <BrandStory />
    </>
  );
}
