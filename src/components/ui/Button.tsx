import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "soft" | "light";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,box-shadow,background-color,border-color,filter] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-60";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-gradient text-white shadow-brand hover:-translate-y-0.5 hover:brightness-110",
  outline: "border border-line bg-surface text-ink shadow-card hover:-translate-y-0.5 hover:border-brand/40",
  soft: "border border-line bg-surface text-brand shadow-card hover:-translate-y-0.5 hover:border-brand/40",
  /** Always-white pill — for use on top of imagery in both themes */
  light: "border border-transparent bg-white text-brand shadow-card hover:-translate-y-0.5",
};

const sizeClasses = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-8 text-sm",
} as const;

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
  variant?: Variant;
  size?: keyof typeof sizeClasses;
  className?: string;
  children: ReactNode;
  /** When set, renders a link (new tab for external URLs) instead of a `<button>`; button-only props are ignored. */
  href?: string;
};

export function Button({ variant = "primary", size = "md", className, children, href, ...buttonProps }: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (href === undefined) {
    return (
      <button type="button" className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
