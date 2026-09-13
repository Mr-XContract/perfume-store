import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 px-8 py-3 text-xs tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-ink hover:bg-gold-soft",
  ghost:
    "border border-porcelain/30 text-porcelain hover:border-gold hover:text-gold",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: Variant;
}

export function LinkButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
