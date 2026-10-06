import Image from "next/image";
import { CoverArt } from "@/components/art/CoverArt";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import type { PostSummary } from "@/content/types";
import { CategoryBadge } from "./CategoryBadge";
import { PostMeta } from "./PostMeta";
import { ShareButtons } from "./ShareButtons";

/**
 * Article header: cover art on the right fading into a deep-blue panel, title and meta on the left.
 * A real `coverImage` (frontmatter) fills the whole banner instead of the illustration.
 */
export function ArticleBanner({ post }: { post: PostSummary }) {
  return (
    <header className="relative isolate overflow-hidden rounded-3xl bg-[#07103a] text-white shadow-card-lg">
      {post.coverImage ? (
        <Image src={post.coverImage} alt="" fill priority sizes="(min-width: 1536px) 1420px, 100vw" className="-z-20 object-cover" />
      ) : (
        <div className="absolute inset-y-0 right-0 -z-20 w-full sm:w-[64%] sm:[mask-image:linear-gradient(to_right,transparent_0,#000_38%)]">
          <CoverArt cover={post.cover} />
        </div>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07103a] via-[#07103a]/75 to-transparent sm:via-[#07103a]/55" />

      <div className="flex min-h-[18rem] max-w-[44rem] flex-col justify-end gap-3 p-6 sm:min-h-[19rem] sm:p-9">
        <CategoryBadge slug={post.category} variant="onDark" />
        <h1 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">{post.title}</h1>
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
          <span aria-hidden="true" className="hidden h-5 w-px bg-white/25 sm:block" />
          <ShareButtons title={post.title} />
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden sm:block">
        <Button href="/yazilar" variant="light" className="h-11">
          Tüm Yazıları Gör <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
