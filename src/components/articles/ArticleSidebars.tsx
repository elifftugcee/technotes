import Link from "next/link";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { ArrowDownIcon, MailIcon } from "@/components/ui/icons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { site } from "@/content/site";
import type { PostSummary } from "@/content/types";
import { articlesHref } from "@/lib/article-filters";
import type { Heading } from "@/lib/headings";
import { CategoryBadge } from "./CategoryBadge";
import { PostCover } from "./PostCover";
import { PostMeta } from "./PostMeta";
import { TableOfContents } from "./TableOfContents";

const cardClasses = "rounded-2xl border border-line bg-glass p-5 shadow-card backdrop-blur-xl";
const cardTitleClasses = "text-[0.9375rem] font-bold tracking-tight text-ink";

/** Left column: table of contents, related topics and the site's motto. */
export function ArticleLeftSidebar({ headings, topics }: { headings: Heading[]; topics: string[] }) {
  return (
    <aside aria-label="Yazı rehberi" className="space-y-4 lg:sticky lg:top-20 lg:self-start">
      {headings.length > 0 && (
        <>
          {/* below lg the contents fold into a disclosure so they don't push the article down */}
          <details className={`${cardClasses} lg:hidden`}>
            <summary className={`${cardTitleClasses} cursor-pointer`}>Bu Yazıda Neler Var?</summary>
            <TableOfContents headings={headings} className="mt-3" />
          </details>
          <nav aria-label="Bu yazıda neler var?" className={`${cardClasses} hidden lg:block`}>
            <h2 className={cardTitleClasses}>Bu Yazıda Neler Var?</h2>
            <TableOfContents headings={headings} className="mt-3" />
          </nav>
        </>
      )}

      <section aria-labelledby="ilgili-konular" className={cardClasses}>
        <h2 id="ilgili-konular" className={cardTitleClasses}>
          İlgili Konular
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <li key={topic}>
              <Link
                href={articlesHref({ query: topic })}
                className="inline-flex h-7 items-center rounded-lg bg-brand/10 px-3 text-xs font-medium text-brand transition-colors hover:bg-brand/20"
              >
                {topic}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <figure className="hidden items-center gap-3 rounded-2xl border border-line bg-brand/5 p-4 lg:flex">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <ArrowDownIcon className="h-5 w-5" />
        </span>
        <blockquote className="text-sm font-medium leading-snug text-ink">“{site.tagline}”</blockquote>
      </figure>
    </aside>
  );
}

function AuthorCard() {
  const { author } = site;
  return (
    <section aria-labelledby="yazar-hakkinda" className={cardClasses}>
      <h2 id="yazar-hakkinda" className={cardTitleClasses}>
        Yazar Hakkında
      </h2>
      <div className="mt-4 flex items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink text-2xl font-bold text-canvas"
        >
          {author.initials}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-ink">{author.name}</p>
          <p className="text-xs text-muted">{author.role}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">{author.bio}</p>
        </div>
      </div>
      <SocialLinks size="sm" className="mt-4" />
    </section>
  );
}

function RelatedPosts({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="benzer-yazilar" className={cardClasses}>
      <h2 id="benzer-yazilar" className={cardTitleClasses}>
        Benzer Yazılar
      </h2>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="group relative flex gap-3">
            <div className="relative h-[3.25rem] w-[5.5rem] shrink-0 overflow-hidden rounded-lg">
              <PostCover post={post} sizes="88px" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[0.8125rem] font-bold leading-snug text-ink">
                <Link
                  href={`/yazilar/${post.slug}`}
                  className="after:absolute after:inset-0 group-hover:text-brand focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-brand"
                >
                  {post.title}
                </Link>
              </h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <CategoryBadge slug={post.category} />
                <PostMeta date={post.date} readingTime={post.readingTime} showDate={false} compact />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function NewsletterCard() {
  return (
    <section aria-labelledby="bulten-karti" className={cardClasses}>
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <MailIcon className="h-5 w-5" />
        </span>
        <div>
          <h2 id="bulten-karti" className="text-sm font-bold text-ink">
            Yeni yazılardan haberdar ol!
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Teknik içerikler, projeler ve öğrenme notları doğrudan e-posta kutuna gelsin.
          </p>
        </div>
      </div>
      <NewsletterForm variant="light" className="mt-4" />
    </section>
  );
}

/** Right column: author, related posts and a compact newsletter signup. */
export function ArticleRightSidebar({ related }: { related: PostSummary[] }) {
  return (
    <aside aria-label="Yazar ve ilgili içerikler" className="grid gap-4 md:grid-cols-2 xl:block xl:space-y-4">
      <AuthorCard />
      <RelatedPosts posts={related} />
      <div className="md:col-span-2 xl:col-span-1">
        <NewsletterCard />
      </div>
    </aside>
  );
}
