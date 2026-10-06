"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "technotes-bookmarks";
const CHANGE_EVENT = "technotes:bookmarks";

const EMPTY: readonly string[] = [];
let cachedRaw: string | null = null;
let cachedValue: readonly string[] = EMPTY;

function readRaw(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

/** Parsed list, memoised on the raw string so `useSyncExternalStore` gets a stable reference. */
function getSnapshot(): readonly string[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      cachedValue = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : EMPTY;
    } catch {
      cachedValue = EMPTY;
    }
  }
  return cachedValue;
}

const getServerSnapshot = (): readonly string[] => EMPTY;

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange); // other tabs
  window.addEventListener(CHANGE_EVENT, onChange); // this tab
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/** Saved ("kaydet") posts, persisted in localStorage and shared across components and tabs. */
export function useBookmarks() {
  const saved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((slug: string) => {
    const current = getSnapshot();
    const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable (private mode) — nothing to persist */
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { saved, toggle } as const;
}
