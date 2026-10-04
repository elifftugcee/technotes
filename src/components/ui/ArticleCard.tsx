import Link from "next/link";
import { Badge } from "./Badge";
import { CornerFrame } from "./CornerFrame";
import { NodePattern } from "./NodePattern";

export type ArticleCardProps = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  href: string;
};

export function ArticleCard({ title, excerpt, category, date, readingTime, href }: ArticleCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-ink/8 bg-white shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-soft-lg focus-visible:-translate-y-1 focus-visible:shadow-soft-lg focus-visible:outline-none"
    >
      <CornerFrame className="z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-surface via-surface-strong to-surface">
        <NodePattern className="h-16 w-16 opacity-70" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge>{category}</Badge>
          <span className="whitespace-nowrap font-mono text-xs text-muted">{readingTime}</span>
        </div>
        <h3 className="line-clamp-2 font-display text-lg font-semibold leading-snug text-ink">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <time className="font-mono text-xs text-muted">{date}</time>
          <span aria-hidden="true" className="text-accent-blue transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
