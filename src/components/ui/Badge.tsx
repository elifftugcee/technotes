import type { ReactNode } from "react";

type Tone = "blue" | "violet" | "turquoise";

const toneClasses: Record<Tone, string> = {
  blue: "border-accent-blue/25 bg-accent-blue/10 text-accent-blue",
  violet: "border-accent-violet/25 bg-accent-violet/10 text-accent-violet",
  turquoise: "border-accent-turquoise/25 bg-accent-turquoise/10 text-accent-turquoise",
};

export function Badge({ tone = "blue", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wide ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
