import { PlantSymbols } from "./hero/Plants";
import { r1, seededRandom } from "./seeded";

const rand = seededRandom(33);
const codeLines = Array.from({ length: 12 }, (_, i) => ({
  y: 176 + i * 7,
  w: r1(16 + rand() * 64),
  fill: ["#5aa0ff", "#9d7bff", "#5fe0c8", "#f59e6c", "#c9d4ff"][Math.floor(rand() * 5)],
}));

const books = [
  { y: 232, label: "Vision", fill: "#3a2f9a", accent: "#7a6bff", offset: 14 },
  { y: 252, label: "Code", fill: "#2a2478", accent: "#a58bff", offset: 0 },
  { y: 272, label: "Better Software", fill: "#1f1a66", accent: "#d28bff", offset: 22 },
];

const scriptLines = ["Learn", "Build", "Share", "Grow"];

/**
 * Hero art for the articles page: a sunset mountain window above a tidy desk
 * (laptop, mug, a stack of books). Theme-independent — the page fades it into the canvas.
 */
export function ArticlesScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 960 380"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="art-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7f8cec" />
          <stop offset="0.5" stopColor="#d79bd8" />
          <stop offset="1" stopColor="#ffc9b0" />
        </linearGradient>
        <linearGradient id="art-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9b97e0" />
          <stop offset="1" stopColor="#c9a6e0" />
        </linearGradient>
        <linearGradient id="art-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6a62c8" />
          <stop offset="1" stopColor="#8f72d0" />
        </linearGradient>
        <linearGradient id="art-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b2a93" />
          <stop offset="1" stopColor="#1d1a62" />
        </linearGradient>
        <linearGradient id="art-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe9ff" />
          <stop offset="1" stopColor="#bfb3f0" />
        </linearGradient>
        <linearGradient id="art-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a0e3a" />
          <stop offset="1" stopColor="#1c1470" />
        </linearGradient>
        <linearGradient id="art-mug" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d9d3f2" />
        </linearGradient>
        <radialGradient id="art-sun">
          <stop offset="0" stopColor="#fff0cc" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff0cc" stopOpacity="0" />
        </radialGradient>
        <filter id="art-blur" x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="art-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <PlantSymbols />
      </defs>

      {/* window view */}
      <rect width="960" height="380" fill="url(#art-sky)" />
      <circle cx="560" cy="200" r="120" fill="url(#art-sun)" />
      <path d="M0 250 90 170l60 50 80-86 90 96 70-60 100 70 80-90 110 100 80-60 70 60 70-40v190H0Z" fill="url(#art-far)" opacity="0.9" />
      <path d="M0 290 120 190l60 50 90-110 100 120 60-50 120 80 100-120 120 110 80-60 110 90v80H0Z" fill="url(#art-mid)" />
      <path d="m270 130-22 34 16-8 12 14 14-12-20-28Zm330-14-26 40 18-9 14 16 16-14-22-33ZM96 168l-18 28 14-6 8 10 12-10-16-22Z" fill="#fbeeff" opacity="0.92" />
      <ellipse cx="420" cy="270" rx="480" ry="30" fill="#fff" opacity="0.5" filter="url(#art-blur)" />
      <path d="M0 330c80-40 160-50 240-30s170 30 260 0 180-30 460 10v70H0Z" fill="#3f348f" opacity="0.8" />
      {[210, 236, 262, 310, 338, 690, 716].map((x, i) => (
        <path key={x} d={`m${x} ${268 + (i % 3) * 6} -10 36h20l-10-36Zm0 -16 -8 26h16l-8-26Z`} fill="#2a2573" opacity="0.85" />
      ))}

      {/* window frame */}
      <rect x="116" y="0" width="22" height="320" fill="#2b2878" opacity="0.7" />
      <rect x="780" y="0" width="180" height="380" fill="url(#art-wall)" />
      <rect x="776" y="0" width="12" height="330" fill="#241f6a" />

      {/* floating leaf + handwriting on the glass */}
      <path d="M826 42c14-8 30-2 34 12-14 8-30 4-34-12Z" fill="#4f8a3a" transform="rotate(24 842 54)" />
      <g
        transform="translate(846 84) rotate(-8)"
        fontFamily="var(--font-script), cursive"
        fontWeight="600"
        fontSize="26"
        fill="#fff3e0"
        filter="url(#art-glow)"
        opacity="0.95"
      >
        {scriptLines.map((word, i) => (
          <text key={word} x={i * 4} y={i * 30} textAnchor="start" fontStyle="italic">
            {word}
          </text>
        ))}
      </g>

      {/* desk */}
      <path d="M300 306 960 276v104H300V306Z" fill="url(#art-desk)" />
      <path d="M300 307 960 277" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" />

      {/* plants */}
      <use href="#hero-plant-tall" x="60" y="130" width="130" height="185" />
      <use href="#hero-plant-bush" x="340" y="226" width="64" height="80" />
      <use href="#hero-plant-flower" x="866" y="212" width="52" height="66" />

      {/* mug */}
      <g>
        <ellipse cx="500" cy="316" rx="30" ry="6" fill="#000" opacity="0.14" />
        <path d="M526 270c18-2 20 26 2 30-3 .6-6 .6-9 0" fill="none" stroke="#ece8fb" strokeWidth="7" strokeLinecap="round" />
        <path d="M472 252h56v58c0 4-3 7-7 7h-42c-4 0-7-3-7-7v-58Z" fill="url(#art-mug)" />
        <ellipse cx="500" cy="252" rx="28" ry="5" fill="#f6f4ff" />
        <ellipse cx="500" cy="252" rx="24" ry="3.4" fill="#d9d3f6" />
        <circle cx="500" cy="282" r="9" fill="none" stroke="#1d1a4a" strokeWidth="2" />
        <path d="M495 282c3-5 7-5 10 0-3 5-7 5-10 0Z" fill="#1d1a4a" />
      </g>

      {/* laptop */}
      <g>
        <path d="M566 158 726 150l-8 132-148 6-4-130Z" fill="#14185a" stroke="#4a50b8" strokeWidth="1.2" />
        <path d="M572 164 720 157l-7 120-139 5-2-118Z" fill="url(#art-screen)" />
        {codeLines.map(({ y, w, fill }, i) => (
          <rect key={i} x={582 + (i % 4 === 2 ? 8 : 0)} y={y - 8 + i * 0.3} width={w} height="2.4" rx="1.2" fill={fill} opacity="0.85" />
        ))}
        <ellipse cx="672" cy="210" rx="40" ry="34" fill="#6a7bff" opacity="0.25" />
        <path d="M560 288 730 280l30 18-190 14-10-24Z" fill="#b4bdf0" />
        <path d="m572 312 190-14 4 5-190 15-4-6Z" fill="#8791d8" />
      </g>

      {/* stack of books */}
      {books.map(({ y, label, fill, accent, offset }) => (
        <g key={label}>
          <rect x={806 + offset} y={y} width={150 - offset} height="19" rx="2" fill={fill} />
          <rect x={806 + offset} y={y} width="6" height="19" rx="2" fill={accent} />
          <text x={822 + offset} y={y + 13} fontSize="9.5" fontWeight="600" fill="#e8e0ff" fontFamily="var(--font-inter), sans-serif">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
