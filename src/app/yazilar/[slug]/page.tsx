import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crystal } from "@/components/art/hero/Crystals";
import { ArticleBanner } from "@/components/articles/ArticleBanner";
import { ArticleLeftSidebar, ArticleRightSidebar } from "@/components/articles/ArticleSidebars";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon, ChevronRightIcon, HomeIcon } from "@/components/ui/icons";
import { getCategory } from "@/content/categories";
import { articlesHref } from "@/lib/article-filters";
import { extractHeadings } from "@/lib/headings";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/yazilar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPostBySlug(slug);
  if (!entry) return {};
  return { title: entry.post.title, description: entry.post.excerpt };
}

function Breadcrumbs({ categorySlug, title }: { categorySlug: string; title: string }) {
  const category = getCategory(categorySlug);
  const linkClasses = "inline-flex items-center gap-1.5 hover:text-brand";

  return (
    <nav aria-label="Konum" className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
      <Link href="/" className={linkClasses}>
        <HomeIcon className="h-3.5 w-3.5" />
        Ana Sayfa
      </Link>
      <ChevronRightIcon className="h-3 w-3" />
      <Link href="/yazilar" className={linkClasses}>
        Yazılar
      </Link>
      {category && (
        <>
          <ChevronRightIcon className="h-3 w-3" />
          <Link href={articlesHref({ category: category.slug })} className={linkClasses}>
            {category.name}
          </Link>
        </>
      )}
      <ChevronRightIcon className="h-3 w-3" />
      <span aria-current="page" className="text-ink/70">
        {title}
      </span>
    </nav>
  );
}

export default async function ArticlePage({ params }: PageProps<"/yazilar/[slug]">) {
  const { slug } = await params;
  const entry = getPostBySlug(slug);
  if (!entry) notFound();

  const { post, content } = entry;
  const headings = extractHeadings(content);
  const topics = post.tags?.length ? post.tags : [getCategory(post.category)?.name ?? post.category];

  return (
    // overflow-x-clip (not hidden) keeps the sidebars' `position: sticky` working
    <div className="relative overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
        <Crystal className="left-3 top-[19rem] h-[48px] w-[40px] opacity-70" />
        <Crystal className="right-3 top-[26rem] h-[26px] w-[22px] opacity-70" delay={1.5} />
        <Crystal className="-left-4 bottom-24 h-[110px] w-[92px] opacity-80" delay={0.8} />
        <Crystal className="-right-3 bottom-8 h-[96px] w-[80px] opacity-80" delay={2.2} />
      </div>

      <Container size="wide" className="relative pb-20 pt-5">
        <Breadcrumbs categorySlug={post.category} title={post.title} />

        <div className="mt-4">
          <ArticleBanner post={post} />
        </div>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[16.5rem_minmax(0,1fr)_20rem]">
          <ArticleLeftSidebar headings={headings} topics={topics} />

          <article className="min-w-0">
            <MdxContent source={content} />
            <Link href="/yazilar" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
              <ArrowLeftIcon className="h-4 w-4" /> Tüm yazılara dön
            </Link>
          </article>

          <div className="lg:col-span-2 xl:col-span-1">
            <ArticleRightSidebar related={getRelatedPosts(post, 4)} />
          </div>
        </div>
      </Container>
    </div>
  );
}
