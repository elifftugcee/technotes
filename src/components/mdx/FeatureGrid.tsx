import type { ComponentType, ReactNode } from "react";
import { ChatIcon, ClockIcon, CodeIcon, TrendingIcon, type IconProps } from "@/components/ui/icons";
import { toneStyles } from "@/components/ui/tones";
import type { ToneName } from "@/content/categories";
import { cn } from "@/lib/cn";

const featureIcons = {
  clock: ClockIcon,
  trending: TrendingIcon,
  code: CodeIcon,
  chat: ChatIcon,
} satisfies Record<string, ComponentType<IconProps>>;

export type FeatureIconName = keyof typeof featureIcons;

/** Row of small highlight cards — `<FeatureGrid><Feature icon="clock" tone="blue" title="…">…</Feature></FeatureGrid>` */
export function FeatureGrid({ children }: { children: ReactNode }) {
  return <div className="my-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{children}</div>;
}

export function Feature({
  icon,
  tone = "blue",
  title,
  children,
}: {
  icon: FeatureIconName;
  tone?: ToneName;
  title: string;
  children: ReactNode;
}) {
  const Icon = featureIcons[icon];
  return (
    <div className="flex items-start gap-2.5 rounded-2xl border border-line bg-surface p-3.5 shadow-card">
      <span className={cn("inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", toneStyles[tone].tile)}>
        <Icon className="h-[1.15rem] w-[1.15rem]" />
      </span>
      <div>
        <p className="text-[0.8125rem] font-bold leading-snug text-ink">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{children}</p>
      </div>
    </div>
  );
}
