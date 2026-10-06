import { LakeScene } from "@/components/art/LakeScene";
import { CodeIcon, QuoteIcon, UserIcon } from "@/components/ui/icons";
import { aboutContent } from "@/content/about";
import { site } from "@/content/site";
import { AboutCard, CardHeading } from "./ui";

/** "Ben Kimim?" — bio, the site's motto, and a lake illustration with the handwritten Öğren · Uygula · Paylaş · Büyü. */
export function WhoAmICard() {
  const { title, paragraphs } = aboutContent.whoAmI;

  return (
    <AboutCard labelledBy="ben-kimim" className="p-6">
      <CardHeading id="ben-kimim" icon={UserIcon} tone="violet" title={title} />

      <div className="mt-4 space-y-4 text-[0.8125rem] leading-[1.7] text-muted">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <figure className="mt-5 flex items-center gap-3 rounded-xl bg-violet-500/10 px-4 py-3.5 dark:bg-violet-400/15">
        <QuoteIcon className="h-7 w-7 shrink-0 text-violet-400" />
        <blockquote className="text-sm font-medium leading-snug text-ink">{site.tagline}</blockquote>
      </figure>
    </AboutCard>
  );
}

export function LakeCard() {
  return (
    <div className="relative isolate h-52 overflow-hidden rounded-2xl border border-line shadow-card-lg">
      <LakeScene className="absolute inset-0 -z-10 h-full w-full" />
      <p
        aria-label={aboutContent.lake.words.join(", ")}
        className="absolute bottom-5 left-5 -rotate-[10deg] font-script text-[1.65rem] font-semibold leading-[1.15] text-white [text-shadow:0_0_14px_rgb(255_190_150/0.7)]"
      >
        {aboutContent.lake.words.map((word) => (
          <span key={word} aria-hidden="true" className="block">
            {word}
          </span>
        ))}
      </p>
      <CodeIcon className="absolute bottom-4 right-5 h-8 w-8 text-white/90" />
    </div>
  );
}
