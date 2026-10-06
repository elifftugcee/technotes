import type { ComponentType } from "react";
import { categories, type ToneName } from "@/content/categories";
import { homeContent } from "@/content/home";
import { ChartCheckIcon, CubeIcon, NetworkIcon, StarIcon, type IconProps } from "@/components/ui/icons";
import { toneStyles } from "@/components/ui/tones";
import { cn } from "@/lib/cn";

type StatIcon = (typeof homeContent.stats)[number]["icon"];

const statIcons: Record<StatIcon, { Icon: ComponentType<IconProps>; tone: ToneName }> = {
  cube: { Icon: CubeIcon, tone: "blue" },
  target: { Icon: ChartCheckIcon, tone: "violet" },
  network: { Icon: NetworkIcon, tone: "teal" },
  star: { Icon: StarIcon, tone: "violet" },
};

export function HeroStats() {
  return (
    <dl className="mt-6 flex flex-wrap items-center gap-y-4 lg:w-[38rem]">
      {homeContent.stats.map((stat, index) => {
        const { Icon, tone } = statIcons[stat.icon];
        const value = stat.value ?? String(categories.length);

        return (
          <div key={stat.label} className={cn("flex items-center gap-2 pr-4", index > 0 && "border-l border-line pl-4")}>
            <span className={cn("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", toneStyles[tone].tile)}>
              <Icon className="h-4 w-4" />
            </span>
            {/* dt must precede dd in the DOM; flex-col-reverse shows the value above the label */}
            <div className="flex flex-col-reverse leading-tight">
              <dt className="text-[0.6875rem] text-muted">{stat.label}</dt>
              <dd className="text-xs font-bold text-ink">{value}</dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
