export type CategoryTone = "blue" | "violet" | "turquoise" | "indigo" | "neutral";

export type Category = {
  slug: string;
  name: string;
  description: string;
  tone: CategoryTone;
};

export const categories: Category[] = [
  {
    slug: "ai-computer-vision",
    name: "AI & Computer Vision",
    description: "Yapay zeka ve bilgisayarlı görü üzerine notlar.",
    tone: "turquoise",
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    description: "Claude Code ile geliştirme deneyimleri.",
    tone: "violet",
  },
  {
    slug: "prompt-engineering",
    name: "Prompt Engineering",
    description: "Etkili prompt yazma teknikleri.",
    tone: "blue",
  },
  {
    slug: "software-development",
    name: "Software Development",
    description: "Yazılım geliştirme pratikleri.",
    tone: "indigo",
  },
  {
    slug: "learning-notes",
    name: "Learning Notes",
    description: "Öğrenme sürecinden notlar.",
    tone: "neutral",
  },
];
