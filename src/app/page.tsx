import { redirect } from "next/navigation";
import { getSite } from "@/sites";

/** Fallback only: src/proxy.ts normally redirects "/" by visitor country. */
export default function Root() {
  redirect(`/${getSite().defaultMarket}`);
}
