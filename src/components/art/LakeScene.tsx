import { r1, seededRandom } from "./seeded";

const rand = seededRandom(23);
const stars = Array.from({ length: 36 }, () => ({
  x: r1(rand() * 400),
  y: r1(rand() * 80),
  r: r1(0.4 + rand() * 0.9),
  delay: r1(rand() * 4),
}));
const lights = [
  [286, 176],
  [301, 171],
  [316, 178],
  [330, 173],
];

function Pines({ x, scale = 1, flip = false }: { x: number; scale?: number; flip?: boolean }) {
  const trees = [
    [0, 90],
    [16, 70],
    [32, 100],
    [48, 62],
    [62, 84],
  ];
  return (
    <g transform={`translate(${x} 0) ${flip ? "scale(-1 1)" : ""} scale(${scale})`} fill="#1b1660">
      {trees.map(([dx, h]) => (
        <path key={dx} d={`M${dx - 9} 200 L${dx} ${200 - h} L${dx + 9} 200Z`} />
      ))}
    </g>
  );
}

/** Dusk mountains over a still lake, with a few warm cabin lights. Fills (and crops to) its parent. */
export function LakeScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="lake-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b3296" />
          <stop offset="0.5" stopColor="#b866a6" />
          <stop offset="1" stopColor="#f5a67c" />
        </linearGradient>
        <linearGradient id="lake-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8c7bd2" />
          <stop offset="1" stopColor="#c995d0" />
        </linearGradient>
        <linearGradient id="lake-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a4cb4" />
          <stop offset="1" stopColor="#7d5fc0" />
        </linearGradient>
        <linearGradient id="lake-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c47bb0" />
          <stop offset="1" stopColor="#2a2478" />
        </linearGradient>
        <filter id="lake-blur" x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <rect width="400" height="240" fill="url(#lake-sky)" />
      <g fill="#fff">
        {stars.map(({ x, y, r, delay }) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} className="animate-twinkle" style={{ animationDelay: `${delay}s` }} />
        ))}
      </g>

      <path d="M0 150 60 96l30 28 50-62 52 70 36-34 54 56 44-70 74 78v58H0Z" fill="url(#lake-far)" opacity="0.95" />
      <path d="M0 168 90 112l40 36 60-76 70 90 48-44 92 60v62H0Z" fill="url(#lake-mid)" />
      <path d="m196 76-14 22 10-5 8 9 9-8-13-18Zm-104 38-10 16 8-3 6 6 6-7-10-12Z" fill="#fff" opacity="0.88" />
      <ellipse cx="200" cy="168" rx="240" ry="14" fill="#f8cde6" opacity="0.5" filter="url(#lake-blur)" />

      <rect y="172" width="400" height="68" fill="url(#lake-water)" />
      <path d="M120 186h160M150 198h110M170 210h70" stroke="#ffd9b0" strokeOpacity="0.28" strokeWidth="1.5" />

      <Pines x={-6} scale={1.05} />
      <Pines x={410} scale={1.1} flip />

      {/* shore cabin lights, mirrored in the water */}
      {lights.map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="1.8" fill="#ffd58a" />
          <rect x={x - 1} y={y + 8} width="2" height="10" rx="1" fill="#ffd58a" opacity="0.3" />
        </g>
      ))}
    </svg>
  );
}
