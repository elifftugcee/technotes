import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CalendarIcon, ClockIcon } from "@/components/ui/icons";
import { getCategory } from "@/content/categories";
import type { PostSummary } from "@/content/types";
import { formatDate, formatReadingTime } from "@/lib/format";
import { BookmarkButton } from "./BookmarkButton";
import { PostCover } from "./PostCover";

/** Category pill that straddles the bottom edge of a cover. The solid backing keeps the tint readable. */
function CoverBadge({ categorySlug }: { categorySlug: string }) {
  const category = getCategory(categorySlug);
  if (!category) return null;
  return (
    <span className="inline-flex rounded-full bg-surface shadow-card">
      <Badge tone={category.badgeTone}>{category.name}</Badge>
    </span>
  );
}

/** Grid card for the articles page: cover, category pill, title, excerpt and a meta row with a bookmark. */
export function ArticleCard({ post }: { post: PostSummary }) {
  return (
    <article className="group relative flex w-full flex-col rounded-2xl border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-lg">
      <div className="relative">
        <div className="relative aspect-cover overflow-hidden rounded-t-2xl">
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
            <PostCover post={post} sizes="(min-width: 1280px) 24vw, (min-width: 640px) 45vw, 92vw" />
          </div>
        </div>
        <div className="absolute -bottom-3 left-3 z-10">
          <CoverBadge categorySlug={post.category} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-3 pt-6">
        <h3 className="text-[0.95rem] font-bold leading-snug tracking-tight text-ink">
          <Link
            href={`/yazilar/${post.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-brand"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">{post.excerpt}</p>

        <div className="mt-auto flex items-center gap-3 pt-4 text-[0.6875rem] text-muted">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <CalendarIcon className="h-3.5 w-3.5" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <ClockIcon className="h-3.5 w-3.5" />
            {formatReadingTime(post.readingTime)}
          </span>
          <BookmarkButton slug={post.slug} title={post.title} className="-mr-1.5 ml-auto" />
        </div>
      </div>
    </article>
  );
}
