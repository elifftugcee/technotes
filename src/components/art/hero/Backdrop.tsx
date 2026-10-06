import { r1, seededRandom } from "../seeded";
import { HangingPlants } from "./Plants";

const rand = seededRandom(7);
const particles = Array.from({ length: 26 }, () => ({
  x: r1(560 + rand() * 400),
  y: r1(20 + rand() * 300),
  r: r1(0.8 + rand() * 1.6),
  delay: r1(rand() * 4),
}));

/** Window with alpine view (left), indigo interior wall, shelf unit, hanging plants and ambient glow. */
export function Backdrop() {
  return (
    <g>
      {/* Interior wall */}
      <rect width="980" height="500" fill="url(#hero-wall)" />
      <ellipse cx="430" cy="230" rx="330" ry="190" fill="url(#hero-ambient)" />

      {/* Window onto the mountains */}
      <g clipPath="url(#hero-window-clip)">
        <rect width="350" height="340" fill="url(#hero-sky)" />
        <ellipse cx="90" cy="70" rx="150" ry="46" fill="#fff" opacity="0.35" filter="url(#hero-blur-md)" />
        <path d="M-10 250 60 150l36 44 38-78 56 92 40-52 60 80 70-42v120H-10Z" fill="#8c97ec" opacity="0.85" />
        <path d="M-10 290 40 200l30 40 44-90 50 100 34-44 62 76 60-30v100H-10Z" fill="#6c78dc" />
        <path d="m114 150-14 28 14-8 10 12 10-14-20-18Zm-72 50-12 20 12-6 9 8 7-12-16-10Z" fill="#fff" opacity="0.75" />
        <path d="M-10 330 70 262l40 30 60-48 80 70 60-34 90 60v40H-10Z" fill="#4a55c4" />
        <ellipse cx="150" cy="300" rx="190" ry="26" fill="#fff" opacity="0.45" filter="url(#hero-blur-md)" />
        {[286, 304, 322, 338].map((x, i) => (
          <path key={x} d={`m${x} ${300 - i * 6} -9 28h18l-9-28Zm0 -14 -7 22h14l-7-22Z`} fill="#17595c" opacity={0.85} />
        ))}
      </g>
      {/* Window frame */}
      <rect x="172" y="0" width="26" height="340" fill="#5a63c8" opacity="0.9" />
      <rect x="336" y="0" width="16" height="340" fill="#3a3fa8" />
      <rect x="0" y="334" width="352" height="12" fill="#c9c3f2" opacity="0.9" />

      {/* Warm light strip along the sill / back of the desk */}
      <rect x="0" y="342" width="620" height="6" fill="url(#hero-warm)" filter="url(#hero-blur-sm)" />

      {/* Shelf unit (right) */}
      <g>
        <rect x="722" y="46" width="146" height="296" rx="4" fill="#161a5a" stroke="#6e5bff" strokeOpacity="0.6" strokeWidth="2" />
        {[132, 218, 296].map((y) => (
          <rect key={y} x="724" y={y} width="142" height="5" fill="#2a2a86" />
        ))}
        <rect x="726" y="48" width="138" height="3" fill="#8a6bff" opacity="0.8" filter="url(#hero-blur-sm)" />
        {/* books */}
        {[
          [736, 252, 8, 44, "#7a6bf0"],
          [746, 258, 7, 38, "#d8b4a0"],
          [755, 250, 9, 46, "#4a6ad8"],
          [768, 262, 7, 34, "#e8a8c8"],
          [836, 256, 8, 40, "#6a8af0"],
        ].map(([x, y, w, h, fill]) => (
          <rect key={String(x)} x={x} y={y} width={w} height={h} rx="1.2" fill={String(fill)} opacity="0.85" />
        ))}
        {/* vases */}
        <path d="M744 214c-5-14 9-14 4-28h10c-5 14 9 14 4 28H744Z" fill="#2d2680" />
        <path d="M818 214c-5-12 8-12 3-24h9c-5 12 8 12 3 24h-15Z" fill="#7a5bd6" opacity="0.8" />
      </g>

      {/* Shelf board + hanging plants above the monitor */}
      <rect x="360" y="90" width="300" height="9" rx="2" fill="#37308f" />
      <rect x="360" y="96" width="300" height="3" fill="#8a73ff" opacity="0.5" />
      <g>
        <rect x="372" y="70" width="22" height="22" rx="3" fill="#3a3a98" />
        <rect x="610" y="64" width="26" height="28" rx="3" fill="#3a3a98" />
      </g>
      <HangingPlants />

      {/* Drifting light particles */}
      <g fill="#cfd8ff">
        {particles.map(({ x, y, r, delay }) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} className="animate-twinkle" style={{ animationDelay: `${delay}s` }} />
        ))}
      </g>
    </g>
  );
}
