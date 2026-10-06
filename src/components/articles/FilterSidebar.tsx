"use client";

import Link from "next/link";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { ChevronDownIcon, StackIcon } from "@/components/ui/icons";
import { toneStyles } from "@/components/ui/tones";
import { categories } from "@/content/categories";
import { durationOptions, sortOptions, type DurationKey, type SortKey } from "@/lib/article-filters";
import { cn } from "@/lib/cn";
import { useArticles } from "./ArticlesProvider";

const headingClasses = "text-sm font-bold tracking-tight text-ink";

const checkboxClasses =
  "h-[1.125rem] w-[1.125rem] shrink-0 cursor-pointer appearance-none rounded-md border border-line bg-surface bg-center bg-no-repeat transition-colors checked:border-brand checked:bg-brand checked:bg-check checked:bg-[length:80%] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/** Category list, sort order and reading-time filters. The category list is hidden below `lg` (the chips cover it). */
export function FilterSidebar() {
  const { filters, categoryCounts, totalPosts, hrefFor, navigate } = useArticles();

  const toggleDuration = (value: DurationKey) =>
    navigate({
      durations: filters.durations.includes(value)
        ? filters.durations.filter((item) => item !== value)
        : [...filters.durations, value],
    });

  const rowClasses = (active: boolean) =>
    cn(
      "flex h-10 items-center gap-3 rounded-xl px-2 text-[0.8125rem] transition-colors",
      active ? "bg-brand/10 font-semibold text-ink" : "text-ink/85 hover:bg-surface-2",
    );

  return (
    <aside aria-label="Filtreler" className="h-fit rounded-2xl border border-line bg-glass p-4 shadow-card backdrop-blur-xl">
      <div className="hidden lg:block">
        <h2 className={headingClasses}>Kategoriler</h2>
        <ul className="mt-3 space-y-1">
          <li>
            <Link
              href={hrefFor({ category: "" })}
              replace
              scroll={false}
              aria-current={filters.category === "" ? "true" : undefined}
              className={rowClasses(filters.category === "")}
            >
              <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-lg", toneStyles.blue.tile)}>
                <StackIcon className="h-4 w-4" />
              </span>
              <span className="flex-1">Tümü</span>
              <span className="text-xs text-muted">{totalPosts}</span>
            </Link>
          </li>
          {categories.map((category) => {
            const active = filters.category === category.slug;
            return (
              <li key={category.slug}>
                <Link
                  href={hrefFor({ category: category.slug })}
                  replace
                  scroll={false}
                  aria-current={active ? "true" : undefined}
                  className={rowClasses(active)}
                >
                  <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-lg", toneStyles[category.tone].tile)}>
                    <CategoryIcon name={category.icon} className="h-4 w-4" />
                  </span>
                  <span className="flex-1">{category.name}</span>
                  <span className="text-xs text-muted">{categoryCounts[category.slug] ?? 0}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:mt-6 lg:block lg:space-y-6">
        <div>
          <label htmlFor="article-sort" className={headingClasses}>
            Sıralama
          </label>
          <div className="relative mt-3">
            <select
              id="article-sort"
              value={filters.sort}
              onChange={(event) => navigate({ sort: event.target.value as SortKey })}
              className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-line bg-surface pl-3 pr-9 text-sm text-ink outline-none focus:border-brand/60"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink" />
          </div>
        </div>

        <fieldset>
          <legend className={headingClasses}>Okuma Süresi</legend>
          <div className="mt-3 space-y-2.5">
            {durationOptions.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-3 text-[0.8125rem] text-ink/85">
                <input
                  type="checkbox"
                  checked={filters.durations.includes(option.value)}
                  onChange={() => toggleDuration(option.value)}
                  className={checkboxClasses}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </aside>
  );
}
