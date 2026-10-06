import type { ReactNode } from "react";
import { ArticlesScene } from "@/components/art/ArticlesScene";
import { Container } from "@/components/ui/Container";

/**
 * Intro block of the articles page. The search box and category chips arrive as `children`
 * (they are client components that share state with the list below).
 */
export function ArticlesHero({ children }: { children?: ReactNode }) {
  return (
    // Pulled up under the sticky header so the illustration reaches the very top of the page
    <section className="relative -mt-14 overflow-hidden pt-14">
      <Container size="wide" className="relative z-10">
        <div className="max-w-[50rem] pb-8 pt-8 lg:pt-10">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted">Tüm Yazılar</p>
          <h1 className="mt-3 text-[clamp(2.5rem,4.1vw,3.5rem)] font-extrabold leading-none tracking-[-0.045em] text-ink">
            Teknik <span className="text-brand-gradient">Yazılar</span>
          </h1>
          <p className="mt-3 max-w-[34rem] text-base leading-[1.45] text-muted">
            Yapay zeka, bilgisayar görüşü, prompt engineering ve yazılım geliştirme üzerine tüm içeriklerimi bu sayfada
            bulabilirsiniz.
          </p>
          <div className="mt-5">{children}</div>
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block lg:[mask-image:linear-gradient(to_right,transparent_0,#000_32%)] xl:[mask-image:linear-gradient(to_right,transparent_0,#000_22%)]">
        <ArticlesScene className="h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-canvas to-transparent" />
      </div>
    </section>
  );
}
