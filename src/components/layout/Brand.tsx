import Image from "next/image";
import Link from "next/link";
import type { SiteConfig } from "@/sites/types";

/** Logo image when the site has one, wordmark otherwise. */
export function Brand({ site, href }: { site: SiteConfig; href: string }) {
  const { name, logo } = site.brand;
  return (
    <Link href={href} className="font-display text-2xl font-semibold text-brand">
      {logo ? (
        <Image src={logo.src} alt={name} width={logo.width} height={logo.height} priority className="h-9 w-auto" />
      ) : (
        name
      )}
    </Link>
  );
}
