import { useId } from "react";
import { r1, seededRandom } from "./seeded";

const rand = seededRandom(11);
const stars = Array.from({ length: 80 }, () => ({
  x: r1(rand() * 1536),
  y: r1(rand() * 100),
  r: r1(0.5 + rand() * 1.1),
  delay: r1(rand() * 4),
}));

const blossoms = Array.from({ length: 46 }, () => ({
  x: r1(1030 + rand() * 200),
  y: r1(34 + rand() * 90),
  r: r1(8 + rand() * 13),
  fill: ["#8a4bd8", "#a35cf0", "#6f3cc4", "#c27bff", "#d98cff"][Math.floor(rand() * 5)],
}));

const flowers = Array.from({ length: 16 }, () => ({
  x: r1(10 + rand() * 120),
  y: r1(88 + rand() * 70),
  r: r1(3.5 + rand() * 4.5),
}));

const ripples = [140, 152, 164, 178];

/** Twilight lake-and-mountains backdrop for the newsletter band. Fills (and crops to) its parent. */
export function NewsletterScene({ className }: { className?: string }) {
  const id = useId();
  const u = (name: string) => `${id}-${name}`;

  return (
    <svg viewBox="0 0 1536 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={u("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#0f1650" />
          <stop offset="0.45" stopColor="#35277f" />
          <stop offset="0.75" stopColor="#b8609a" />
          <stop offset="1" stopColor="#f2a47c" />
        </linearGradient>
        <linearGradient id={u("lake")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#a65aa0" />
          <stop offset="0.5" stopColor="#4a2f8a" />
          <stop offset="1" stopColor="#15145a" />
        </linearGradient>
        <linearGradient id={u("ridge")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#8a78d6" />
          <stop offset="1" stopColor="#4a3d9c" />
        </linearGradient>
        <radialGradient id={u("glow")}>
          <stop stopColor="#ffd2a0" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ff9ab0" stopOpacity="0" />
        </radialGradient>
        <filter id={u("blur")} x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <rect width="1536" height="200" fill={`url(#${u("sky")})`} />
      <g fill="#fff">
        {stars.map(({ x, y, r, delay }) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} className="animate-twinkle" style={{ animationDelay: `${delay}s` }} />
        ))}
      </g>
      <ellipse cx="800" cy="138" rx="420" ry="64" fill={`url(#${u("glow")})`} />

      {/* far + mid mountain ranges */}
      <path d="M420 150 560 86l58 30 96-76 70 54 56-34 86-70 110 86 74-34 92 62 40-24 70 62H420Z" fill={`url(#${u("ridge")})`} />
      <path d="m842 22-26 26 18-8 14 14 18-12-24-20Zm-262 70-20 16 14-5 10 9 12-10-16-10Z" fill="#fff" opacity="0.9" />
      <path d="M330 156 480 100l76 34 112-64 96 66 86-40 98 56 126-42 108 60v6H330Z" fill="#3a2f8c" opacity="0.92" />
      <ellipse cx="800" cy="146" rx="460" ry="16" fill="#f0bde0" opacity="0.5" filter={`url(#${u("blur")})`} />

      {/* lake + reflections */}
      <rect y="146" width="1536" height="54" fill={`url(#${u("lake")})`} />
      <ellipse cx="800" cy="158" rx="260" ry="6" fill="#ffd3a0" opacity="0.55" />
      {ripples.map((y, i) => (
        <path key={y} d={`M${500 + i * 40} ${y}h${420 - i * 60}`} stroke="#ffd9b0" strokeOpacity={0.25 - i * 0.04} strokeWidth="1.5" />
      ))}

      {/* blossoming tree + pines (right) */}
      <path d="M1100 200V96c0-7 7-7 7 0v104h-7Zm74 0V84c0-7 7-7 7 0v116h-7Z" fill="#1a1450" />
      {blossoms.map(({ x, y, r, fill }) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={fill} opacity="0.88" />
      ))}
      <g fill="#120f45">
        <path d="m1260 200 18-78 18 78h-36Zm44 0 14-58 14 58h-28Zm40 0 16-70 16 70h-32Z" />
      </g>

      {/* flowers (left) */}
      <path d="M0 200c20-40 70-52 130-34v34H0Z" fill="#140f48" opacity="0.85" />
      {flowers.map(({ x, y, r }) => (
        <g key={`${x}-${y}`} opacity="0.95">
          <circle cx={x} cy={y} r={r} fill="#e056c8" />
          <circle cx={x + r} cy={y + r * 0.6} r={r * 0.8} fill="#ff7ad9" />
          <circle cx={x - r * 0.6} cy={y + r * 0.9} r={r * 0.7} fill="#c43ab4" />
        </g>
      ))}

      {/* glowing devices on the shore (right) */}
      <g>
        <path d="M1296 200l30-30h96l18 30h-144Z" fill="#2c4cc0" opacity="0.9" />
        <path d="M1330 194l24-18h58l12 18h-94Z" fill="#6aa0ff" opacity="0.75" />
        <path d="M1440 200c4-20 22-30 40-26l14 26h-54Z" fill="#ffb25e" opacity="0.85" />
      </g>
    </svg>
  );
}
