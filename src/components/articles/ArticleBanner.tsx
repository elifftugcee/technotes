import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import type { PostSummary } from "@/content/types";
import { CategoryBadge } from "./CategoryBadge";
import { PostCover } from "./PostCover";
import { PostMeta } from "./PostMeta";
import { ShareButtons } from "./ShareButtons";

/**
 * Article header: the post's cover (the very same `coverImage` its cards show) beside a deep-blue text panel.
 * The picture sits on its own, with no text or veil on top, so nothing in it is hidden or recoloured.
 * - xl and up: text panel on the left, cover on the right (wide enough that the cover stays ~2:1).
 * - below xl: cover on top (same 2:1 ratio as the cards), text underneath — side by side it would squeeze
 *   the cover and crop its left/right edges.
 */
export function ArticleBanner({ post }: { post: PostSummary }) {
  return (
    <header className="relative isolate overflow-hidden rounded-3xl bg-[#07103a] text-white shadow-card-lg ring-1 ring-white/10 xl:grid xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="relative aspect-cover xl:col-start-2 xl:row-start-1 xl:self-stretch">
        <PostCover
          post={post}
          preload
          sizes="(min-width: 1536px) 830px, (min-width: 1280px) 58vw, 100vw"
        />
      </div>

      <div className="flex flex-col justify-center gap-3.5 bg-[radial-gradient(circle_at_0%_100%,rgb(99_102_241/0.3),transparent_62%)] p-6 sm:p-8 xl:col-start-1 xl:row-start-1 xl:p-9">
        <CategoryBadge slug={post.category} variant="onDark" />
        <h1 className="text-[clamp(1.6rem,2.5vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">{post.title}</h1>
        <p className="max-w-[36rem] text-[0.9375rem] leading-relaxed text-white/85">{post.excerpt}</p>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-sm font-bold"
            >
              {site.author.initials}
            </span>
            <span className="text-xs font-semibold">{site.author.name}</span>
          </span>
          <PostMeta date={post.date} readingTime={post.readingTime} className="text-white/80" />
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <ShareButtons title={post.title} />
          <div className="hidden sm:block">
            <Button href="/yazilar" variant="light" className="h-10">
              Tüm Yazıları Gör <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
