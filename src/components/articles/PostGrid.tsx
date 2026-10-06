import type { PostSummary } from "@/content/types";
import { cn } from "@/lib/cn";
import { PostCard } from "./PostCard";

/** Responsive column recipes — full class names so Tailwind can see them. */
const layouts = {
  /** 1 → 2 → 3 → 4 columns (articles page) */
  wide: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  /** 1 → 2 → 3 columns (related posts under an article) */
  three: "sm:grid-cols-2 lg:grid-cols-3",
  /** Narrow showcase column on the home page: 1 → 2 → 4 columns with tighter gaps */
  compact: "sm:grid-cols-2 xl:grid-cols-4 xl:gap-3",
} as const;

export function PostGrid({
  posts,
  layout = "wide",
  className,
}: {
  posts: PostSummary[];
  layout?: keyof typeof layouts;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-5", layouts[layout], className)}>
      {posts.map((post) => (
        <li key={post.slug} className="flex">
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
