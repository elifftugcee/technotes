import { ClockIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { formatDate, formatReadingTime } from "@/lib/format";

/** "🕒 10 Mar 2024 • 6 dk okuma" */
export function PostMeta({
  date,
  readingTime,
  showIcon = true,
  showDate = true,
  compact = false,
  className = "text-muted",
}: {
  date: string;
  readingTime: number;
  showIcon?: boolean;
  /** Hide the date and show only the reading time */
  showDate?: boolean;
  /** Slightly smaller text, for narrow cards */
  compact?: boolean;
  /** Replaces the default `text-muted` colour — include a colour class when overriding */
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-1.5 whitespace-nowrap", compact ? "text-[0.6875rem]" : "text-xs", className)}>
      {showIcon && <ClockIcon className="h-3.5 w-3.5 shrink-0" />}
      {showDate && (
        <>
          <time dateTime={date}>{formatDate(date)}</time>
          <span aria-hidden="true">•</span>
        </>
      )}
      <span>{formatReadingTime(readingTime)}</span>
    </p>
  );
}
