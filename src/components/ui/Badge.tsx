import type { ReactNode } from "react";
import type { ToneName } from "@/content/categories";
import { cn } from "@/lib/cn";
import { toneStyles } from "./tones";

type BadgeProps = {
  tone: ToneName;
  /** `onDark` uses a solid light pill — for badges laid over dark cover art */
  variant?: "soft" | "onDark";
  children: ReactNode;
  className?: string;
};

export function Badge({ tone, variant = "soft", children, className }: BadgeProps) {
  const styles = variant === "onDark" ? toneStyles[tone].badgeOnDark : toneStyles[tone].badge;

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium leading-none",
        styles,
        className,
      )}
    >
      {children}
    </span>
  );
}
