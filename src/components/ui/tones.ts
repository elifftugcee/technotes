import type { ToneName } from "@/content/categories";

/**
 * Colour recipes per tone. Full class names live here (not built dynamically) so
 * Tailwind can see them. Each works on light and dark surfaces.
 */
export const toneStyles: Record<ToneName, { tile: string; badge: string; badgeOnDark: string }> = {
  blue: {
    tile: "bg-blue-500/10 text-blue-600 dark:bg-blue-400/15 dark:text-blue-300",
    badge: "bg-blue-500/10 text-blue-700 dark:bg-blue-400/15 dark:text-blue-200",
    badgeOnDark: "bg-blue-200 text-blue-800",
  },
  sky: {
    tile: "bg-sky-500/10 text-sky-600 dark:bg-sky-400/15 dark:text-sky-300",
    badge: "bg-sky-500/10 text-sky-700 dark:bg-sky-400/15 dark:text-sky-200",
    badgeOnDark: "bg-sky-200 text-sky-800",
  },
  coral: {
    tile: "bg-rose-500/10 text-rose-500 dark:bg-rose-400/15 dark:text-rose-300",
    badge: "bg-rose-500/10 text-rose-600 dark:bg-rose-400/15 dark:text-rose-200",
    badgeOnDark: "bg-rose-200 text-rose-800",
  },
  green: {
    tile: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300",
    badge: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200",
    badgeOnDark: "bg-emerald-200 text-emerald-800",
  },
  teal: {
    tile: "bg-teal-500/10 text-teal-600 dark:bg-teal-400/15 dark:text-teal-300",
    badge: "bg-teal-500/10 text-teal-700 dark:bg-teal-400/15 dark:text-teal-200",
    badgeOnDark: "bg-teal-200 text-teal-800",
  },
  orange: {
    tile: "bg-orange-500/10 text-orange-500 dark:bg-orange-400/15 dark:text-orange-300",
    badge: "bg-orange-500/10 text-orange-600 dark:bg-orange-400/15 dark:text-orange-200",
    badgeOnDark: "bg-orange-200 text-orange-800",
  },
  violet: {
    tile: "bg-violet-500/10 text-violet-600 dark:bg-violet-400/15 dark:text-violet-300",
    badge: "bg-violet-500/10 text-violet-700 dark:bg-violet-400/15 dark:text-violet-200",
    badgeOnDark: "bg-violet-200 text-violet-800",
  },
};
