import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { siteImages } from "@/content/images";
import { site } from "@/content/site";
import type { PostSummary } from "@/content/types";
import { CategoryBadge } from "./CategoryBadge";
import { PostMeta } from "./PostMeta";
import { ShareButtons } from "./ShareButtons";

/**
 * Article header: the workspace photo fills the banner, a deep-blue veil keeps the title, category and meta
 * readable on the left, and the AI workspace stays clear on the right. A post's own `coverImage`
 * (frontmatter) replaces the default photo.
 */
export function ArticleBanner({ post }: { post: PostSummary }) {
  return (
    <header className="relative isolate overflow-hidden rounded-3xl bg-[#07103a] text-white shadow-card-lg">
      {/* Photo: a strip above the text on phones, the full banner background from sm up */}
      <div className="relative h-44 sm:absolute sm:inset-0 sm:-z-20 sm:h-auto">
        <Image
          src={post.coverImage ?? siteImages.articleDetailHero.src}
          alt=""
          fill
          preload
          sizes="(min-width: 1536px) 1420px, 100vw"
          className="object-cover object-[86%_50%] sm:object-[62%_70%]"
        />
        {/* Veil: fades the strip into the text panel on phones; keeps the left-hand text readable from sm up */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07103a] via-[#07103a]/10 to-transparent sm:bg-gradient-to-r sm:from-[#07103a]/85 sm:via-[#07103a]/48 sm:to-transparent" />
      </div>

      <div className="relative flex max-w-[44rem] flex-col justify-end gap-3 p-6 pt-3 sm:min-h-[22rem] sm:max-w-[30rem] sm:p-9 md:max-w-[34rem] lg:min-h-[24rem] lg:max-w-[44rem]">
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
