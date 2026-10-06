import Link from "next/link";
import { CalendarIcon, ClockIcon } from "@/components/ui/icons";
import type { PostSummary } from "@/content/types";
import { formatDate, formatReadingTime } from "@/lib/format";
import { BookmarkButton } from "./BookmarkButton";
import { CategoryBadge } from "./CategoryBadge";
import { PostCover } from "./PostCover";

/** List-view counterpart of `ArticleCard`: cover on the left, text on the right. */
export function ArticleRow({ post }: { post: PostSummary }) {
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-card-lg sm:flex-row">
      <div className="relative aspect-cover shrink-0 overflow-hidden sm:aspect-auto sm:w-64 lg:w-72">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <PostCover post={post} sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 92vw" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <CategoryBadge slug={post.category} />
        <h3 className="text-lg font-bold leading-snug tracking-tight text-ink">
          <Link
            href={`/yazilar/${post.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-brand"
          >
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            {formatReadingTime(post.readingTime)}
          </span>
          <BookmarkButton slug={post.slug} title={post.title} className="-mr-1.5 ml-auto" />
        </div>
      </div>
    </article>
  );
}
