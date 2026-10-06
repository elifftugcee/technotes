import Image from "next/image";
import type { PostSummary } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * The one place a post's cover is rendered. Every surface (home cards, the featured card, the articles
 * grid/list, related posts, the article banner) goes through here, so they all show the same
 * `coverImage` from the post's frontmatter, cropped with the same `coverPosition`.
 *
 * Fills its parent: the parent must be `relative` and have a size (usually `aspect-cover`).
 * The picture is decorative — the post title is always next to it — hence the empty alt.
 */
export function PostCover({
  post,
  sizes,
  preload = false,
  className,
}: {
  post: Pick<PostSummary, "coverImage" | "coverPosition">;
  sizes: string;
  /** Only for the cover that is the page's largest above-the-fold image */
  preload?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={post.coverImage}
      alt=""
      fill
      sizes={sizes}
      preload={preload}
      className={cn("object-cover", className)}
      style={post.coverPosition ? { objectPosition: post.coverPosition } : undefined}
    />
  );
}
