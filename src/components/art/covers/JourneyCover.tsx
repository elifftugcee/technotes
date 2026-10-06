import { useId } from "react";

/** A hiker on a mountain trail at sunset — the "learning journey". */
export function JourneyCover({ className }: { className?: string }) {
  const id = useId();
  const u = (name: string) => `${id}-${name}`;

  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={u("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#5b5fd6" />
          <stop offset="0.5" stopColor="#c46ad0" />
          <stop offset="1" stopColor="#ffb59a" />
        </linearGradient>
        <linearGradient id={u("ridge")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#8a62b8" />
          <stop offset="1" stopColor="#5a3f93" />
        </linearGradient>
        <linearGradient id={u("hill")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#6d8a3c" />
          <stop offset="1" stopColor="#3b5a2a" />
        </linearGradient>
        <radialGradient id={u("sun")}>
          <stop stopColor="#fff2c8" />
          <stop offset="1" stopColor="#fff2c8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="220" fill={`url(#${u("sky")})`} />
      <circle cx="318" cy="92" r="70" fill={`url(#${u("sun")})`} opacity="0.85" />
      <ellipse cx="90" cy="40" rx="60" ry="9" fill="#fff" opacity="0.25" />

      {/* mountains */}
      <path d="M0 140 70 74l36 30 52-66 70 86 40-30 60 54 72-40v146H0Z" fill={`url(#${u("ridge")})`} />
      <path d="m158 38-16 24 12-6 10 12 12-8-18-22Zm-88 36-12 18 10-4 8 8 8-10-14-12Z" fill="#fff" opacity="0.85" />
      <path d="M196 128c50-20 90-10 130 8s60 10 74 0v90H196v-98Z" fill="#3e2f78" opacity="0.65" />
      <path d="M0 170c40-26 90-34 140-20s110 28 260-4v74H0Z" fill="#4a4a98" opacity="0.7" />

      {/* foreground hill + trail */}
      <path d="M0 176c60-22 130-14 200 6s130 10 200-10v48H0Z" fill={`url(#${u("hill")})`} />
      <path d="M170 220c18-18 34-30 62-40s48-14 74-30c-16 22-40 34-66 44-26 10-46 20-52 26h-18Z" fill="#c9a77a" />
      {[
        [30, 190],
        [70, 202],
        [110, 196],
        [352, 196],
        [380, 206],
        [330, 212],
      ].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="14" ry="6" fill="#2e4a22" opacity="0.8" />
      ))}

      {/* hiker with a backpack */}
      <g>
        <ellipse cx="302" cy="186" rx="16" ry="3.5" fill="#000" opacity="0.25" />
        <circle cx="300" cy="118" r="6.5" fill="#d9a98a" />
        <path d="M292 114c2-7 14-7 17 0-4-2-12-2-17 0Z" fill="#2a1f3d" />
        <path d="M290 126h22l3 34h-28l3-34Z" fill="#2c3a63" />
        <path d="M310 124c8 0 11 6 10 16l-4 12-8-3 2-25Z" fill="#c2564a" />
        <rect x="291" y="158" width="9" height="28" rx="3" fill="#1f2640" />
        <rect x="302" y="158" width="9" height="30" rx="3" fill="#1a213a" />
      </g>
    </svg>
  );
}
