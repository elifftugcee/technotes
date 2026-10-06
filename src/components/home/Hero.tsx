import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { homeContent } from "@/content/home";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroStats } from "./HeroStats";

export function Hero() {
  const { eyebrow, titleLines, titleAccent, description, primaryCta, secondaryCta } = homeContent.hero;

  return (
    // Pulled up under the sticky header so the photo reaches the very top of the page.
    // The hero grows with the viewport on desktop so the (16:9) photo is cropped less on wide screens.
    <section className="relative -mt-14 overflow-hidden pt-14 lg:min-h-[clamp(34rem,36vw,46rem)]">
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

      <HeroBackdrop />
    </section>
  );
}
