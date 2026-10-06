import Image from "next/image";
import { CoverArt } from "@/components/art/CoverArt";
import type { PostSummary } from "@/content/types";

/**
 * Renders a post's cover: the real image when `coverImage` is set in the frontmatter,
 * otherwise the built-in illustration. Fills its (relatively positioned) parent.
 */
export function PostCover({ post, sizes }: { post: Pick<PostSummary, "title" | "cover" | "coverImage">; sizes: string }) {
  if (post.coverImage) {
    return <Image src={post.coverImage} alt="" fill sizes={sizes} className="object-cover" />;
  }
  return <CoverArt cover={post.cover} />;
}
