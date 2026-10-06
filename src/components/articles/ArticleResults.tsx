"use client";

import Link from "next/link";
import { BookmarkFilledIcon, GridIcon, ListIcon } from "@/components/ui/icons";
import type { ViewMode } from "@/lib/article-filters";
import { cn } from "@/lib/cn";
import { ArticleCard } from "./ArticleCard";
import { ArticleRow } from "./ArticleRow";
import { useArticles } from "./ArticlesProvider";
import { articleGridClasses } from "./grid";
import { Pagination } from "./Pagination";

const viewButtons: ReadonlyArray<{ value: ViewMode; label: string; Icon: typeof GridIcon }> = [
  { value: "grid", label: "Kart görünümü", Icon: GridIcon },
  { value: "list", label: "Liste görünümü", Icon: ListIcon },
];

function Toolbar() {
  const { filters, results, savedOnly, setSavedOnly, savedCount, navigate } = useArticles();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <p role="status" className="text-sm text-muted">
          Toplam {results.length} yazı
        </p>
        {/* Only offered once the visitor has saved something, so the default view stays uncluttered */}
        {(savedCount > 0 || savedOnly) && (
          <button
            type="button"
            aria-pressed={savedOnly}
            onClick={() => setSavedOnly(!savedOnly)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors",
              savedOnly ? "border-transparent bg-brand text-white" : "border-line bg-surface text-ink hover:border-brand/40",
            )}
          >
            <BookmarkFilledIcon className="h-3.5 w-3.5" />
            Kaydedilenler ({savedCount})
          </button>
        )}
      </div>

      <div role="group" aria-label="Görünüm" className="flex items-center gap-1.5">
        {viewButtons.map(({ value, label, Icon }) => {
          const active = filters.view === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              aria-label={label}
              title={label}
              onClick={() => navigate({ view: value, page: filters.page })}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
                active ? "border-transparent bg-brand text-white shadow-brand" : "border-line bg-surface text-muted hover:text-ink",
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EmptyState() {
  const { savedOnly, setSavedOnly, setQuery } = useArticles();

  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
      <p className="text-lg font-semibold text-ink">
        {savedOnly ? "Henüz kaydettiğin bir yazı yok." : "Aramana uygun yazı bulunamadı."}
      </p>
      <p className="mt-1 text-sm text-muted">
        {savedOnly ? "Bir yazının köşesindeki yer imi simgesine tıklayarak kaydedebilirsin." : "Farklı bir kelime dene ya da filtreleri temizle."}
      </p>
      <Link
        href="/yazilar"
        onClick={() => {
          setQuery("");
          setSavedOnly(false);
        }}
        className="mt-5 inline-flex h-10 items-center rounded-full bg-brand-gradient px-5 text-sm font-semibold text-white shadow-brand"
      >
        Filtreleri temizle
      </Link>
    </div>
  );
}

/** Toolbar + the page of results (cards or rows) + pager. */
export function ArticleResults() {
  const { filters, pageItems, page, totalPages, hrefFor } = useArticles();
  const isList = filters.view === "list";

  return (
    <section aria-label="Yazı listesi" className="min-w-0">
      <Toolbar />

      <div className="mt-4">
        {pageItems.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className={isList ? "grid grid-cols-1 gap-3.5" : articleGridClasses}>
            {pageItems.map((post) => (
              <li key={post.slug} className="flex">
                {isList ? <ArticleRow post={post} /> : <ArticleCard post={post} />}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} hrefFor={(target) => hrefFor({ page: target })} />
    </section>
  );
}
