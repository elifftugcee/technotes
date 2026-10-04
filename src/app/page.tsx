import Link from "next/link";
import { ArticleCard, type ArticleCardProps } from "@/components/ui/ArticleCard";
import { Button } from "@/components/ui/Button";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { GradientBlobs } from "@/components/effects/GradientBlobs";
import { HeroVisual } from "@/components/effects/HeroVisual";
import { BoltIcon, StepsIcon, RefreshIcon, CompassIcon } from "@/components/ui/icons";
import { categories } from "@/content/categories";

const demoArticles: ArticleCardProps[] = [
  {
    title: "Article preview — AI & Computer Vision",
    excerpt: "Article preview. Bu alanda yazının kısa özeti görünecek; gerçek içerik sonraki aşamada eklenecek.",
    category: "AI & Computer Vision",
    categoryTone: "turquoise",
    date: "—",
    readingTime: "—",
    href: "#",
  },
  {
    title: "Article preview — Claude Code",
    excerpt: "Article preview. Bu alanda yazının kısa özeti görünecek; gerçek içerik sonraki aşamada eklenecek.",
    category: "Claude Code",
    categoryTone: "violet",
    date: "—",
    readingTime: "—",
    href: "#",
  },
  {
    title: "Article preview — Prompt Engineering",
    excerpt: "Article preview. Bu alanda yazının kısa özeti görünecek; gerçek içerik sonraki aşamada eklenecek.",
    category: "Prompt Engineering",
    categoryTone: "blue",
    date: "—",
    readingTime: "—",
    href: "#",
  },
];

const heroHighlights = [
  { icon: BoltIcon, title: "Pratik Notlar", desc: "Gerçek deneyimlerden" },
  { icon: StepsIcon, title: "Adım Adım", desc: "Anlaşılır anlatım" },
  { icon: RefreshIcon, title: "Güncel İçerik", desc: "Düzenli paylaşım" },
  { icon: CompassIcon, title: "Açık Süreç", desc: "Öğrenirken paylaşım" },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <GradientBlobs />
        <div className="mx-auto grid max-w-[80rem] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="font-mono text-sm text-accent-blue">{"// AI · Computer Vision · Software Engineering"}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Kod, veri ve modellerin{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-turquoise bg-clip-text text-transparent">
                kesiştiği yer.
              </span>
            </h1>
            <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-muted">
              Claude Code, prompt engineering, computer vision ve yazılım geliştirme üzerine pratik notlar ve
              deneyimler.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/articles" variant="primary">
                Yazıları Gör
              </Button>
              <Button href="/about" variant="outline">
                Hakkımda
              </Button>
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {heroHighlights.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue via-accent-violet to-accent-turquoise text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <dt className="font-body text-sm font-semibold text-ink">{title}</dt>
                  <dd className="font-body text-xs text-muted">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-accent-blue">Son Yazılar</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Öne Çıkan Yazılar</h2>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-1 font-body text-sm font-medium text-accent-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
          >
            Tüm Yazılar <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoArticles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface/70 py-20">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-accent-violet">Kategoriler</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Konu başlığına göre keşfet
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
