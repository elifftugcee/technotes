import Link from "next/link";
import { Badge } from "./Badge";
import { CornerFrame } from "./CornerFrame";
import { NodePattern } from "./NodePattern";
import { CalendarIcon, ClockIcon } from "./icons";
import type { CategoryTone } from "@/content/categories";

export type ArticleCardProps = {
  title: string;
  excerpt: string;
  category: string;
  categoryTone: CategoryTone;
  date: string;
  readingTime: string;
  href: string;
};

export function ArticleCard({
  title,
  excerpt,
  category,
  categoryTone,
  date,
  readingTime,
  href,
}: ArticleCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-soft-lg focus-visible:-translate-y-1 focus-visible:shadow-soft-lg focus-visible:outline-none"
    >
      <CornerFrame className="z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-surface via-surface-strong to-surface">
        <NodePattern className="h-16 w-16 opacity-70" />
        <div className="absolute left-3 top-3">
          <Badge tone={categoryTone} variant="solid">
            {category}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 font-display text-lg font-semibold leading-snug text-ink">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{excerpt}</p>
        <div className="mt-auto flex items-center gap-4 pt-2 font-mono text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" />
            {date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            {readingTime}
          </span>
          <span aria-hidden="true" className="ml-auto text-accent-blue transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
