import Link from "next/link";
import type { ComponentType } from "react";
import type { Category, CategoryTone } from "@/content/categories";
import { ApertureIcon, BookmarkIcon, ChatIcon, LayersIcon, TerminalIcon } from "./icons";

type IconComponent = ComponentType<{ className?: string }>;

const categoryIcons: Record<string, IconComponent> = {
  "ai-computer-vision": ApertureIcon,
  "claude-code": TerminalIcon,
  "prompt-engineering": ChatIcon,
  "software-development": LayersIcon,
  "learning-notes": BookmarkIcon,
};

const toneClasses: Record<CategoryTone, { card: string; iconBg: string }> = {
  blue: { card: "border-accent-blue/15 bg-accent-blue/5 hover:border-accent-blue/30", iconBg: "from-accent-blue to-accent-blue/70" },
  violet: { card: "border-accent-violet/15 bg-accent-violet/5 hover:border-accent-violet/30", iconBg: "from-accent-violet to-accent-violet/70" },
  turquoise: {
    card: "border-accent-turquoise/15 bg-accent-turquoise/5 hover:border-accent-turquoise/30",
    iconBg: "from-accent-turquoise to-accent-turquoise/70",
  },
  indigo: { card: "border-accent-indigo/15 bg-accent-indigo/5 hover:border-accent-indigo/30", iconBg: "from-accent-indigo to-accent-indigo/70" },
  neutral: { card: "border-ink/10 bg-ink/[0.03] hover:border-ink/20", iconBg: "from-ink/80 to-ink/60" },
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = categoryIcons[category.slug] ?? BookmarkIcon;
  const tone = toneClasses[category.tone];

  return (
    <Link
      href={`/articles?category=${category.slug}`}
      className={`group flex flex-col gap-3 rounded-2xl border p-5 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-soft-lg focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue ${tone.card}`}
    >
      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-soft ${tone.iconBg}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="font-display text-base font-semibold text-ink">{category.name}</span>
      <span className="text-sm leading-relaxed text-muted">{category.description}</span>
    </Link>
  );
}
