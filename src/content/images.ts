export type SiteImage = {
  /** Path under /public */
  src: string;
  /** Intrinsic size in pixels (used for aspect ratios; the files are served through next/image) */
  width: number;
  height: number;
};

/** Page-level photographs. Swap a file in /public/images (keeping its name) to change it everywhere. */
export const siteImages = {
  /** Home hero background — open sky on the left for the headline, the AI workspace on the right. */
  homeHero: { src: "/images/home-hero.webp", width: 1672, height: 941 },

  /** Alternative home hero, kept for a later side-by-side comparison. Not used on any page yet. */
  homeHeroAlternative: { src: "/images/home-hero-alternative.webp", width: 1672, height: 941 },

  /** Default banner of every article page (a post's own `coverImage` takes precedence). */
  articleDetailHero: { src: "/images/article-detail-hero.webp", width: 1942, height: 809 },

  /** Top background of the About page. */
  aboutHero: { src: "/images/about-hero.webp", width: 1944, height: 809 },

  /** Night-lake background of the newsletter band. */
  newsletterBackground: { src: "/images/newsletter-background.webp", width: 1944, height: 809 },
} as const satisfies Record<string, SiteImage>;
