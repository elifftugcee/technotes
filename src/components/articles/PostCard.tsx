import Link from "next/link";
import type { PostSummary } from "@/content/types";
import { CategoryBadge } from "./CategoryBadge";
import { PostCover } from "./PostCover";
import { PostMeta } from "./PostMeta";

/** Whole card is clickable through the title link's stretched `::after` — one link for screen readers. */
export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-lg">
      <div className="relative aspect-[1.85/1] overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <PostCover post={post} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3.5 pb-3 pt-3">
        <CategoryBadge slug={post.category} />
        <h3 className="text-[0.85rem] font-bold leading-snug tracking-tight text-ink">
          <Link
            href={`/yazilar/${post.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-brand"
          >
            {post.title}
          </Link>
        </h3>
        <PostMeta date={post.date} readingTime={post.readingTime} compact className="mt-auto pt-2 text-muted" />
      </div>
    </article>
  );
}
