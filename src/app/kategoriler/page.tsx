import type { Metadata } from "next";
import Link from "next/link";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { toneStyles } from "@/components/ui/tones";
import { categories } from "@/content/categories";
import { cn } from "@/lib/cn";
import { getAllPosts } from "@/lib/posts";
import { articlesHref } from "@/lib/article-filters";

export const metadata: Metadata = {
  title: "Kategoriler",
  description: "Konu başlığına göre yazıları keşfet.",
};

export default function CategoriesPage() {
  const posts = getAllPosts();
  const countFor = (slug: string) => posts.filter((post) => post.category === slug).length;

  return (
    <Container className="pb-20 pt-10 lg:pt-14">
      <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">Kategoriler</h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">Konu başlığına göre yazıları keşfet.</p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const count = countFor(category.slug);
          return (
            <li key={category.slug} className="flex">
              <Link
                href={articlesHref({ category: category.slug })}
                className="group flex w-full flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-lg"
              >
                <span
                  className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl", toneStyles[category.tone].tile)}
                >
                  <CategoryIcon name={category.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-lg font-bold tracking-tight text-ink">{category.name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{category.description}</span>
                </span>
                <span className="mt-auto flex items-center justify-between text-sm">
                  <span className="text-muted">{count} yazı</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
                    Yazıları gör <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
