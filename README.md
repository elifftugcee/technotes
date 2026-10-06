# TechNotes

Yapay zeka, bilgisayar görüşü, prompt engineering, Claude Code ve yazılım geliştirme üzerine Türkçe blog.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · MDX.

```bash
npm run dev     # http://localhost:3000
npm run build   # üretim derlemesi (tüm sayfalar statik)
npm run lint
```

## Yapı

```
src/
  app/                 Rotalar: /, /yazilar, /yazilar/[slug], /kategoriler, /hakkimda
    actions/subscribe.ts   Bülten formu için Server Action
  components/
    layout/            Header, Footer, Logo, SearchBox (⌘K / Ctrl K), ThemeToggle
    home/              Ana sayfa bölümleri: Hero, CategoryStrip, FeaturedCarousel, PostsShowcase, Newsletter
    articles/          Yazılar sayfası: ArticlesProvider (filtre durumu), ArticleCard/ArticleRow, FilterSidebar, Pagination…
    art/               SVG illüstrasyonlar: yazı kapakları ve (şu an kullanılmayan) eski hero/bülten sahneleri
    effects/           HeroVisual — CSS animasyonlu hero kompozisyonu (kullanılmıyor; fotoğrafın üzerine animasyon katmanları için saklanıyor)
    mdx/               MDX gövdesi için tipografi
    ui/                Button, Badge, Container, SectionHeading, ikonlar
  content/
    site.ts            Site adı, menü, sosyal bağlantılar
    home.ts            Ana sayfa metinleri
    categories.ts      Kategoriler (ad, açıklama, ikon, renk)
    posts/*.mdx        Yazılar
  lib/                 posts (MDX okuma), search, theme, format, newsletter
```

## Yeni yazı eklemek

`src/content/posts/` altına bir `.mdx` dosyası ekle:

```mdx
---
title: "Yazı başlığı"
date: "2024-03-12"          # YYYY-MM-DD
category: "claude-code"     # content/categories.ts içindeki slug
excerpt: "Kısa özet"
readingTime: 8              # dakika
cover: "claude-code"        # hazır illüstrasyon: claude-code | prompt | yolo | iou-nms | journey | tech-stack | claude-project | prompt-templates
coverImage: "/images/posts/ornek.webp"   # opsiyonel — gerçek görsel, `cover`ın yerine geçer
featured: true              # opsiyonel — "Öne Çıkan Yazı" döngüsüne girer
tags: ["Claude Code", "AI Tools"]       # opsiyonel — "İlgili Konular"; yoksa kategori adı gösterilir
---
```

## Sayfa görselleri

Fotoğraflar `public/images/` altındadır ve `src/content/images.ts` içinden adlandırılır (`next/image` ile sunulur,
boyutlandırma/format dönüşümünü Next.js yapar). Dosyayı aynı adla değiştirmek yeterlidir.

| Dosya | Nerede |
| --- | --- |
| `home-hero.webp` | Ana sayfa hero arka planı (`components/home/HeroBackdrop.tsx`) |
| `home-hero-alternative.webp` | Henüz hiçbir sayfada kullanılmıyor — ana sayfa için alternatif |
| `article-detail-hero.webp` | Yazı detay sayfasının banner'ı (`components/articles/ArticleBanner.tsx`); yazının frontmatter'ında `coverImage` varsa o kullanılır |
| `about-hero.webp` | Hakkımda sayfasının üst arka planı (`components/about/AboutHero.tsx`) |
| `newsletter-background.webp` | Ana sayfadaki bülten bandı (`components/home/Newsletter.tsx`) |

Yazılar sayfasında bu görsellerin hiçbiri kullanılmaz.

## Hakkımda sayfası

Metinler (biyografi, ilgi alanları, yolculuk, teknolojiler, hedefler) `src/content/about.ts` içindedir. Üstteki
istatistikler gerçek yazılardan hesaplanır (yazı sayısı, toplam okuma süresi, ilk yazının yılı). Her ilgi alanı
kartı ilgili kategoriyle filtrelenmiş yazılar sayfasını açar.

Sosyal hesaplar ve e-posta `src/content/site.ts` içindeki `social` nesnesinden gelir: tanımlı olan her hesap
Hakkımda sayfasında, yazar kartında ve iletişim kutusunda çalışan bir bağlantı olarak görünür, tanımlı olmayanlar
hiç gösterilmez. LinkedIn, X, YouTube ve e-posta için hazır (yorumlu) satırlar vardır; yalnızca gerçek hesapları ekleyin.

## Yazı detay sayfası

`##` başlıkları otomatik numaralanır ve soldaki "Bu Yazıda Neler Var?" listesine girer (okunan bölüm vurgulanır).
MDX içinde şu bileşenler kullanılabilir (ayrıntı: `src/components/mdx/`):

```mdx
<Figure caption="İsteğe bağlı alt yazı"><TerminalDemo /></Figure>

<FeatureGrid>
  <Feature icon="clock" tone="blue" title="Başlık">Kısa açıklama.</Feature>
</FeatureGrid>
```

Yazar adı, unvanı, kısa biyografisi ve sosyal bağlantılar `src/content/site.ts` içindedir; yalnızca orada
tanımlı hesaplar sayfada link olarak görünür. Banner'daki paylaşım düğmeleri (X, LinkedIn, bağlantıyı kopyala)
makalenin adresini `#bölüm`/`?arama` olmadan paylaşır.

## Yazılar sayfası

`/yazilar` kategori, sıralama, okuma süresi, kart/liste görünümü ve sayfa numarasını URL'de tutar
(`?kategori=…&sirala=…&sure=…&gorunum=liste&sayfa=2`); arama metni yazarken anında filtreler. Yer imi
simgesi yazıyı `localStorage`'a kaydeder; en az bir yazı kaydedilince araç çubuğunda "Kaydedilenler" filtresi belirir.
Sayfa başına yazı sayısı `src/lib/article-filters.ts` içindeki `PAGE_SIZE` ile ayarlanır; sayfalama yalnızca
yazı sayısı bunu aşınca görünür.

## Tema

Açık/koyu tema `<html data-theme>` ile çalışır; seçim `localStorage`'da saklanır ve ilk boyamadan önce
uygulanır. Renkler `src/app/globals.css` içindeki CSS değişkenlerinde tanımlıdır.

## Bülten

Form, `src/app/actions/subscribe.ts` Server Action'ını çağırır; e-postalar `src/lib/newsletter.ts` ile
yerel `.data/subscribers.json` dosyasına yazılır (git'e girmez). Vercel gibi sunucusuz ortamlarda dosya
sistemi yazılamaz — canlıya almadan önce `addSubscriber` içeriğini e-posta sağlayıcınıza (Buttondown,
Resend, Mailchimp…) bağlayın.
