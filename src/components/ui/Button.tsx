import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full bg-clay px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-clay-dark cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

export function Button({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a className={`${base} ${className}`} {...props}>
      {children}
    </a>
  );
}
