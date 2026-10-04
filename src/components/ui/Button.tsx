import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent-blue via-accent-violet to-accent-turquoise text-white shadow-soft hover:-translate-y-0.5 hover:shadow-soft-lg",
  outline:
    "border border-ink/15 bg-white text-ink hover:border-accent-blue/50 hover:bg-surface",
  ghost: "text-ink/80 hover:bg-surface hover:text-ink",
};

type SharedAttributes = Omit<
  ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "children" | "href" | "type"
>;

export type ButtonProps = SharedAttributes & {
  variant?: Variant;
  href?: string;
  className?: string;
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export function Button({ variant = "primary", href, className = "", children, type, ...rest }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
