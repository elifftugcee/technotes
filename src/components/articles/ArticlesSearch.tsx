"use client";

import { CloseIcon, SearchIcon, SparklesIcon } from "@/components/ui/icons";
import { useArticles } from "./ArticlesProvider";

/** The hero's search box. Filters the list live as you type. */
export function ArticlesSearch() {
  const { query, setQuery } = useArticles();

  return (
    <form role="search" onSubmit={(event) => event.preventDefault()} className="relative max-w-[40rem]">
      <label htmlFor="article-search" className="sr-only">
        Yazılarda ara
      </label>
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-[1.1rem] w-[1.1rem] -translate-y-1/2 text-muted" />
      <input
        id="article-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Yazılarda ara... (ör. YOLO, Claude Code, prompt)"
        autoComplete="off"
        className="h-11 w-full rounded-xl border border-line bg-surface pl-11 pr-12 text-sm text-ink shadow-card outline-none placeholder:text-muted focus:border-brand/60 [&::-webkit-search-cancel-button]:hidden"
      />
      {query ? (
        <button
          type="button"
          aria-label="Aramayı temizle"
          onClick={() => setQuery("")}
          className="absolute right-2.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      ) : (
        <SparklesIcon className="pointer-events-none absolute right-4 top-1/2 h-[1.05rem] w-[1.05rem] -translate-y-1/2 text-brand/70" />
      )}
    </form>
  );
}
