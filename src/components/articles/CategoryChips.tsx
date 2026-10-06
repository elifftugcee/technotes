"use client";

import Link from "next/link";
import { categories } from "@/content/categories";
import { cn } from "@/lib/cn";
import { useArticles } from "./ArticlesProvider";

const items = [{ slug: "", name: "Tümü" }, ...categories];

/** Category pills under the search box — plain links, so filtered views are shareable. */
export function CategoryChips() {
  const { filters, hrefFor } = useArticles();

  return (
    <nav aria-label="Kategori filtresi" className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => {
        const active = item.slug === filters.category;
        return (
          <Link
            key={item.slug || "all"}
            href={hrefFor({ category: item.slug })}
            replace
            scroll={false}
            aria-current={active ? "true" : undefined}
            className={cn(
              "inline-flex h-8 items-center rounded-full border px-3.5 text-xs font-medium transition-colors",
              active
                ? "border-transparent bg-brand-gradient text-white shadow-brand"
                : "border-line bg-surface text-ink hover:border-brand/40",
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
