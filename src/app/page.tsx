import { Hero } from "@/components/home/Hero";
import { BrandStory } from "@/components/home/BrandStory";
import { ProductShowcase } from "@/components/product/ProductShowcase";
import { PerfumeAssemblyCanvasLoader } from "@/components/scrollytelling/PerfumeAssemblyCanvasLoader";
import { featuredProduct } from "@/data/products";

export default function Home() {
  return (
    <>
      <Hero />
      <PerfumeAssemblyCanvasLoader product={featuredProduct} />
      <ProductShowcase product={featuredProduct} />
      <BrandStory />
    </>
  );
}
