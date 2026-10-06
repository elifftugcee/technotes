import Link from "next/link";
import { useId } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={`${id}-l`} x1="4" y1="9" x2="16" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1f7bff" />
          <stop offset="1" stopColor="#3a4bf0" />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="16" y1="16" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b46f6" />
          <stop offset="1" stopColor="#5b34e6" />
        </linearGradient>
        <linearGradient id={`${id}-t`} x1="4" y1="2" x2="28" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#46d3ff" />
          <stop offset="1" stopColor="#7c6cff" />
        </linearGradient>
      </defs>
      <path d="M4 9 16 16v14L4 23V9Z" fill={`url(#${id}-l)`} />
      <path d="m28 9-12 7v14l12-7V9Z" fill={`url(#${id}-r)`} />
      <path d="M16 2 28 9l-12 7L4 9 16 2Z" fill={`url(#${id}-t)`} />
      <path d="m16 9.2 3.4 2-3.4 2-3.4-2 3.4-2Z" fill="#fff" fillOpacity=".9" />
      <path d="M16 16v14M4 9l12 7 12-7" stroke="#fff" strokeOpacity=".28" fill="none" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — ana sayfa`}
      className={cn("inline-flex items-center gap-2.5 rounded-lg", className)}
    >
      <LogoMark className="h-8 w-8 drop-shadow-[0_4px_8px_rgba(80,70,240,0.35)]" />
      <span className="text-[1.35rem] font-bold tracking-tight text-ink">{site.name}</span>
    </Link>
  );
}
