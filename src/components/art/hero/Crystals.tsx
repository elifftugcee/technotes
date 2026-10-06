import { useId } from "react";
import { cn } from "@/lib/cn";

/** A faceted gem — decorative accent floating at the left edge of the hero. */
export function Crystal({ className, delay = 0 }: { className?: string; delay?: number }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 100 120"
      aria-hidden="true"
      className={cn("absolute animate-scene-float drop-shadow-[0_10px_18px_rgba(70,110,255,0.35)]", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      <defs>
        <linearGradient id={`${id}-t`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#bdf0ff" />
          <stop offset="1" stopColor="#7fb6ff" />
        </linearGradient>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#5fa8ff" />
          <stop offset="1" stopColor="#3f6df0" />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a58bff" />
          <stop offset="1" stopColor="#7b5af0" />
        </linearGradient>
      </defs>
      <path d="M50 2 98 30 50 46 2 30 50 2Z" fill={`url(#${id}-t)`} />
      <path d="m2 30 48 16v72L2 90V30Z" fill={`url(#${id}-l)`} opacity="0.92" />
      <path d="m98 30-48 16v72l48-28V30Z" fill={`url(#${id}-r)`} opacity="0.92" />
      <path d="M50 46v72M2 30l48 16 48-16" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" fill="none" />
      <path d="m14 40 20 8v36" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function HeroCrystals() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block">
      <Crystal className="left-[3.2%] top-[170px] h-[42px] w-[35px]" />
      <Crystal className="-left-[3%] top-[255px] h-[150px] w-[125px] opacity-80" delay={1.2} />
      <Crystal className="left-[3.4%] top-[372px] h-[20px] w-[17px] opacity-80" delay={2.4} />
      <span className="absolute left-[1.5%] top-[62px] h-2.5 w-2.5 rotate-45 rounded-[2px] bg-sky-300/70" />
    </div>
  );
}
