export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "ai-computer-vision",
    name: "AI & Computer Vision",
    description: "Yapay zeka ve bilgisayarlı görü üzerine notlar.",
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    description: "Claude Code ile geliştirme deneyimleri.",
  },
  {
    slug: "prompt-engineering",
    name: "Prompt Engineering",
    description: "Etkili prompt yazma teknikleri.",
  },
  {
    slug: "software-development",
    name: "Software Development",
    description: "Yazılım geliştirme pratikleri.",
  },
  {
    slug: "learning-notes",
    name: "Learning Notes",
    description: "Öğrenme sürecinden notlar.",
  },
];
