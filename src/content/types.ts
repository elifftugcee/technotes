export type PostFrontmatter = {
  title: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  /** Category slug — must exist in `content/categories.ts` */
  category: string;
  excerpt: string;
  /** Reading time in minutes */
  readingTime: number;
  /**
   * The post's single cover image, a path under /public (e.g. "/images/posts/<slug>.webp").
   * Every surface — home cards, the featured card, the articles list, related posts and the
   * article banner — renders this one value through `PostCover`.
   */
  coverImage: string;
  /**
   * Optional CSS `object-position` for the cover ("50% 50%" by default), as "x%" or "x% y%".
   * Use it to keep a picture's important area in frame when a surface crops it.
   */
  coverPosition?: string;
  featured?: boolean;
  /** Topics shown under "İlgili Konular"; falls back to the category name */
  tags?: string[];
};

export type PostSummary = PostFrontmatter & { slug: string };
