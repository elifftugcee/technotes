import { useId } from "react";
import { r1, seededRandom } from "../seeded";

const rand = seededRandom(5);
const lineColors = ["#5aa0ff", "#9d7bff", "#5fe0c8", "#f59e6c", "#c9d4ff"];

function codeLines(count: number, x: number, y: number, maxWidth: number) {
  return Array.from({ length: count }, (_, i) => ({
    x: x + (i % 4 === 2 ? 8 : 0),
    y: y + i * 6,
    w: r1(10 + rand() * maxWidth),
    fill: lineColors[Math.floor(rand() * lineColors.length)],
  }));
}

const leftLines = codeLines(15, 66, 60, 70);

/** Two glowing monitors on a dark desk — "which stack should I pick?" */
export function TechStackCover({ className }: { className?: string }) {
  const id = useId();
  const u = (name: string) => `${id}-${name}`;

  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={u("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0a0e3a" />
          <stop offset="1" stopColor="#2a1a7a" />
        </linearGradient>
        <linearGradient id={u("screen")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0b1148" />
          <stop offset="1" stopColor="#1a1068" />
        </linearGradient>
        <radialGradient id={u("glow")}>
          <stop stopColor="#7a6bff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#7a6bff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="220" fill={`url(#${u("bg")})`} />
      <ellipse cx="200" cy="100" rx="220" ry="90" fill={`url(#${u("glow")})`} />

      {/* left monitor: code */}
      <rect x="48" y="36" width="152" height="108" rx="6" fill="#141a5c" stroke="#5a64d8" strokeWidth="1.5" />
      <rect x="54" y="42" width="140" height="96" rx="3" fill={`url(#${u("screen")})`} />
      {leftLines.map(({ x, y, w, fill }, i) => (
        <rect key={i} x={x} y={y} width={w} height="2.2" rx="1" fill={fill} opacity="0.85" />
      ))}

      {/* right monitor: stack diagram */}
      <rect x="214" y="30" width="146" height="114" rx="6" fill="#141a5c" stroke="#5a64d8" strokeWidth="1.5" />
      <rect x="220" y="36" width="134" height="102" rx="3" fill={`url(#${u("screen")})`} />
      <g fill="none" strokeWidth="1.6">
        <rect x="236" y="48" width="48" height="20" rx="4" stroke="#5fe0c8" />
        <rect x="294" y="48" width="48" height="20" rx="4" stroke="#9d7bff" />
        <rect x="236" y="80" width="106" height="20" rx="4" stroke="#5aa0ff" />
        <rect x="236" y="112" width="48" height="18" rx="4" stroke="#f59e6c" />
        <rect x="294" y="112" width="48" height="18" rx="4" stroke="#c9d4ff" />
        <path d="M260 68v12M318 68v12M260 100v12M318 100v12" stroke="#8aa0ff" strokeOpacity="0.7" />
      </g>

      {/* stands + desk */}
      <path d="M118 144h12v18h-12zM278 144h12v18h-12z" fill="#2a2f7e" />
      <path d="M0 166h400v54H0z" fill="#0c0f40" />
      <path d="M0 166h400" stroke="#6f7bff" strokeOpacity="0.5" />
      <path d="M96 182h208l-10 14H106l-10-14Z" fill="#1a1f6a" stroke="#4a54c8" />
    </svg>
  );
}
