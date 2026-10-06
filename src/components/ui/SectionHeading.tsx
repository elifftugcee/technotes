import type { ComponentType, ReactNode } from "react";
import type { ToneName } from "@/content/categories";
import { cn } from "@/lib/cn";
import type { IconProps } from "./icons";
import { toneStyles } from "./tones";

/** Icon tile + title, with an optional slot on the right (links, carousel controls…). */
export function SectionHeading({
  icon: Icon,
  tone,
  title,
  as: Heading = "h2",
  children,
  className,
}: {
  icon: ComponentType<IconProps>;
  tone: ToneName;
  title: string;
  as?: "h1" | "h2" | "h3";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-3">
        <span className={cn("inline-flex h-9 w-9 items-center justify-center rounded-xl", toneStyles[tone].tile)}>
          <Icon className="h-[1.15rem] w-[1.15rem]" />
        </span>
        <Heading className="text-xl font-bold tracking-tight text-ink">{title}</Heading>
      </div>
      {children}
    </div>
  );
}
