"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { PostSummary } from "@/content/types";
import {
  applyFilters,
  articlesHref,
  countByCategory,
  paginate,
  parseFilters,
  type ArticleFilters,
} from "@/lib/article-filters";
import { useBookmarks } from "@/lib/bookmarks";

type ArticlesContextValue = {
  /** Effective filters: URL state plus the live search text */
  filters: ArticleFilters;
  query: string;
  setQuery: (query: string) => void;
  savedOnly: boolean;
  setSavedOnly: (savedOnly: boolean) => void;
  /** How many of the blog's posts the visitor has saved */
  savedCount: number;
  /** Everything that matches, across all pages */
  results: PostSummary[];
  /** Posts on the current page */
  pageItems: PostSummary[];
  page: number;
  totalPages: number;
  categoryCounts: Record<string, number>;
  totalPosts: number;
  /** `/yazilar` URL with the current filters changed by `patch` (resets to page 1 unless `page` is patched) */
  hrefFor: (patch: Partial<ArticleFilters>) => string;
  /** Apply a filter change by replacing the URL (no new history entry, no scroll jump) */
  navigate: (patch: Partial<ArticleFilters>) => void;
};

const ArticlesContext = createContext<ArticlesContextValue | null>(null);

export function useArticles(): ArticlesContextValue {
  const value = useContext(ArticlesContext);
  if (!value) throw new Error("useArticles must be used inside <ArticlesProvider>");
  return value;
}

/**
 * Holds the articles page's filter state. Category, sort, reading time, view and page live in the URL
 * (shareable, back-button friendly); the search text is local so typing never races with navigation.
 */
export function ArticlesProvider({ posts, children }: { posts: PostSummary[]; children: ReactNode }) {
  const router = useRouter();
  const urlFilters = parseFilters(useSearchParams());
  const { saved } = useBookmarks();

  // Follow `?q=` when it changes from outside (e.g. the header search) without clobbering typing
  const [query, setQuery] = useState(urlFilters.query);
  const [seenUrlQuery, setSeenUrlQuery] = useState(urlFilters.query);
  if (urlFilters.query !== seenUrlQuery) {
    setSeenUrlQuery(urlFilters.query);
    setQuery(urlFilters.query);
  }

  const [savedOnly, setSavedOnly] = useState(false);

  const filters: ArticleFilters = { ...urlFilters, query };
  const matches = applyFilters(posts, filters);
  const results = savedOnly ? matches.filter((post) => saved.includes(post.slug)) : matches;
  const { items: pageItems, page, totalPages } = paginate(results, filters.page);

  const hrefFor = (patch: Partial<ArticleFilters>) => articlesHref({ ...filters, page: 1, ...patch });

  const value: ArticlesContextValue = {
    filters,
    query,
    setQuery,
    savedOnly,
    setSavedOnly,
    savedCount: posts.filter((post) => saved.includes(post.slug)).length,
    results,
    pageItems,
    page,
    totalPages,
    categoryCounts: countByCategory(posts),
    totalPosts: posts.length,
    hrefFor,
    navigate: (patch) => router.replace(hrefFor(patch), { scroll: false }),
  };

  return <ArticlesContext value={value}>{children}</ArticlesContext>;
}
