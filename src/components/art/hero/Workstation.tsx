import { r1, seededRandom } from "../seeded";

const lineColors = ["#5aa0ff", "#9d7bff", "#5fe0c8", "#f59e6c", "#c9d4ff"];

const rand = seededRandom(21);
const codeLines = Array.from({ length: 27 }, (_, i) => ({
  y: r1(144 + i * 5.7),
  indent: [0, 0, 8, 8, 16, 0, 8][Math.floor(rand() * 7)],
  width: r1(14 + rand() * 62),
  color: lineColors[Math.floor(rand() * lineColors.length)],
}));
const sidebarLines = Array.from({ length: 20 }, (_, i) => ({
  y: r1(146 + i * 7),
  width: r1(10 + rand() * 24),
}));
const sparks = Array.from({ length: 44 }, () => ({
  x: r1(412 + rand() * 118),
  y: r1(160 + rand() * 138),
  r: r1(0.6 + rand() * 1.5),
  fill: ["#7aa7ff", "#a68bff", "#6df0ff"][Math.floor(rand() * 3)],
}));

function Monitor() {
  return (
    <g>
      {/* stand */}
      <path d="M352 306h16v46h-16zM468 306h16v46h-16z" fill="#262a74" />
      <rect x="318" y="346" width="210" height="9" rx="3" fill="#202468" />

      {/* bezel + screen */}
      <rect x="278" y="128" width="296" height="186" rx="7" fill="#0c0f33" stroke="#3a3f9a" strokeWidth="1.5" />
      <rect x="285" y="135" width="282" height="172" rx="3" fill="url(#hero-screen)" />
      <rect x="285" y="135" width="282" height="12" fill="#12164a" />

      {/* code editor */}
      <g opacity="0.9">
        {codeLines.map(({ y, indent, width, color }, i) => (
          <rect key={i} x={292 + indent} y={y} width={width} height="2.2" rx="1" fill={color} opacity="0.75" />
        ))}
        {sidebarLines.map(({ y, width }, i) => (
          <rect key={i} x={518} y={y} width={width} height="2" rx="1" fill="#9db4ff" opacity="0.4" />
        ))}
        <rect x="514" y="140" width="1" height="160" fill="#3a4290" />
      </g>

      {/* glowing head + brain */}
      <ellipse cx="462" cy="226" rx="70" ry="74" fill="url(#hero-brain-glow)" />
      <g transform="translate(404 168)">
        <path
          d="M12 64C6 30 28 8 56 8c28 0 44 20 42 46l6 10-5 6 8 14-8 5 3 7-5 7 6 8-8 6-6 3v22H30v-22c-10-10-20-26-18-40Z"
          fill="url(#hero-head)"
          stroke="#78a8ff"
          strokeWidth="1.4"
        />
        <path
          d="M26 54c-4-20 12-36 32-36s36 14 30 32c-5 12-22 14-32 10-10 4-26 2-30-6Z"
          fill="#2a3fd0"
          fillOpacity="0.45"
          stroke="#9cc4ff"
          strokeWidth="1.3"
        />
        <path
          d="M34 40c8 4 14-2 22 2M44 26c6 8 16 6 22 14M58 52c6-6 14-4 22-10M40 52c4-6 8-4 14-8M70 28c-2 8 4 14 10 14"
          fill="none"
          stroke="#c4dcff"
          strokeWidth="1"
          opacity="0.85"
        />
        {[
          [34, 40],
          [56, 42],
          [44, 26],
          [66, 40],
          [58, 52],
          [80, 42],
          [70, 28],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" fill="#ffffff" />
        ))}
      </g>
      <g>
        {sparks.map(({ x, y, r, fill }) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={fill} opacity="0.85" />
        ))}
      </g>

      {/* screen sheen */}
      <path d="M285 135h120l-60 172H285V135Z" fill="#fff" opacity="0.04" />
    </g>
  );
}

function Laptop() {
  return (
    <g>
      {/* lid */}
      <path d="M694 250 861 243l-10 112-160 5 3-110Z" fill="#161a52" stroke="#4a4fb0" strokeWidth="1.2" />
      {/* wallpaper */}
      <g clipPath="url(#hero-laptop-clip)">
        <path d="M699 255 856 248l-9 100-150 4 2-97Z" fill="url(#hero-laptop-sky)" />
        <path d="m699 318 38-42 24 28 34-48 44 52 18-14-9 74-150 4 1-54Z" fill="#473a98" />
        <path d="m699 330 46-30 30 24 40-26 40 30-8 26-150 4Z" fill="#2c2575" />
        <path d="M697 336h152l-2 16-150 4 0-20Z" fill="#7a6fe0" opacity="0.7" />
        <path d="M697 340h152" stroke="#ff9acb" strokeWidth="1.2" opacity="0.7" />
      </g>
      {/* deck */}
      <path d="M690 360 852 352l36 20-264 20 66-32Z" fill="#a9b2ea" />
      <path d="m624 392 264-20 4 5-264 24-4-9Z" fill="#7c86cf" />
      <path d="m716 366 118-6 18 9-134 8-2-11Z" fill="#8b94da" opacity="0.8" />
    </g>
  );
}

function DeskItems() {
  return (
    <g>
      {/* keyboard */}
      <path d="M366 376h206l-14 28H350l16-28Z" fill="#161a52" stroke="#3a3f9a" strokeWidth="1" />
      <path d="M372 381h192l-11 17H359l13-17Z" fill="url(#hero-keys)" opacity="0.9" />

      {/* graphics tablet + pen */}
      <path d="M418 414 770 398l-36 50-300 8-16-42Z" fill="#242868" stroke="#4a4fb0" strokeWidth="1.2" />
      <path d="M426 420 762 405l-26 36-296 7-14-28Z" fill="#1a1d57" />
      <path d="m566 410 96 6" stroke="#0b0d30" strokeWidth="5" strokeLinecap="round" />
      <path d="m566 410 12 .8" stroke="#8890d8" strokeWidth="3" strokeLinecap="round" />

      {/* notebook */}
      <g transform="rotate(-5 450 432)">
        <rect x="392" y="418" width="118" height="30" rx="3" fill="#161a52" stroke="#3a3f9a" strokeWidth="1" />
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={399 + i * 9.4} cy="421" r="2" fill="#dfe3ff" />
        ))}
      </g>

      {/* mouse */}
      <ellipse cx="880" cy="394" rx="25" ry="11" fill="#222a74" />
      <ellipse cx="878" cy="391" rx="18" ry="7" fill="#323a96" />

      {/* mug */}
      <g>
        <ellipse cx="226" cy="436" rx="48" ry="9" fill="#000" opacity="0.18" />
        <path d="M268 360c26-2 30 38 4 44-5 1-10 1-14 0" fill="none" stroke="#e9e6fb" strokeWidth="9" strokeLinecap="round" />
        <path d="M178 338h96v90c0 6-4 10-10 10h-76c-6 0-10-4-10-10v-90Z" fill="url(#hero-mug)" />
        <ellipse cx="226" cy="338" rx="48" ry="7" fill="#f6f4ff" />
        <ellipse cx="226" cy="338" rx="42" ry="4.5" fill="#d9d3f6" />
        <g className="font-bold" fill="#12163a" fontSize="14" fontFamily="var(--font-inter), sans-serif">
          <text x="190" y="368">Good</text>
          <text x="190" y="384">Ideas</text>
          <text x="190" y="400">Better</text>
          <text x="190" y="416">Code</text>
        </g>
      </g>
    </g>
  );
}

/** Desk surface, monitor, laptop and everything that sits on the desk. */
export function Workstation() {
  return (
    <g>
      {/* desk plane */}
      <path d="M0 348 980 336v164H0V348Z" fill="url(#hero-desk)" />
      <path d="M0 350 980 338" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
      <ellipse cx="620" cy="470" rx="420" ry="40" fill="#fff" opacity="0.1" filter="url(#hero-blur-md)" />

      {/* riser the monitor stands on */}
      <path d="M262 352h330l18 14H250l12-14Z" fill="#c9c2f0" />
      <path d="M250 366h360v14H250z" fill="#2a2d78" />

      <Monitor />
      <Laptop />
      <DeskItems />
    </g>
  );
}
