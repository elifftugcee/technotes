import Image from "next/image";
import { HeroCrystals } from "@/components/art/hero/Crystals";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { aboutContent } from "@/content/about";
import { siteImages } from "@/content/images";
import { site } from "@/content/site";

export function AboutHero() {
  const { eyebrow, greeting, description } = aboutContent.hero;

  return (
    // Pulled up under the sticky header so the photo reaches the very top of the page
    <section className="relative -mt-14 overflow-hidden pt-14">
      <HeroCrystals />

      <Container className="relative z-10">
        <div className="max-w-[32rem] pb-14 pt-9 lg:pt-10">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted">{eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.5rem,4.1vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink">
            {greeting}
            <span className="block">
              <span className="text-brand-gradient">{site.name}</span> <span aria-hidden="true">👋</span>
            </span>
          </h1>
          <p className="mt-4 max-w-[28rem] text-base leading-[1.45] text-muted">{description}</p>
          <SocialLinks className="mt-6" />
        </div>
      </Container>

      {/* Below lg: a band under the text (fading in from the top). From lg: behind the page's right side, fading in from the left. */}
      <div className="pointer-events-none relative mt-2 aspect-[16/9] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0,#000_28%)] sm:aspect-[2.4/1] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[68%] lg:[mask-image:linear-gradient(to_right,transparent_0,#000_36%)] xl:w-[66%] xl:[mask-image:linear-gradient(to_right,transparent_0,#000_30%)]">
        <Image
          src={siteImages.aboutHero.src}
          alt=""
          fill
          preload
          sizes="(min-width: 1024px) 68vw, 100vw"
          className="object-cover object-[78%_50%] lg:object-[90%_50%] xl:object-[80%_50%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-canvas to-transparent" />
      </div>
    </section>
  );
}
