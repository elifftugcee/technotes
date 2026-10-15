export type SocialKey = "github" | "linkedin" | "x" | "youtube" | "email";

/**
 * Accounts shown across the site (About page, article author card, footer…). Every entry that is set
 * becomes a working link; entries left out simply don't appear — so only add accounts that really exist.
 * `github` is required (the header's "Takip Et" button points to it).
 */
const social: { github: string } & Partial<Record<Exclude<SocialKey, "github">, string>> = {
  github: "https://github.com/elifftugcee",
  // linkedin: "https://www.linkedin.com/in/kullanici-adin",
  // x: "https://x.com/kullanici-adin",
  // youtube: "https://www.youtube.com/@kanal-adin",
  // email: "merhaba@alanadin.com",   // sadece adres; mailto: otomatik eklenir
};

/**
 * Newsletter signup. Switched off until `addSubscriber` in `lib/newsletter.ts` talks to a real e-mail service:
 * while `enabled` is false the forms show a "Yakında" (coming soon) state and nothing is submitted or stored.
 */
const newsletter: { enabled: boolean } = { enabled: false };

export const site = {
  name: "TechNotes",
  description:
    "Yapay zeka, bilgisayar görüşü, prompt engineering, Claude Code ve yazılım geliştirme üzerine notlar, deneyimler ve pratik içerikler.",
  tagline: "Daha iyi yazılımlar, daha iyi insanlar için.",
  author: {
    name: "Elif",
    initials: "E",
    role: "AI & Software Engineer",
    bio: "Yapay zeka, bilgisayar görüşü, yazılım geliştirme ve üretkenlik üzerine içerikler paylaşıyorum.",
  },
  nav: [
    { href: "/", label: "Ana Sayfa" },
    { href: "/yazilar", label: "Yazılar" },
    { href: "/kategoriler", label: "Kategoriler" },
    { href: "/hakkimda", label: "Hakkımda" },
  ],
  social,
  newsletter,
} as const;

export type NavItem = (typeof site.nav)[number];
