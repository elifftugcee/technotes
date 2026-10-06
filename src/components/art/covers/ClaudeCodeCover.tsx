import { useId } from "react";
import { r1, seededRandom } from "../seeded";

const rand = seededRandom(3);
const colors = ["#7fb0ff", "#a58bff", "#6df0ff", "#ffb36b", "#ffffff"];
const stars = Array.from({ length: 90 }, (_, i) => {
  // denser around the head (centre-left), sparse elsewhere
  const nearHead = i < 60;
  return {
    x: r1(nearHead ? 150 + rand() * 190 : rand() * 560),
    y: r1(nearHead ? 14 + rand() * 150 : rand() * 250),
    r: r1(0.5 + rand() * 1.6),
    fill: colors[Math.floor(rand() * colors.length)],
    delay: r1(rand() * 4),
  };
});

/** Featured cover: a glowing head in profile facing a stack of floating UI panels. */
export function ClaudeCodeCover({ className }: { className?: string }) {
  const id = useId();
  const u = (name: string) => `${id}-${name}`;

  return (
    <svg viewBox="0 0 560 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={u("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#040824" />
          <stop offset="0.55" stopColor="#0a1450" />
          <stop offset="1" stopColor="#101a6a" />
        </linearGradient>
        <linearGradient id={u("head")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#7aa6ff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#8f4dff" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={u("halo")}>
          <stop stopColor="#5b6dff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#5b6dff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={u("panel")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#5a8bff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#7a4dff" stopOpacity="0.22" />
        </linearGradient>
        <filter id={u("glow")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="560" height="250" fill={`url(#${u("bg")})`} />
      <ellipse cx="357" cy="100" rx="150" ry="120" fill={`url(#${u("halo")})`} />

      <g>
        {stars.map(({ x, y, r, fill, delay }) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={fill} className="animate-twinkle" style={{ animationDelay: `${delay}s` }} />
        ))}
      </g>

      {/* head in profile, facing right */}
      <g transform="translate(92 6)" filter={`url(#${u("glow")})`}>
        <path
          d="M178 160c-12-52 14-112 76-114 52-2 84 34 78 84l16 28-12 8 14 20-16 8 6 14-12 10 10 16-20 10-14 4v32h-90v-34c-20-14-32-48-36-86Z"
          fill={`url(#${u("head")})`}
          stroke="#7fb0ff"
          strokeOpacity="0.9"
          strokeWidth="1.4"
        />
        <circle cx="262" cy="118" r="26" fill="#08123c" stroke="#7fe3ff" strokeWidth="2.2" />
        <circle cx="262" cy="118" r="15" fill="none" stroke="#7fb0ff" strokeWidth="1.4" />
        <path d="M236 98c-6-26 12-44 34-44" fill="none" stroke="#a9c6ff" strokeWidth="3" strokeLinecap="round" />
        <path d="M312 118c1-5 6-6 10-3" stroke="#bcd6ff" strokeWidth="1.6" fill="none" />
      </g>
      <g transform="translate(92 6)">
        <path d="M150 250c4-34 40-50 96-50s96 16 100 50H150Z" fill="#05092e" opacity="0.92" />
        <path d="M170 250c6-26 36-38 78-38" stroke="#4d6dff" strokeOpacity="0.5" fill="none" />
      </g>

      {/* floating UI panels */}
      <g stroke="#7fb4ff" strokeOpacity="0.8" strokeWidth="1.3" fill={`url(#${u("panel")})`}>
        <rect x="348" y="104" width="38" height="46" rx="5" opacity="0.8" />
        <rect x="396" y="82" width="52" height="40" rx="5" opacity="0.8" />
        <rect x="454" y="104" width="46" height="62" rx="5" fill="#6a3fe0" fillOpacity="0.3" />
        <rect x="334" y="162" width="62" height="54" rx="6" opacity="0.85" />
        <rect x="462" y="180" width="54" height="52" rx="5" opacity="0.7" />
      </g>
      <g filter={`url(#${u("glow")})`}>
        <path d="M396 132h92a10 10 0 0 1 10 10v50a10 10 0 0 1-10 10h-60l-14 14v-14h-18a10 10 0 0 1-10-10v-50a10 10 0 0 1 10-10Z" fill="#2f6bff" fillOpacity="0.5" stroke="#9cc8ff" strokeWidth="1.8" />
        <circle cx="414" cy="166" r="12" fill="none" stroke="#e6f1ff" strokeWidth="1.8" />
        <path d="M410 166h8M414 162v8" stroke="#e6f1ff" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M436 158h44M436 168h34M436 178h40" stroke="#dbe9ff" strokeOpacity="0.85" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <g stroke="#dbe9ff" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round">
        <path d="M356 116h22M356 126h16M356 136h20" />
        <path d="M404 94h34M404 104h24" />
        <path d="M462 120h28M462 132h20M462 144h26" />
        <path d="M344 178h40M344 188h30M344 198h36" />
      </g>
      <rect x="362" y="76" width="30" height="26" rx="8" fill="#3c7bff" fillOpacity="0.6" stroke="#aad2ff" strokeWidth="1.4" />
    </svg>
  );
}
