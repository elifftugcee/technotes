"use client";

import { BookmarkFilledIcon, BookmarkIcon } from "@/components/ui/icons";
import { useBookmarks } from "@/lib/bookmarks";
import { cn } from "@/lib/cn";

/** Save / unsave a post (kept in localStorage). Sits above a card's stretched link. */
export function BookmarkButton({ slug, title, className }: { slug: string; title: string; className?: string }) {
  const { saved, toggle } = useBookmarks();
  const isSaved = saved.includes(slug);

  return (
    <button
      type="button"
      aria-pressed={isSaved}
      aria-label={isSaved ? `"${title}" yazısını kaydedilenlerden çıkar` : `"${title}" yazısını kaydet`}
      title={isSaved ? "Kaydedildi" : "Kaydet"}
      onClick={() => toggle(slug)}
      className={cn(
        "relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-surface-2",
        isSaved ? "text-brand" : "text-muted hover:text-ink",
        className,
      )}
    >
      {isSaved ? <BookmarkFilledIcon className="h-4 w-4" /> : <BookmarkIcon className="h-4 w-4" />}
    </button>
  );
}
