import Link from "next/link";
import { CameraIcon } from "@/components/ui/icons";
import { toneStyles } from "@/components/ui/tones";
import { aboutContent } from "@/content/about";
import { articlesHref } from "@/lib/article-filters";
import { cn } from "@/lib/cn";
import { CardHeading, interestIcons } from "./ui";

/** Six topic cards — each opens the articles page filtered to the matching category. */
export function InterestsSection() {
  const { title, items } = aboutContent.interests;

  return (
    <section aria-labelledby="ilgi-alanlarim">
      <CardHeading id="ilgi-alanlarim" icon={CameraIcon} tone="blue" title={title} />
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map(({ icon, tone, title: itemTitle, lines, category }) => {
          const Icon = interestIcons[icon];
          return (
            <li key={itemTitle} className="flex">
              <Link
                href={articlesHref({ category })}
                className="group flex w-full items-center gap-3 rounded-2xl border border-line bg-surface/70 p-3.5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card"
              >
                <span className={cn("inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", toneStyles[tone].tile)}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.8125rem] font-bold text-ink">{itemTitle}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">{lines.join(" ")}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
