import { useId } from "react";

type Tile = { label: string; x: number; y: number; rotate: number };

const tiles: Tile[] = [
  { label: "Summarize", x: 44, y: 36, rotate: -8 },
  { label: "Code", x: 252, y: 28, rotate: 7 },
  { label: "Analyze", x: 38, y: 124, rotate: 6 },
  { label: "Creative", x: 258, y: 120, rotate: -6 },
];

/** Four prompt "template" tiles orbiting a run button. */
export function PromptTemplatesCover({ className }: { className?: string }) {
  const id = useId();
  const u = (name: string) => `${id}-${name}`;

  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={u("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#1b3bd0" />
          <stop offset="0.6" stopColor="#3a2bc4" />
          <stop offset="1" stopColor="#6a35d8" />
        </linearGradient>
        <linearGradient id={u("tile")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a9c8ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#b79bff" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id={u("halo")}>
          <stop stopColor="#c7d6ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#c7d6ff" stopOpacity="0" />
        </radialGradient>
        <filter id={u("glow")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="220" fill={`url(#${u("bg")})`} />
      <circle cx="200" cy="110" r="110" fill={`url(#${u("halo")})`} />
      <g stroke="#cfe0ff" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="3 5">
        <path d="M120 60 176 94M286 60 226 94M112 150l64-28M292 146l-66-24" />
      </g>

      {tiles.map(({ label, x, y, rotate }) => (
        <g key={label} transform={`translate(${x} ${y}) rotate(${rotate} 50 24)`}>
          <rect width="100" height="48" rx="11" fill={`url(#${u("tile")})`} stroke="#e1ecff" strokeOpacity="0.85" strokeWidth="1.4" />
          <rect x="3" y="3" width="94" height="18" rx="8" fill="#fff" opacity="0.14" />
          <text x="50" y="29" textAnchor="middle" fill="#fff" fontWeight="600" fontSize="14" fontFamily="var(--font-inter), sans-serif">
            {label}
          </text>
        </g>
      ))}

      <g filter={`url(#${u("glow")})`}>
        <rect x="168" y="78" width="64" height="64" rx="16" fill="#0d1450" stroke="#9fc4ff" strokeWidth="2" />
        <path d="m186 96 14 14-14 14M206 124h12" stroke="#e8f1ff" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
