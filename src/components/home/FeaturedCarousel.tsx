"use client";

import Link from "next/link";
import { useState } from "react";
import { CategoryBadge } from "@/components/articles/CategoryBadge";
import { PostCover } from "@/components/articles/PostCover";
import { PostMeta } from "@/components/articles/PostMeta";
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import type { PostSummary } from "@/content/types";

function ControlButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-card transition-[transform,border-color] hover:-translate-y-0.5 hover:border-brand/40 disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}

/** "Öne Çıkan Yazı": one big featured post with previous / next controls cycling through the featured posts. */
export function FeaturedCarousel({ posts }: { posts: PostSummary[] }) {
  const [index, setIndex] = useState(0);
  const post = posts[index];
  const step = (direction: 1 | -1) => setIndex((current) => (current + direction + posts.length) % posts.length);

  if (!post) return null;

  return (
    <div>
      <SectionHeading icon={StarIcon} tone="orange" title="Öne Çıkan Yazı">
        <div className="flex items-center gap-2">
          <ControlButton label="Önceki öne çıkan yazı" onClick={() => step(-1)} disabled={posts.length < 2}>
            <ArrowLeftIcon className="h-4 w-4" />
          </ControlButton>
          <ControlButton label="Sonraki öne çıkan yazı" onClick={() => step(1)} disabled={posts.length < 2}>
            <ArrowRightIcon className="h-4 w-4" />
          </ControlButton>
        </div>
      </SectionHeading>

      <div aria-roledescription="carousel" aria-label="Öne çıkan yazılar" aria-live="polite" className="mt-4">
        <article
          key={post.slug}
          aria-roledescription="slide"
          aria-label={`${index + 1} / ${posts.length}`}
          className="group relative isolate flex animate-slide-in flex-col overflow-hidden rounded-2xl bg-[#050a2a] shadow-card-lg sm:aspect-[2.4/1] sm:flex-row xl:aspect-cover"
        >
          {/* Phones: the cover on its own above the text. From sm: the cover fills the card and the text sits on its left. */}
          <div className="relative aspect-cover overflow-hidden sm:absolute sm:inset-0 sm:-z-20 sm:aspect-auto">
            <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]">
              <PostCover post={post} sizes="(min-width: 1280px) 36vw, (min-width: 640px) 92vw, 100vw" />
            </div>
          </div>
          {/* Light veil only where the text is, so the rest of the picture keeps its own colours */}
          <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#050a2a]/80 via-[#050a2a]/25 via-50% to-transparent sm:block" />

          <div className="relative flex w-full flex-col justify-end gap-2.5 p-5 text-white sm:max-w-[16rem] lg:max-w-[20rem] xl:max-w-[13.5rem] xl:gap-2">
            <CategoryBadge slug={post.category} variant="onDark" />
            <h3 className="text-[1.375rem] font-extrabold leading-[1.15] tracking-tight xl:text-[1.125rem]">
              <Link
                href={`/yazilar/${post.slug}`}
                className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-white"
              >
                {post.title}
              </Link>
            </h3>
            <p className="line-clamp-3 text-[0.8125rem] leading-relaxed text-white/80 xl:line-clamp-2 xl:text-xs">{post.excerpt}</p>
            <div className="mt-1 flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white ring-2 ring-white/30"
              >
                {site.author.initials}
              </span>
              <PostMeta date={post.date} readingTime={post.readingTime} showIcon={false} className="text-white/80" />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
