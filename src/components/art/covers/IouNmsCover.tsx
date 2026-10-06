import { useId } from "react";

/** Two panels: overlapping boxes (IoU) and the survivors after non-max suppression (NMS). */
export function IouNmsCover({ className }: { className?: string }) {
  const id = useId();
  const u = (name: string) => `${id}-${name}`;

  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={u("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#070b36" />
          <stop offset="1" stopColor="#1d1172" />
        </linearGradient>
        <filter id={u("glow")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="220" fill={`url(#${u("bg")})`} />
      <path d="M200 20v180" stroke="#6f7bff" strokeOpacity="0.3" strokeDasharray="3 5" />

      <g fontFamily="var(--font-inter), sans-serif" fontWeight="600" fontSize="15" fill="#fff" textAnchor="middle">
        <text x="105" y="40">
          IoU
        </text>
        <text x="296" y="40">
          NMS
        </text>
      </g>

      {/* IoU: three overlapping candidates */}
      <g fill="none" strokeWidth="2.2" filter={`url(#${u("glow")})`}>
        <rect x="38" y="62" width="92" height="104" stroke="#2f9bff" />
        <rect x="64" y="86" width="60" height="62" stroke="#31d6ff" />
        <rect x="80" y="104" width="72" height="62" stroke="#3a7bff" />
        <rect x="104" y="72" width="48" height="40" stroke="#5ab8ff" strokeOpacity="0.7" />
      </g>
      <g fill="#7fe3ff">
        {[
          [38, 62],
          [130, 62],
          [38, 166],
          [152, 166],
          [64, 86],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" />
        ))}
      </g>

      {/* arrow between panels */}
      <path d="M170 116h46m-8-6 8 6-8 6" stroke="#9fb4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* NMS: boxes that survive */}
      <g fill="none" strokeWidth="2.2" filter={`url(#${u("glow")})`}>
        <rect x="236" y="62" width="70" height="86" stroke="#ff4fd8" />
        <rect x="272" y="76" width="64" height="76" stroke="#ff9a3d" />
        <rect x="320" y="60" width="44" height="62" stroke="#ffb94d" />
        <rect x="252" y="122" width="44" height="46" stroke="#a46bff" />
        <rect x="334" y="122" width="38" height="46" stroke="#c07bff" strokeOpacity="0.8" />
      </g>
      <g fill="#ffd36b">
        {[
          [236, 62],
          [306, 148],
          [336, 76],
          [364, 60],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" />
        ))}
      </g>
    </svg>
  );
}
