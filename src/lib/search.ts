import { getCategory } from "@/content/categories";
import type { PostSummary } from "@/content/types";

/** The few fields the client-side search needs. */
export type SearchEntry = Pick<PostSummary, "slug" | "title" | "category" | "excerpt">;

/** Lower-case + strip diacritics so "gorusu" finds "görüşü" and "IOU" finds "IoU". */
export function normalize(text: string): string {
  return text
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i");
}

export function matchesQuery(entry: SearchEntry, query: string): boolean {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const haystack = normalize(
    `${entry.title} ${entry.excerpt} ${getCategory(entry.category)?.name ?? ""}`,
  );
  return tokens.every((token) => haystack.includes(token));
}
