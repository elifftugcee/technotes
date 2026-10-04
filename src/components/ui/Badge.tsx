import type { ReactNode } from "react";
import type { CategoryTone } from "@/content/categories";

type Variant = "soft" | "solid";

const softToneClasses: Record<CategoryTone, string> = {
  blue: "border-accent-blue/25 bg-accent-blue/10 text-accent-blue",
  violet: "border-accent-violet/25 bg-accent-violet/10 text-accent-violet",
  turquoise: "border-accent-turquoise/25 bg-accent-turquoise/10 text-accent-turquoise",
  indigo: "border-accent-indigo/25 bg-accent-indigo/10 text-accent-indigo",
  neutral: "border-ink/15 bg-ink/5 text-muted",
};

const solidToneClasses: Record<CategoryTone, string> = {
  blue: "bg-accent-blue text-white",
  violet: "bg-accent-violet text-white",
  turquoise: "bg-accent-turquoise text-white",
  indigo: "bg-accent-indigo text-white",
  neutral: "bg-ink text-white",
};

export function Badge({
  tone = "blue",
  variant = "soft",
  children,
}: {
  tone?: CategoryTone;
  variant?: Variant;
  children: ReactNode;
}) {
  const toneClasses = variant === "solid" ? solidToneClasses[tone] : softToneClasses[tone];
  const shapeClasses = variant === "solid" ? "rounded-full shadow-soft" : "rounded-sm border";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wide ${shapeClasses} ${toneClasses}`}
    >
      {children}
    </span>
  );
}
