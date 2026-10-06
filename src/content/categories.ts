export type ToneName = "blue" | "sky" | "coral" | "green" | "orange" | "violet" | "teal";

export type CategoryIconName = "vision" | "claude" | "prompt" | "code" | "book";

export type Category = {
  slug: string;
  name: string;
  /** Short two-line blurb used on cards */
  description: string;
  icon: CategoryIconName;
  /** Colour of the icon tile */
  tone: ToneName;
  /** Colour of the badge pill shown on article cards */
  badgeTone: ToneName;
};

export const categories: Category[] = [
  {
    slug: "ai-computer-vision",
    name: "AI & Computer Vision",
    description: "Yapay zeka ve bilgisayar görüşü üzerine içerikler",
    icon: "vision",
    tone: "blue",
    badgeTone: "teal",
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    description: "Claude Code kullanımı ve pratik örnekler",
    icon: "claude",
    tone: "coral",
    badgeTone: "violet",
  },
  {
    slug: "prompt-engineering",
    name: "Prompt Engineering",
    description: "Daha iyi promptlar yazma teknikleri",
    icon: "prompt",
    tone: "sky",
    badgeTone: "sky",
  },
  {
    slug: "software-development",
    name: "Software Development",
    description: "Yazılım geliştirme, araçlar ve good practices",
    icon: "code",
    tone: "green",
    badgeTone: "green",
  },
  {
    slug: "learning-notes",
    name: "Learning Notes",
    description: "Öğrenme sürecimden notlar ve deneyimler",
    icon: "book",
    tone: "orange",
    badgeTone: "orange",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
