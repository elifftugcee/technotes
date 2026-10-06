import { getCategory } from "@/content/categories";
import type { PostSummary } from "@/content/types";
import { matchesQuery } from "./search";

export const PAGE_SIZE = 8;

export const sortOptions = [
  { value: "yeni", label: "En Yeni" },
  { value: "eski", label: "En Eski" },
  { value: "kisa", label: "Okuma Süresi: Kısa" },
  { value: "uzun", label: "Okuma Süresi: Uzun" },
] as const;
export type SortKey = (typeof sortOptions)[number]["value"];

export type DurationKey = "kisa" | "orta" | "uzun" | "cok-uzun";
export const durationOptions: ReadonlyArray<{
  value: DurationKey;
  label: string;
  matches: (minutes: number) => boolean;
}> = [
  { value: "kisa", label: "5 dakikadan kısa", matches: (minutes) => minutes < 5 },
  { value: "orta", label: "5–10 dakika", matches: (minutes) => minutes >= 5 && minutes <= 10 },
  { value: "uzun", label: "10–20 dakika", matches: (minutes) => minutes > 10 && minutes <= 20 },
  { value: "cok-uzun", label: "20+ dakika", matches: (minutes) => minutes > 20 },
];

export type ViewMode = "grid" | "list";

export type ArticleFilters = {
  query: string;
  /** Category slug, "" for all */
  category: string;
  sort: SortKey;
  durations: DurationKey[];
  view: ViewMode;
  /** 1-based */
  page: number;
};

export const defaultFilters: ArticleFilters = {
  query: "",
  category: "",
  sort: "yeni",
  durations: [],
  view: "grid",
  page: 1,
};

type ParamReader = { get(name: string): string | null };

/** Reads filters from the URL; anything unknown or malformed falls back to its default. */
export function parseFilters(params: ParamReader): ArticleFilters {
  const category = params.get("kategori") ?? "";
  const sort = params.get("sirala");
  const page = Number.parseInt(params.get("sayfa") ?? "", 10);
  const validDurations = new Set<string>(durationOptions.map((option) => option.value));

  return {
    query: params.get("q") ?? "",
    category: getCategory(category) ? category : "",
    sort: sortOptions.some((option) => option.value === sort) ? (sort as SortKey) : defaultFilters.sort,
    durations: (params.get("sure") ?? "")
      .split(",")
      .filter((value): value is DurationKey => validDurations.has(value)),
    view: params.get("gorunum") === "liste" ? "list" : "grid",
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

/** Builds the `/yazilar` URL for a set of filters, leaving defaults out so URLs stay short. */
export function articlesHref(filters: Partial<ArticleFilters> = {}): string {
  const { query, category, sort, durations, view, page } = { ...defaultFilters, ...filters };
  const params = new URLSearchParams();

  if (query.trim()) params.set("q", query.trim());
  if (category) params.set("kategori", category);
  if (sort !== defaultFilters.sort) params.set("sirala", sort);
  if (durations.length > 0) params.set("sure", durations.join(","));
  if (view === "list") params.set("gorunum", "liste");
  if (page > 1) params.set("sayfa", String(page));

  const queryString = params.toString();
  return queryString ? `/yazilar?${queryString}` : "/yazilar";
}

const comparators: Record<SortKey, (a: PostSummary, b: PostSummary) => number> = {
  yeni: (a, b) => b.date.localeCompare(a.date),
  eski: (a, b) => a.date.localeCompare(b.date),
  kisa: (a, b) => a.readingTime - b.readingTime || b.date.localeCompare(a.date),
  uzun: (a, b) => b.readingTime - a.readingTime || b.date.localeCompare(a.date),
};

export function applyFilters(posts: PostSummary[], { query, category, sort, durations }: ArticleFilters): PostSummary[] {
  const selectedDurations = durationOptions.filter((option) => durations.includes(option.value));

  return posts
    .filter((post) => !category || post.category === category)
    .filter(
      (post) => selectedDurations.length === 0 || selectedDurations.some((option) => option.matches(post.readingTime)),
    )
    .filter((post) => matchesQuery(post, query))
    .sort(comparators[sort]);
}

export function paginate<T>(items: T[], requestedPage: number, pageSize: number = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  return { items: items.slice((page - 1) * pageSize, page * pageSize), page, totalPages };
}

export function countByCategory(posts: PostSummary[]): Record<string, number> {
  return posts.reduce<Record<string, number>>((counts, post) => {
    counts[post.category] = (counts[post.category] ?? 0) + 1;
    return counts;
  }, {});
}

/** Page numbers to show in the pager, with `null` standing for an ellipsis: 1 … 4 5 6 … 12 */
export function pageWindow(page: number, totalPages: number): Array<number | null> {
  const wanted = new Set([1, totalPages, page - 1, page, page + 1]);
  const pages = [...wanted].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);

  return pages.flatMap((n, index) => (index > 0 && n - pages[index - 1] > 1 ? [null, n] : [n]));
}
