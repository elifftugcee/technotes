import { ArticleCard, type ArticleCardProps } from "@/components/ui/ArticleCard";
import { Button } from "@/components/ui/Button";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { NodePattern } from "@/components/ui/NodePattern";

const demoArticles: ArticleCardProps[] = [
  {
    title: "Article preview — AI & Computer Vision",
    excerpt: "Article preview. Bu alanda yazının kısa özeti görünecek; gerçek içerik sonraki aşamada eklenecek.",
    category: "AI & Computer Vision",
    date: "—",
    readingTime: "— dk",
    href: "#",
  },
  {
    title: "Article preview — Claude Code",
    excerpt: "Article preview. Bu alanda yazının kısa özeti görünecek; gerçek içerik sonraki aşamada eklenecek.",
    category: "Claude Code",
    date: "—",
    readingTime: "— dk",
    href: "#",
  },
  {
    title: "Article preview — Prompt Engineering",
    excerpt: "Article preview. Bu alanda yazının kısa özeti görünecek; gerçek içerik sonraki aşamada eklenecek.",
    category: "Prompt Engineering",
    date: "—",
    readingTime: "— dk",
    href: "#",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[80rem] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="font-mono text-sm text-accent-blue">{"// AI · Computer Vision · Software Engineering"}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
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
          </div>

          <div className="relative hidden aspect-square items-center justify-center lg:flex">
            <CornerFrame />
            <NodePattern className="h-3/4 w-3/4" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoArticles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </section>
    </>
  );
}
