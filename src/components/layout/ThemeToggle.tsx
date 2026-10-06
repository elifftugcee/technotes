"use client";

import { cn } from "@/lib/cn";
import { useTheme, type Theme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

const options = [
  { value: "light", label: "Açık tema", Icon: SunIcon },
  { value: "dark", label: "Koyu tema", Icon: MoonIcon },
] as const satisfies ReadonlyArray<{ value: Theme; label: string; Icon: typeof SunIcon }>;

/** Segmented light / dark switch. State lives on <html data-theme>, so it survives navigation and reloads. */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useTheme();

  return (
    <div
      role="group"
      aria-label="Tema seçimi"
      className={cn("inline-flex items-center gap-0.5 rounded-full border border-line bg-glass p-0.5 backdrop-blur", className)}
    >
      {options.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-brand",
              active
                ? value === "dark"
                  ? "bg-[#10142e] text-white shadow-sm"
                  : "bg-white text-amber-500 shadow-sm"
                : "text-muted hover:text-ink",
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
