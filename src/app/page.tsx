import { redirect } from "next/navigation";
import { DEFAULT_MARKET } from "@/data/markets";

/** Fallback only: src/proxy.ts normally redirects "/" by visitor country. */
export default function Root() {
  redirect(`/${DEFAULT_MARKET}`);
}
