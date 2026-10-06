import { useId } from "react";

type Box = { x: number; y: number; w: number; h: number; stroke: string; label?: string };

const boxes: Box[] = [
  { x: 56, y: 100, w: 50, h: 60, stroke: "#3ea0ff", label: "car 0.91" },
  { x: 108, y: 112, w: 38, h: 44, stroke: "#39e06a" },
  { x: 270, y: 108, w: 32, h: 62, stroke: "#39e06a", label: "person" },
  { x: 308, y: 82, w: 48, h: 104, stroke: "#4dff6a", label: "person 0.97" },
];

function Building({ x, w, h, shade }: { x: number; w: number; h: number; shade: string }) {
  const cols = Math.floor(w / 9);
  const rows = Math.floor(h / 13);
  return (
    <g>
      <rect x={x} y={124 - h} width={w} height={h} fill={shade} />
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => (
          <rect key={`${row}-${col}`} x={x + 4 + col * 9} y={124 - h + 5 + row * 13} width="4.5" height="7" fill="#9fb6d4" opacity={(row + col) % 3 ? 0.55 : 0.25} />
        )),
      )}
    </g>
  );
}

/** A street scene with object-detection boxes around a car and pedestrians. */
export function YoloCover({ className }: { className?: string }) {
  const id = useId();
  const u = (name: string) => `${id}-${name}`;

  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={u("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#a9c0dc" />
          <stop offset="1" stopColor="#e4ecf5" />
        </linearGradient>
        <linearGradient id={u("road")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#6d7684" />
          <stop offset="1" stopColor="#4a515d" />
        </linearGradient>
        <linearGradient id={u("body")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#3b424e" />
          <stop offset="1" stopColor="#1b1f27" />
        </linearGradient>
      </defs>

      <rect width="400" height="220" fill={`url(#${u("sky")})`} />

      {/* skyline */}
      <g>
        <Building x={150} w={34} h={96} shade="#7f94b0" />
        <Building x={186} w={30} h={110} shade="#93a6bf" />
        <Building x={218} w={38} h={86} shade="#7488a6" />
        <Building x={110} w={40} h={80} shade="#6a7f9c" />
        <Building x={258} w={44} h={74} shade="#6f84a2" />
        <Building x={0} w={70} h={118} shade="#586d8c" />
        <Building x={330} w={70} h={112} shade="#5a6f8f" />
      </g>
      {/* trees */}
      <path d="M0 150c10-34 30-44 52-34s28 8 40 24v20H0Z" fill="#2f6b32" />
      <path d="M400 150c-10-34-30-44-52-34s-28 8-40 24v20h92Z" fill="#2c6330" />

      {/* road in perspective */}
      <path d="M0 220V138l176-12h48l176 12v82Z" fill={`url(#${u("road")})`} />
      <path d="M0 150 176 126M400 150 224 126" stroke="#d8dde6" strokeWidth="2" opacity="0.7" />
      <path d="M200 126v94" stroke="#f1f3f6" strokeWidth="3" strokeDasharray="12 10" opacity="0.8" />
      <path d="M90 220 188 128M310 220 212 128" stroke="#e8ebf0" strokeWidth="2.4" strokeDasharray="10 9" opacity="0.6" />

      {/* car (front view) */}
      <g>
        <ellipse cx="200" cy="192" rx="62" ry="8" fill="#000" opacity="0.3" />
        <path d="M148 178c-4-22 2-38 18-46l10-14c3-4 8-6 14-6h20c6 0 11 2 14 6l10 14c16 8 22 24 18 46v12h-104v-12Z" fill={`url(#${u("body")})`} />
        <path d="M172 126h56l8 18h-72l8-18Z" fill="#9db2c8" opacity="0.85" />
        <path d="M186 130h28l4 12h-36l4-12Z" fill="#1a2330" opacity="0.5" />
        <rect x="168" y="162" width="64" height="12" rx="3" fill="#0e1218" />
        <rect x="186" y="168" width="28" height="9" rx="1.5" fill="#e8ecf2" />
        <rect x="190" y="171" width="20" height="3" fill="#586274" />
        <ellipse cx="164" cy="156" rx="10" ry="5" fill="#f4f8ff" />
        <ellipse cx="236" cy="156" rx="10" ry="5" fill="#f4f8ff" />
        <circle cx="200" cy="148" r="5" fill="#5f8cff" opacity="0.7" />
      </g>

      {/* pedestrians */}
      <g fill="#2b303a">
        <circle cx="286" cy="118" r="5" fill="#d9a98a" />
        <rect x="280" y="124" width="12" height="26" rx="4" />
        <rect x="281" y="150" width="4.5" height="18" />
        <rect x="288" y="150" width="4.5" height="18" />
        <circle cx="332" cy="98" r="6.5" fill="#d9a98a" />
        <path d="M322 106h20l4 44h-28l4-44Z" fill="#232831" />
        <rect x="324" y="150" width="7" height="30" fill="#1c2027" />
        <rect x="334" y="150" width="7" height="30" fill="#1c2027" />
      </g>
      <g fill="#4a5568">
        <rect x="70" y="112" width="30" height="34" rx="6" />
        <rect x="116" y="124" width="22" height="24" rx="5" />
      </g>

      {/* detection boxes */}
      <g fill="none" strokeWidth="2">
        {boxes.map(({ x, y, w, h, stroke, label }) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width={w} height={h} stroke={stroke} />
            {label && (
              <g>
                <rect x={x} y={y - 9} width={label.length * 3.7 + 6} height="9" fill={stroke} stroke="none" />
                <text x={x + 3} y={y - 2} fontSize="6.5" fontWeight="600" fill="#04120a" stroke="none" fontFamily="var(--font-inter), sans-serif">
                  {label}
                </text>
              </g>
            )}
          </g>
        ))}
        <rect x="150" y="116" width="100" height="76" stroke="#4dff6a" />
      </g>
    </svg>
  );
}
