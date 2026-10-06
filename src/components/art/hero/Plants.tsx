/**
 * Leafy plants for the hero scene. `PlantSymbols` defines three reusable <symbol>s;
 * `PlantPlacements` instances them around the desk.
 */

const leafAngles = [-62, -42, -24, -8, 8, 24, 42, 62];

function Leaves({ lengths, fills }: { lengths: number[]; fills: string[] }) {
  return (
    <>
      {leafAngles.map((angle, i) => {
        const length = lengths[i % lengths.length];
        return (
          <path
            key={angle}
            d={`M60 112 C ${60 - 20} ${112 - length * 0.45}, ${60 - 16} ${112 - length * 0.8}, 60 ${112 - length} C ${60 + 16} ${112 - length * 0.8}, ${60 + 20} ${112 - length * 0.45}, 60 112Z`}
            transform={`rotate(${angle} 60 112)`}
            fill={fills[i % fills.length]}
          />
        );
      })}
    </>
  );
}

export function PlantSymbols() {
  return (
    <>
      <linearGradient id="hero-pot" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#b3a8ea" />
        <stop offset="1" stopColor="#6e62c4" />
      </linearGradient>

      <symbol id="hero-plant-tall" viewBox="0 0 120 170" overflow="visible">
        <Leaves lengths={[96, 112, 88, 104, 100, 90, 108, 84]} fills={["#1c6a66", "#2f9484", "#14504f", "#27806f"]} />
        <path d="M36 112h48l-6 54H42l-6-54Z" fill="url(#hero-pot)" />
        <ellipse cx="60" cy="112" rx="24" ry="5" fill="#8f86d6" />
      </symbol>

      <symbol id="hero-plant-bush" viewBox="0 0 120 150" overflow="visible">
        <Leaves lengths={[56, 68, 52, 62, 58, 50, 66, 48]} fills={["#2a8f7a", "#1d6e66", "#3aa88a", "#175a58"]} />
        <path d="M38 112h44l-5 36H43l-5-36Z" fill="url(#hero-pot)" />
        <ellipse cx="60" cy="112" rx="22" ry="4.5" fill="#8f86d6" />
      </symbol>

      <symbol id="hero-plant-flower" viewBox="0 0 120 150" overflow="visible">
        <Leaves lengths={[40, 48, 36, 44, 42, 34, 46, 32]} fills={["#2f8f6e", "#3ba37c", "#23705e"]} />
        {[
          [34, 70],
          [60, 56],
          [86, 72],
          [48, 84],
          [74, 88],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" fill="#f6b34e" opacity="0.92" />
        ))}
        <path d="M40 112h40l-5 34H45l-5-34Z" fill="url(#hero-pot)" />
        <ellipse cx="60" cy="112" rx="20" ry="4" fill="#8f86d6" />
      </symbol>
    </>
  );
}

type Placement = { symbol: string; x: number; y: number; width: number; height: number; opacity?: number };

const placements: Placement[] = [
  // window sill (left)
  { symbol: "hero-plant-bush", x: 40, y: 268, width: 64, height: 80 },
  { symbol: "hero-plant-flower", x: 92, y: 258, width: 60, height: 76 },
  { symbol: "hero-plant-bush", x: 78, y: 300, width: 76, height: 95 },
  // tall plant behind the monitor
  { symbol: "hero-plant-tall", x: 165, y: 158, width: 120, height: 170 },
  // between monitor and laptop
  { symbol: "hero-plant-bush", x: 548, y: 262, width: 92, height: 114 },
  { symbol: "hero-plant-flower", x: 640, y: 292, width: 56, height: 70, opacity: 0.9 },
  // right edge
  { symbol: "hero-plant-tall", x: 850, y: 250, width: 100, height: 140 },
  // shelf unit (small)
  { symbol: "hero-plant-bush", x: 738, y: 66, width: 44, height: 56, opacity: 0.85 },
  { symbol: "hero-plant-flower", x: 800, y: 150, width: 40, height: 50, opacity: 0.85 },
];

export function PlantPlacements() {
  return (
    <>
      {placements.map(({ symbol, opacity, ...box }, index) => (
        <use key={index} href={`#${symbol}`} opacity={opacity} {...box} />
      ))}
    </>
  );
}

/** Trailing plants hanging from the shelf board above the monitor. */
export function HangingPlants() {
  const strands = [
    { x: 372, drops: [52, 70, 40] },
    { x: 404, drops: [64, 44, 78] },
    { x: 438, drops: [48, 62, 36] },
    { x: 560, drops: [58, 40, 72] },
    { x: 596, drops: [44, 66, 50] },
  ];

  return (
    <g>
      {strands.map(({ x, drops }, i) => (
        <g key={x} transform={`translate(${x} 92)`}>
          {drops.map((drop, j) => (
            <g key={j} transform={`translate(${(j - 1) * 9} 0)`}>
              <path d={`M0 0 C ${j % 2 ? 6 : -6} ${drop * 0.4}, ${j % 2 ? -4 : 4} ${drop * 0.7}, 0 ${drop}`} stroke="#1d6a62" strokeWidth="1.6" fill="none" />
              {[0.3, 0.55, 0.8, 1].map((t, k) => (
                <ellipse
                  key={k}
                  cx={(k % 2 ? 6 : -6) * (1 - t * 0.4)}
                  cy={drop * t}
                  rx="6"
                  ry="3.2"
                  fill={(i + j + k) % 2 ? "#2a8f7a" : "#1d6e66"}
                  transform={`rotate(${k % 2 ? 28 : -28} ${(k % 2 ? 6 : -6) * (1 - t * 0.4)} ${drop * t})`}
                />
              ))}
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}
