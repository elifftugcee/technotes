import { PlantSymbols } from "./hero/Plants";
import { r1, seededRandom } from "./seeded";

const rand = seededRandom(17);
const pines = Array.from({ length: 16 }, (_, i) => ({
  x: r1(300 + i * 22 + rand() * 10),
  h: r1(26 + rand() * 30),
}));
const shelfBooks = Array.from({ length: 9 }, (_, i) => ({
  x: 738 + i * 11,
  h: r1(30 + rand() * 20),
  fill: ["#3a2f9a", "#7a5bd6", "#2a2478", "#c08be8", "#4a6ad8"][i % 5],
}));
const words = ["Learn", "Build", "Share", "Grow"];

/**
 * Hero art for the About page: a window-side desk at dusk — big monitor, glowing lamp,
 * a mug, plants and a sleeping cat. Fills (and crops to) its parent.
 */
export function AboutScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 960 380" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="about-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6f7be8" />
          <stop offset="0.5" stopColor="#d894d6" />
          <stop offset="1" stopColor="#ffc3a6" />
        </linearGradient>
        <linearGradient id="about-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a92e0" />
          <stop offset="1" stopColor="#d1a3de" />
        </linearGradient>
        <linearGradient id="about-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b53c0" />
          <stop offset="1" stopColor="#8a6ccc" />
        </linearGradient>
        <linearGradient id="about-lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e5a1c7" />
          <stop offset="1" stopColor="#6a5bb8" />
        </linearGradient>
        <linearGradient id="about-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe9ff" />
          <stop offset="1" stopColor="#b9acee" />
        </linearGradient>
        <linearGradient id="about-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4c58d8" />
          <stop offset="0.6" stopColor="#c785d6" />
          <stop offset="1" stopColor="#ffb8a0" />
        </linearGradient>
        <linearGradient id="about-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e2486" />
          <stop offset="1" stopColor="#161255" />
        </linearGradient>
        <linearGradient id="about-mug" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d9d3f2" />
        </linearGradient>
        <radialGradient id="about-lamp">
          <stop offset="0" stopColor="#fff4d6" />
          <stop offset="0.45" stopColor="#ffd9a0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffb25e" stopOpacity="0" />
        </radialGradient>
        <filter id="about-blur" x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="about-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <PlantSymbols />
      </defs>

      {/* the view: dusk mountains over a lake */}
      <rect width="960" height="380" fill="url(#about-sky)" />
      <circle cx="430" cy="215" r="150" fill="url(#about-lamp)" opacity="0.6" />
      <path d="M0 250 80 150l56 56 70-90 86 110 60-50 90 70 80-110 100 100 70-50 100 70 70-40v80H0Z" fill="url(#about-far)" opacity="0.92" />
      <path d="M0 270 110 170l60 54 90-120 96 130 56-44 110 80 90-130 130 120 80-60 138 80v60H0Z" fill="url(#about-mid)" />
      <path d="m260 110-22 34 16-8 12 14 14-12-20-28Zm330-26-28 44 18-10 14 16 18-14-22-36ZM86 148l-16 26 12-6 8 10 10-10-14-20Z" fill="#fff4ff" opacity="0.92" />
      <ellipse cx="420" cy="262" rx="500" ry="26" fill="#fff" opacity="0.45" filter="url(#about-blur)" />
      <rect y="262" width="960" height="40" fill="url(#about-lake)" />
      {pines.map(({ x, h }) => (
        <path key={x} d={`M${x - 8} 262 L${x} ${262 - h} L${x + 8} 262Z`} fill="#241e6e" opacity="0.85" />
      ))}

      {/* window frame + dark wall with shelf on the right */}
      <rect x="146" y="0" width="22" height="300" fill="#2b2878" opacity="0.65" />
      <rect x="716" y="0" width="244" height="300" fill="url(#about-wall)" />
      <rect x="708" y="0" width="12" height="304" fill="#241f6a" />
      <rect x="730" y="44" width="230" height="6" fill="#4a3fb0" opacity="0.8" />
      {shelfBooks.map(({ x, h, fill }) => (
        <rect key={x} x={x} y={44 - h} width="9" height={h} rx="1.2" fill={fill} opacity="0.9" />
      ))}
      <rect x="730" y="130" width="230" height="5" fill="#4a3fb0" opacity="0.6" />

      {/* neon script */}
      <g
        transform="translate(858 78) rotate(-8)"
        fontFamily="var(--font-script), cursive"
        fontWeight="600"
        fontSize="30"
        fill="#ffe9c4"
        filter="url(#about-glow)"
      >
        {words.map((word, i) => (
          <text key={word} x={i * 4} y={i * 34} fontStyle="italic">
            {word}
          </text>
        ))}
      </g>

      {/* desk */}
      <path d="M0 304 960 292v88H0V304Z" fill="url(#about-desk)" />
      <path d="M0 305 960 293" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" />

      {/* plants */}
      <use href="#hero-plant-tall" x="6" y="130" width="150" height="212" />
      <use href="#hero-plant-bush" x="700" y="230" width="70" height="88" />
      <use href="#hero-plant-flower" x="884" y="216" width="56" height="70" />

      {/* monitor */}
      <g>
        <path d="M512 296h18v-20h-18zM568 296h18v-20h-18z" fill="#2c2f7a" />
        <path d="M470 296h156l10 10H460l10-10Z" fill="#a9b2ea" />
        <rect x="392" y="116" width="284" height="164" rx="7" fill="#12165a" stroke="#4a50b8" strokeWidth="1.5" />
        <rect x="398" y="122" width="272" height="152" rx="3" fill="url(#about-screen)" />
        <path d="M398 222 460 168l40 40 60-64 110 90v40H398v-44Z" fill="#473a98" />
        <path d="M398 244 470 214l50 22 70-34 80 36v10H398Z" fill="#2c2575" />
        <rect x="408" y="130" width="46" height="4" rx="2" fill="#fff" opacity="0.6" />
        <rect x="408" y="140" width="30" height="4" rx="2" fill="#fff" opacity="0.4" />
      </g>

      {/* keyboard + mouse */}
      <path d="M452 302h176l-12 18H438l14-18Z" fill="#161a52" stroke="#3a3f9a" />
      <ellipse cx="672" cy="316" rx="20" ry="9" fill="#222a74" />

      {/* mug */}
      <g>
        <ellipse cx="318" cy="324" rx="30" ry="6" fill="#000" opacity="0.14" />
        <path d="M346 280c18-2 20 26 2 30-3 .6-6 .6-9 0" fill="none" stroke="#ece8fb" strokeWidth="7" strokeLinecap="round" />
        <path d="M292 262h56v56c0 4-3 7-7 7h-42c-4 0-7-3-7-7v-56Z" fill="url(#about-mug)" />
        <ellipse cx="320" cy="262" rx="28" ry="5" fill="#f6f4ff" />
        <g fill="#12163a" fontSize="9" fontWeight="700" fontFamily="var(--font-inter), sans-serif">
          <text x="300" y="283">Good</text>
          <text x="300" y="294">Ideas</text>
          <text x="300" y="305">Better</text>
          <text x="300" y="316">Code</text>
        </g>
      </g>

      {/* lamps */}
      <circle cx="116" cy="294" r="34" fill="url(#about-lamp)" />
      <circle cx="116" cy="296" r="11" fill="#fff4d6" />
      <path d="M756 292v-70" stroke="#2c2f7a" strokeWidth="4" />
      <circle cx="756" cy="196" r="46" fill="url(#about-lamp)" />
      <circle cx="756" cy="196" r="24" fill="#fff0cc" opacity="0.95" />

      {/* sleeping cat */}
      <g>
        <ellipse cx="860" cy="338" rx="62" ry="22" fill="#5a5c86" />
        <path d="M806 340c-14 2-20 14-8 20 14 6 30-2 34-12" fill="#4a4c76" />
        <circle cx="824" cy="334" r="16" fill="#6a6c96" />
        <path d="m812 322 4-14 10 8ZM830 320l8-12 4 14Z" fill="#6a6c96" />
        <path d="M818 336q4 3 8 0M830 336q4 3 8 0" stroke="#2a2b52" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M884 332c18-4 30 6 28 16" stroke="#4a4c76" strokeWidth="9" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
