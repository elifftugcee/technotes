import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { pageWindow } from "@/lib/article-filters";
import { cn } from "@/lib/cn";

const baseClasses =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition-colors";

/** ← 1 … 4 5 6 … 12 →  — links, so every page is shareable and keyboard friendly. */
export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const arrow = (target: number, disabled: boolean, label: string, icon: ReactNode) =>
    disabled ? (
      <span aria-hidden="true" className={cn(baseClasses, "pointer-events-none border-line bg-surface text-muted opacity-40")}>
        {icon}
      </span>
    ) : (
      <Link
        href={hrefFor(target)}
        replace
        aria-label={label}
        className={cn(baseClasses, "border-line bg-surface text-ink hover:border-brand/40")}
      >
        {icon}
      </Link>
    );

  return (
    <nav aria-label="Sayfalama" className="mt-8 flex items-center justify-center gap-1.5">
      {arrow(page - 1, page <= 1, "Önceki sayfa", <ArrowLeftIcon className="h-4 w-4" />)}
      {pageWindow(page, totalPages).map((entry, index) =>
        entry === null ? (
          <span key={`gap-${index}`} aria-hidden="true" className="px-1 text-muted">
            …
          </span>
        ) : (
          <Link
            key={entry}
            href={hrefFor(entry)}
            replace
            aria-label={`Sayfa ${entry}`}
            aria-current={entry === page ? "page" : undefined}
            className={cn(
              baseClasses,
              entry === page
                ? "border-transparent bg-brand text-white shadow-brand"
                : "border-transparent text-ink hover:bg-surface-2",
            )}
          >
            {entry}
          </Link>
        ),
      )}
      {arrow(page + 1, page >= totalPages, "Sonraki sayfa", <ArrowRightIcon className="h-4 w-4" />)}
    </nav>
  );
}
