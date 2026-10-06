type Chip = {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  skew: number;
  fontSize: number;
  delay: number;
};

/** Frosted-glass labels hovering above the desk — pure decoration, no interaction. */
const chips: Chip[] = [
  { label: "Computer Vision", x: 420, y: 108, width: 156, height: 64, rotate: -4, skew: -4, fontSize: 19, delay: 0 },
  { label: "Prompt Engineering", x: 656, y: 86, width: 112, height: 70, rotate: 14, skew: 6, fontSize: 12.5, delay: 1.6 },
  { label: "Claude Code", x: 616, y: 144, width: 126, height: 70, rotate: 12, skew: 4, fontSize: 17, delay: 0.8 },
  { label: "Prompt Engineering", x: 575, y: 204, width: 148, height: 62, rotate: 8, skew: 5, fontSize: 15.5, delay: 2.2 },
];

function GlassChip({ label, x, y, width, height, rotate, skew, fontSize, delay }: Chip) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <g className="animate-scene-float" style={{ animationDelay: `${delay}s` }}>
        <g transform={`skewY(${skew})`}>
          <rect width={width} height={height} rx="12" fill="url(#hero-glass)" stroke="url(#hero-glass-stroke)" strokeWidth="1.6" />
          <rect x="3" y="3" width={width - 6} height={height * 0.42} rx="9" fill="#fff" opacity="0.12" />
          <text
            x={width / 2}
            y={height / 2 + fontSize * 0.34}
            textAnchor="middle"
            fill="#fff"
            fontWeight="600"
            fontSize={fontSize}
            fontFamily="var(--font-inter), sans-serif"
          >
            {label}
          </text>
        </g>
      </g>
    </g>
  );
}

function AiChip() {
  return (
    <g transform="translate(120 114) rotate(-3)">
      <g className="animate-scene-float" style={{ animationDelay: "0.4s" }}>
        <rect x="-16" y="-8" width="116" height="96" rx="14" fill="#fff" opacity="0.12" stroke="#cfe0ff" strokeOpacity="0.5" />
        <rect width="102" height="92" rx="12" fill="url(#hero-glass-strong)" stroke="url(#hero-glass-stroke)" strokeWidth="1.6" />
        <path d="M0 40 40 0h30L0 68V40Z" fill="#fff" opacity="0.1" />
        <text x="14" y="26" fill="#fff" fontWeight="600" fontSize="14" fontFamily="var(--font-inter), sans-serif" opacity="0.85">
          AI
        </text>
        <text x="51" y="64" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="32" fontFamily="var(--font-inter), sans-serif">
          AI
        </text>
      </g>
    </g>
  );
}

const neonLines = ["Build", "Learn", "Share", "Grow"];

function NeonScript() {
  const lines = neonLines.map((word, i) => (
    <text key={word} x={8 + i * 5} y={38 + i * 44} fontSize="38">
      {word}
    </text>
  ));

  return (
    <g transform="translate(860 62) rotate(-6)" fontFamily="var(--font-script), cursive" fontWeight="600">
      <g fill="#ff9a3d" filter="url(#hero-blur-md)" className="animate-scene-glow">
        {lines}
      </g>
      <g fill="#ffe9c4" filter="url(#hero-neon)">
        {lines}
      </g>
    </g>
  );
}

export function FloatingChips() {
  return (
    <g>
      <AiChip />
      {chips.map((chip) => (
        <GlassChip key={`${chip.label}-${chip.x}`} {...chip} />
      ))}
      <NeonScript />
    </g>
  );
}
