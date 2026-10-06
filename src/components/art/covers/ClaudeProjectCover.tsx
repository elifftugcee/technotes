import { useId } from "react";
import { r1, seededRandom } from "../seeded";

const rand = seededRandom(9);
const lineColors = ["#5aa0ff", "#9d7bff", "#5fe0c8", "#f59e6c", "#c9d4ff"];
const lines = Array.from({ length: 17 }, (_, i) => ({
  y: 52 + i * 6,
  x: 44 + (i % 5 === 3 ? 8 : 0),
  w: r1(16 + rand() * 78),
  fill: lineColors[Math.floor(rand() * lineColors.length)],
}));

const steps = [
  { label: "Build", x: 236, y: 40, rotate: -4 },
  { label: "Test", x: 250, y: 92, rotate: -2 },
  { label: "Iterate", x: 232, y: 144, rotate: 3 },
];

/** A code editor next to a Build → Test → Iterate loop. */
export function ClaudeProjectCover({ className }: { className?: string }) {
  const id = useId();
  const u = (name: string) => `${id}-${name}`;

  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={u("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#070b36" />
          <stop offset="1" stopColor="#1a2a8a" />
        </linearGradient>
        <linearGradient id={u("panel")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4f8bff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#7b4dff" stopOpacity="0.3" />
        </linearGradient>
        <filter id={u("glow")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="220" fill={`url(#${u("bg")})`} />
      <ellipse cx="120" cy="100" rx="150" ry="90" fill="#4a5bff" opacity="0.2" />

      <rect x="26" y="30" width="190" height="124" rx="7" fill="#0b0f40" stroke="#4f64e0" strokeWidth="1.5" />
      <rect x="26" y="30" width="190" height="14" rx="7" fill="#161c68" />
      <g fill="#ff6b6b">
        <circle cx="38" cy="37" r="2.4" />
        <circle cx="46" cy="37" r="2.4" fill="#ffc14d" />
        <circle cx="54" cy="37" r="2.4" fill="#4de08a" />
      </g>
      {lines.map(({ x, y, w, fill }, i) => (
        <rect key={i} x={x} y={y} width={w} height="2.4" rx="1.2" fill={fill} opacity="0.85" />
      ))}
      <path d="M96 154h26l6 16H90l6-16Z" fill="#1c2278" />
      <rect x="70" y="168" width="78" height="6" rx="3" fill="#252c8c" />

      {/* Build → Test → Iterate */}
      <g filter={`url(#${u("glow")})`} fontFamily="var(--font-script), cursive" fontSize="24" fontWeight="600" fill="#cfe0ff">
        {steps.map(({ label, x, y, rotate }) => (
          <g key={label} transform={`translate(${x} ${y}) rotate(${rotate})`}>
            <rect width="128" height="38" rx="9" fill={`url(#${u("panel")})`} stroke="#8fb4ff" strokeWidth="1.4" />
            <text x="40" y="27">
              {label}
            </text>
            <circle cx="22" cy="19" r="6" fill="none" stroke="#cfe0ff" strokeWidth="1.8" />
          </g>
        ))}
      </g>
      <path d="M0 196h400v24H0z" fill="#06082a" />
    </svg>
  );
}
