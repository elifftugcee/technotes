import { HeroCrystals } from "@/components/art/hero/Crystals";
import { HeroScene } from "@/components/art/hero/HeroScene";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { homeContent } from "@/content/home";
import { HeroStats } from "./HeroStats";

export function Hero() {
  const { eyebrow, titleLines, titleAccent, description, primaryCta, secondaryCta } = homeContent.hero;

  return (
    // Pulled up under the sticky header so the illustration reaches the very top of the page
    <section className="relative -mt-14 overflow-hidden pt-14 lg:min-h-[31rem]">
      <HeroCrystals />

      <Container className="relative z-10">
        <div className="max-w-[34rem] pb-6 pt-8 lg:pb-8 lg:pt-9">
          <p lang="en" className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted">
            {eyebrow.join(" • ")}
          </p>

          <h1 className="mt-4 text-[clamp(2.5rem,4.1vw,3.3rem)] font-extrabold leading-none tracking-[-0.045em] text-ink">
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="text-brand-gradient block">{titleAccent}</span>
          </h1>

          <p className="mt-2.5 max-w-[25rem] text-base leading-[1.35] text-muted">{description}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button href={primaryCta.href} size="lg" className="min-w-[12.5rem]">
              {primaryCta.label} <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button href={secondaryCta.href} variant="outline" size="lg">
              {secondaryCta.label}
            </Button>
          </div>

          <HeroStats />
        </div>
      </Container>

      {/* One instance, repositioned per breakpoint: below the text on mobile, behind it from lg up */}
      <div className="relative mt-2 h-[17rem] sm:h-[22rem] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[56%] lg:[mask-image:linear-gradient(to_right,transparent_0,#000_30%)] xl:w-[64%] xl:[mask-image:linear-gradient(to_right,transparent_0,#000_20%)]">
        <HeroScene className="h-full w-full" />
        {/* soft fade into the page at the bottom edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-canvas to-transparent" />
      </div>
    </section>
  );
}
