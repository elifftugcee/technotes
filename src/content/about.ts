import type { ToneName } from "./categories";

export type InterestIcon = "chip" | "eye" | "claude" | "chat" | "settings" | "note";

/** Copy for the About page — edit freely; the page layout does not need to change. */
export const aboutContent = {
  hero: {
    eyebrow: "Hakkımda",
    greeting: "Merhaba, ben",
    description:
      "Yapay zeka, bilgisayar görüşü, prompt engineering ve yazılım geliştirme üzerine öğrenmeyi, üretmeyi ve paylaşmayı seven bir yazılım geliştiriciyim.",
  },

  whoAmI: {
    title: "Ben Kimim?",
    paragraphs: [
      "Bilgisayar bilimleri ve yapay zeka teknolojilerine derin bir ilgi duyan, sürekli öğrenmeyi hedefleyen bir yazılım geliştiriciyim. Bu blogda, öğrendiğim bilgileri, deneyimlerimi ve projelerimi paylaşarak hem kendim için bir öğrenme günlüğü tutuyor hem de benzer ilgi alanlarına sahip kişilere faydalı olmayı amaçlıyorum.",
      "Teknolojinin, insan hayatını daha iyi bir hale getirebileceğine inanıyorum. Bu motivasyonla, özellikle yapay zeka ve bilgisayar görüşü alanlarında kendimi geliştiriyor ve öğrendiklerimi burada dokümante ediyorum.",
    ],
  },

  /** Each interest opens the articles page filtered to `category` */
  interests: {
    title: "İlgi Alanlarım",
    items: [
      { icon: "chip", tone: "blue", title: "Yapay Zeka", lines: ["LLM'ler, Multimodal AI,", "Generative AI"], category: "ai-computer-vision" },
      { icon: "eye", tone: "violet", title: "Bilgisayar Görüşü", lines: ["Object Detection,", "Image Processing"], category: "ai-computer-vision" },
      { icon: "claude", tone: "coral", title: "Claude Code", lines: ["AI Destekli Geliştirme", "Araçları"], category: "claude-code" },
      { icon: "chat", tone: "teal", title: "Prompt Engineering", lines: ["Etkili Prompt Yazma", "Teknikleri"], category: "prompt-engineering" },
      { icon: "settings", tone: "violet", title: "Yazılım Geliştirme", lines: ["Modern Teknolojiler", "ve Best Practices"], category: "software-development" },
      { icon: "note", tone: "orange", title: "Teknoloji Notları", lines: ["Öğrendiklerimi", "Dokümante Etmek"], category: "learning-notes" },
    ] satisfies ReadonlyArray<{
      icon: InterestIcon;
      tone: ToneName;
      title: string;
      lines: readonly string[];
      category: string;
    }>,
  },

  /** Listed in reading order; the layout shows them two per row */
  journey: {
    title: "Yolculuğum",
    steps: [
      { period: "2024", title: "Bloga Başlangıç", description: "Öğrendiklerimi düzenli olarak paylaşmak için TechNotes'u oluşturdum.", tone: "violet" },
      { period: "2024 – 2025", title: "AI & Computer Vision", description: "Yapay zeka ve bilgisayar görüşü alanlarında derinlemesine çalışmalar yapmaya başladım.", tone: "blue" },
      { period: "2025", title: "Claude Code & LLM'ler", description: "AI destekli araçları aktif olarak kullanmaya ve denemeye ve deneyimlerimi paylaşmaya başladım.", tone: "violet" },
      { period: "Devam Ediyor", title: "Sürekli Öğrenme", description: "Yeni teknolojileri keşfetmeye, projeler geliştirmeye ve bu yolculuğu paylaşmaya devam ediyorum.", tone: "green" },
    ] satisfies ReadonlyArray<{ period: string; title: string; description: string; tone: ToneName }>,
  },

  technologies: {
    title: "Kullandığım Teknolojiler",
    items: [
      "Python", "PyTorch", "YOLO", "OpenCV",
      "Claude", "VS Code", "Git", "Docker",
      "FastAPI", "Next.js", "React", "PostgreSQL",
      "TypeScript", "Linux", "Figma", "Notion",
    ],
  },

  goals: {
    title: "Hedeflerim",
    items: [
      "Daha fazla pratik proje geliştirmek",
      "Açık kaynak projelere katkıda bulunmak",
      "Bildiklerimi toplulukla paylaşmak",
      "Yapay zeka alanında uzmanlaşmak",
      "Teknik içerik üretmeye devam etmek",
    ],
  },

  contact: {
    title: "İletişime Geçin",
    text: "Sorularınız, iş birlikleri veya sadece merhaba demek için bana ulaşabilirsiniz.",
  },

  lake: { words: ["Öğren", "Uygula", "Paylaş", "Büyü"] },
} as const;
