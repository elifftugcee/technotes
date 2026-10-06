import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleResults } from "@/components/articles/ArticleResults";
import { ArticlesHero } from "@/components/articles/ArticlesHero";
import { ArticlesProvider } from "@/components/articles/ArticlesProvider";
import { ArticlesSearch } from "@/components/articles/ArticlesSearch";
import { CategoryChips } from "@/components/articles/CategoryChips";
import { FilterSidebar } from "@/components/articles/FilterSidebar";
import { articleGridClasses } from "@/components/articles/grid";
import { Container } from "@/components/ui/Container";
import { PAGE_SIZE } from "@/lib/article-filters";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Yazılar",
  description: "Yapay zeka, bilgisayar görüşü, prompt engineering, Claude Code ve yazılım geliştirme yazılarının tamamı.",
};

const layoutClasses = "grid grid-cols-[minmax(0,1fr)] gap-6 pb-20 pt-2 lg:grid-cols-[16.5rem_minmax(0,1fr)]";

export default function ArticlesPage() {
  const posts = getAllPosts();

  return (
    // useSearchParams (inside the provider) needs a Suspense boundary. The fallback is the same page
    // with the newest posts and an empty sidebar slot, so the static HTML is useful and nothing jumps.
    <Suspense
      fallback={
        <>
          <ArticlesHero />
          <Container size="wide" className={layoutClasses}>
            <div aria-hidden="true" className="hidden h-96 rounded-2xl border border-line bg-glass lg:block" />
            <ul className={articleGridClasses}>
              {posts.slice(0, PAGE_SIZE).map((post) => (
                <li key={post.slug} className="flex">
                  <ArticleCard post={post} />
                </li>
              ))}
            </ul>
          </Container>
        </>
      }
    >
      <ArticlesProvider posts={posts}>
        <ArticlesHero>
          <ArticlesSearch />
          <CategoryChips />
        </ArticlesHero>
        <Container size="wide" className={layoutClasses}>
          <FilterSidebar />
          <ArticleResults />
        </Container>
      </ArticlesProvider>
    </Suspense>
  );
}
