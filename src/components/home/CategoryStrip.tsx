import Link from "next/link";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Container } from "@/components/ui/Container";
import { ChevronRightIcon } from "@/components/ui/icons";
import { toneStyles } from "@/components/ui/tones";
import { categories } from "@/content/categories";
import { cn } from "@/lib/cn";
import { articlesHref } from "@/lib/article-filters";

/** Frosted strip of category shortcuts under the hero — each opens the articles page pre-filtered. */
export function CategoryStrip() {
  return (
    <section aria-label="Kategoriler" className="relative z-10 -mt-3">
      <Container size="wide">
        <ul className="grid gap-2.5 rounded-[1.75rem] border border-line bg-glass p-2.5 shadow-card backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <li key={category.slug} className="flex">
              <Link
                href={articlesHref({ category: category.slug })}
                className="group flex w-full items-center gap-3 rounded-2xl border border-line bg-surface/60 p-3.5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card"
              >
                <span
                  className={cn(
                    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    toneStyles[category.tone].tile,
                  )}
                >
                  <CategoryIcon name={category.icon} className="h-[1.35rem] w-[1.35rem]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.8125rem] font-bold tracking-tight text-ink">{category.name}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">{category.description}</span>
                </span>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-ink transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
