"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { getCategory } from "@/content/categories";
import { cn } from "@/lib/cn";
import { articlesHref } from "@/lib/article-filters";
import { matchesQuery, type SearchEntry } from "@/lib/search";
import { SearchIcon } from "@/components/ui/icons";

const MAX_SUGGESTIONS = 5;

const subscribeNoop = () => () => {};
const detectMac = () => /Mac|iPhone|iPad/i.test(navigator.platform);

type SearchBoxProps = {
  entries: SearchEntry[];
  /** Register the global ⌘K / Ctrl+K shortcut (only one instance per page should) */
  enableShortcut?: boolean;
  onNavigate?: () => void;
  className?: string;
};

/**
 * Header search: live suggestions while typing, Enter opens the highlighted article
 * (or the full search results page), ⌘K / Ctrl+K focuses the field from anywhere.
 */
export function SearchBox({ entries, enableShortcut = false, onNavigate, className }: SearchBoxProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const isMac = useSyncExternalStore(subscribeNoop, detectMac, () => true);

  const suggestions = useMemo(
    () => (query.trim() ? entries.filter((entry) => matchesQuery(entry, query)).slice(0, MAX_SUGGESTIONS) : []),
    [entries, query],
  );
  const showPanel = open && query.trim().length > 0;

  useEffect(() => {
    if (!enableShortcut) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enableShortcut]);

  const close = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  /** Reset the field once a result was chosen (the navigation itself is done by <Link> or `go`). */
  const finish = () => {
    setQuery("");
    close();
    inputRef.current?.blur();
    onNavigate?.();
  };

  const go = (href: string) => {
    router.push(href);
    finish();
  };

  const submit = () => {
    const active = suggestions[activeIndex];
    go(active ? `/yazilar/${active.slug}` : articlesHref({ query }));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (suggestions.length === 0) return;
      event.preventDefault();
      setOpen(true);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => (current + step + suggestions.length) % suggestions.length);
    } else if (event.key === "Escape") {
      close();
      inputRef.current?.blur();
    }
  };

  return (
    <div
      className={cn("relative", className)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        className="flex h-11 items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 shadow-card transition-colors focus-within:border-brand/60"
      >
        <SearchIcon className="h-[1.1rem] w-[1.1rem] shrink-0 text-muted" />
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={query}
          placeholder="Yazılarda ara..."
          autoComplete="off"
          aria-label="Yazılarda ara"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
        />
        {enableShortcut && (
          <kbd
            aria-hidden="true"
            className="hidden shrink-0 rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[0.7rem] font-medium text-muted xl:inline-block"
          >
            {isMac ? "⌘ K" : "Ctrl K"}
          </kbd>
        )}
      </form>

      {showPanel && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Arama önerileri"
          className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-surface p-1.5 shadow-card-lg"
        >
          {suggestions.map((entry, index) => (
            <li
              key={entry.slug}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              // keep focus in the input so the blur handler doesn't swallow the click
              onMouseDown={(event) => event.preventDefault()}
            >
              <Link
                href={`/yazilar/${entry.slug}`}
                onClick={finish}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm",
                  index === activeIndex ? "bg-surface-2" : "hover:bg-surface-2",
                )}
              >
                <span className="block font-medium text-ink">{entry.title}</span>
                <span className="block text-xs text-muted">{getCategory(entry.category)?.name}</span>
              </Link>
            </li>
          ))}
          <li role="presentation" onMouseDown={(event) => event.preventDefault()}>
            <button
              type="button"
              onClick={() => go(articlesHref({ query }))}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-brand hover:bg-surface-2"
            >
              {suggestions.length === 0 ? "Sonuç bulunamadı — tüm yazılarda ara" : "Tüm sonuçları gör"} →
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
