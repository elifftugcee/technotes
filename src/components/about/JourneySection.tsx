import { FlagIcon } from "@/components/ui/icons";
import type { ToneName } from "@/content/categories";
import { aboutContent } from "@/content/about";
import { cn } from "@/lib/cn";
import { CardHeading } from "./ui";

const dotClasses: Record<string, string> = {
  violet: "bg-violet-500 ring-violet-500/20",
  blue: "bg-blue-500 ring-blue-500/20",
  green: "bg-emerald-500 ring-emerald-500/20",
};

/** Timeline: two columns on wide screens (read left to right, row by row), one column below. */
export function JourneySection() {
  const { title, steps } = aboutContent.journey;
  const lastRowStart = steps.length - (steps.length % 2 === 0 ? 2 : 1);

  return (
    <section aria-labelledby="yolculugum">
      <CardHeading id="yolculugum" icon={FlagIcon} tone="blue" title={title} />
      <ol className="mt-5 grid gap-x-12 md:grid-cols-2">
        {steps.map((step, index) => {
          const tone: ToneName = step.tone;
          return (
            <li key={step.title} className="relative pb-7 pl-9 last:pb-0 md:[&:nth-last-child(-n+2)]:pb-0">
              <span
                aria-hidden="true"
                className={cn("absolute left-0 top-1 h-3.5 w-3.5 rounded-full ring-4", dotClasses[tone] ?? dotClasses.violet)}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute bottom-0 left-[0.4375rem] top-6 w-px bg-line",
                  index < steps.length - 1 ? "block" : "hidden",
                  index < lastRowStart ? "md:block" : "md:hidden",
                )}
              />
              <div className="flex flex-wrap items-baseline gap-x-4">
                <span className="text-xs text-muted">{step.period}</span>
                <h3 className="text-[0.8125rem] font-bold text-ink">{step.title}</h3>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
