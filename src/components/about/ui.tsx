import type { ComponentType, ReactNode } from "react";
import type { ToneName } from "@/content/categories";
import type { InterestIcon } from "@/content/about";
import { AsteriskIcon, ChatIcon, ChipIcon, DocumentIcon, EyeIcon, SettingsIcon, type IconProps } from "@/components/ui/icons";
import { toneStyles } from "@/components/ui/tones";
import { cn } from "@/lib/cn";

export const interestIcons: Record<InterestIcon, ComponentType<IconProps>> = {
  chip: ChipIcon,
  eye: EyeIcon,
  claude: AsteriskIcon,
  chat: ChatIcon,
  settings: SettingsIcon,
  note: DocumentIcon,
};

/** Frosted card used throughout the About page. */
export function AboutCard({
  as: Tag = "section",
  labelledBy,
  className,
  children,
}: {
  as?: "section" | "div" | "aside";
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      aria-labelledby={labelledBy}
      className={cn("rounded-2xl border border-line bg-glass p-5 shadow-card backdrop-blur-xl", className)}
    >
      {children}
    </Tag>
  );
}

/** Round icon badge + title, the heading style of every About card. */
export function CardHeading({
  id,
  icon: Icon,
  tone = "blue",
  title,
  size = "md",
}: {
  id: string;
  icon: ComponentType<IconProps>;
  tone?: ToneName;
  title: string;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full",
          toneStyles[tone].tile,
          size === "md" ? "h-9 w-9" : "h-8 w-8",
        )}
      >
        <Icon className={size === "md" ? "h-[1.1rem] w-[1.1rem]" : "h-4 w-4"} />
      </span>
      <h2 id={id} className={cn("font-bold tracking-tight text-ink", size === "md" ? "text-lg" : "text-[0.9375rem]")}>
        {title}
      </h2>
    </div>
  );
}
