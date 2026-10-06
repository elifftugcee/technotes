/** Copy for the home page — kept out of the components so it is easy to edit. */
export const homeContent = {
  hero: {
    eyebrow: ["AI", "Vision", "Code", "Learn"],
    titleLines: ["Teknolojiyi", "Daha İyi Anlamak"],
    titleAccent: "ve Uygulamak İçin",
    description:
      "Yapay zeka, bilgisayar görüşü, prompt engineering, Claude Code ve yazılım geliştirme üzerine notlarım, deneyimlerim ve pratik içerikler.",
    primaryCta: { label: "Tüm Yazıları Keşfet", href: "/yazilar" },
    secondaryCta: { label: "Hakkımda", href: "/hakkimda" },
  },

  /** `value: null` is filled in at render time with the real category count */
  stats: [
    { icon: "cube", value: null, label: "Kategori" },
    { icon: "target", value: "50+", label: "Yazı Hedefi" },
    { icon: "network", value: "Sürekli", label: "Güncellerim" },
    { icon: "star", value: "Pratik", label: "Uygulamalı" },
  ],

  newsletter: {
    title: "Birlikte Öğrenelim",
    subtitle: "Yeni yazılardan haberdar olmak için abone ol.",
    features: [
      { icon: "mail", title: "Yeni içeriklerden haberdar ol", description: "E-posta ile bildirim al." },
      { icon: "lock", title: "Özel notlar", description: "Sadece abonelere özel içerikler." },
      { icon: "users", title: "Topluluğun bir parçası ol", description: "Soru ve önerilerinle katkı sağla." },
    ],
  },
} as const;
