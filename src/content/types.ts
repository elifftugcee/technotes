/** Illustrated cover variants available in `components/art/covers`. */
export const coverKeys = [
  "claude-code",
  "prompt",
  "yolo",
  "iou-nms",
  "journey",
  "tech-stack",
  "claude-project",
  "prompt-templates",
] as const;
export type CoverKey = (typeof coverKeys)[number];

export type PostFrontmatter = {
  title: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  /** Category slug — must exist in `content/categories.ts` */
  category: string;
  excerpt: string;
  /** Reading time in minutes */
  readingTime: number;
  /** Built-in illustrated cover */
  cover: CoverKey;
  /** Optional real image under /public — takes precedence over `cover` */
  coverImage?: string;
  featured?: boolean;
  /** Topics shown under "İlgili Konular"; falls back to the category name */
  tags?: string[];
};

export type PostSummary = PostFrontmatter & { slug: string };
