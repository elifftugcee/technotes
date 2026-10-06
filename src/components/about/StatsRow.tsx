import type { ComponentType } from "react";
import { toneStyles } from "@/components/ui/tones";
import type { IconProps } from "@/components/ui/icons";
import type { ToneName } from "@/content/categories";
import { cn } from "@/lib/cn";

export type AboutStat = {
  icon: ComponentType<IconProps>;
  tone: ToneName;
  value: string;
  label: string;
};

export function StatsRow({ stats }: { stats: AboutStat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map(({ icon: Icon, tone, value, label }) => (
        <div key={label} className="flex items-center gap-2.5 rounded-2xl border border-line bg-surface/70 p-3">
          <span className={cn("inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", toneStyles[tone].tile)}>
            <Icon className="h-5 w-5" />
          </span>
          {/* dt must precede dd in the DOM; flex-col-reverse shows the value above the label */}
          <div className="flex min-w-0 flex-col-reverse leading-tight">
            <dt className="text-[0.6875rem] text-muted">{label}</dt>
            <dd className="text-base font-extrabold tracking-tight text-ink">{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
