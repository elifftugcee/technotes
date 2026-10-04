type Node = { cx: number; cy: number; r: number; fill: string; pulse?: boolean };

const nodes: Node[] = [
  { cx: 40, cy: 55, r: 5, fill: "#0D9488", pulse: true },
  { cx: 95, cy: 28, r: 3, fill: "#2563EB" },
  { cx: 150, cy: 58, r: 4, fill: "#7C3AED", pulse: true },
  { cx: 272, cy: 42, r: 5, fill: "#0D9488" },
  { cx: 292, cy: 112, r: 3, fill: "#2563EB", pulse: true },
  { cx: 44, cy: 232, r: 4, fill: "#7C3AED" },
  { cx: 96, cy: 282, r: 3, fill: "#0D9488" },
  { cx: 256, cy: 262, r: 5, fill: "#2563EB", pulse: true },
  { cx: 282, cy: 198, r: 3, fill: "#7C3AED" },
];

const links: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [5, 6],
  [7, 8],
  [4, 8],
  [0, 5],
];

const chipClass =
  "absolute inline-flex items-center rounded-xl border border-white/70 bg-white/65 px-3 py-1.5 font-mono text-[0.6875rem] font-medium text-ink/80 shadow-soft backdrop-blur-md [will-change:transform]";

/**
 * Decorative, Elif Tech Blog–specific AI/Computer Vision composition that
 * fills the hero's visual slot until real cover art exists. Pure CSS motion
 * (no JS, no Framer Motion) — slow drifting gradient blobs, a breathing
 * neural-net graph, a gently floating code panel, and a handful of floating
 * tech chips. Entirely decorative: hidden from assistive tech, and every
 * animation is neutralised globally when prefers-reduced-motion is set
 * (see the `@media (prefers-reduced-motion: reduce)` rule in globals.css).
 */
export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-xs sm:max-w-sm lg:max-w-md">
      {/* Clipped background layer: glass panel + drifting blobs + node graph */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white bg-white/50 backdrop-blur-sm">
        <div className="absolute inset-0 [will-change:transform]">
          <div className="absolute -left-10 -top-10 h-40 w-40 animate-[hero-blob-drift-a_14s_ease-in-out_infinite] rounded-full bg-accent-blue/25 blur-3xl" />
          <div className="absolute -right-12 bottom-0 h-44 w-44 animate-[hero-blob-drift-b_16s_ease-in-out_infinite] rounded-full bg-accent-violet/25 blur-3xl" />
          <div className="absolute left-1/3 top-1/4 h-32 w-32 animate-[hero-blob-drift-a_18s_ease-in-out_infinite] rounded-full bg-accent-turquoise/20 blur-3xl [animation-delay:2s]" />
        </div>

        <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full" fill="none">
          {links.map(([a, b], i) => {
            const from = nodes[a];
            const to = nodes[b];
            return (
              <line
                key={`${a}-${b}`}
                x1={from.cx}
                y1={from.cy}
                x2={to.cx}
                y2={to.cy}
                stroke="#64748b"
                strokeWidth="1.2"
                className="animate-[hero-line-breathe_5s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            );
          })}
          {nodes.map((node, i) => (
            <circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.fill}
              className={
                node.pulse
                  ? "[transform-box:fill-box] [transform-origin:center] animate-[hero-node-pulse_4s_ease-in-out_infinite]"
                  : undefined
              }
              style={node.pulse ? { animationDelay: `${i * 0.3}s` } : undefined}
            />
          ))}
        </svg>
      </div>

      {/* Center "code editor" panel — gently floating, decorative only */}
      <div className="absolute inset-0 flex items-center justify-center p-7 sm:p-9">
        <div className="w-full max-w-[15rem] animate-[hero-panel-float_6s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-ink shadow-soft-lg [will-change:transform] sm:max-w-[16rem]">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="space-y-1.5 px-4 py-4 font-mono text-[0.6875rem] leading-relaxed sm:text-xs">
            <p>
              <span className="text-accent-turquoise">const</span>{" "}
              <span className="text-white/90">model</span> = <span className="text-accent-blue">loadVision</span>
              ();
            </p>
            <p className="text-white/40">{"// detect → describe → decide"}</p>
            <p>
              <span className="text-accent-violet">if</span> <span className="text-white/70">(model.ready)</span>{" "}
              {"{"}
            </p>
            <p className="pl-4 text-white/70">
              model.<span className="text-accent-turquoise">run</span>(frame);
            </p>
            <p className="text-white/70">{"}"}</p>
          </div>
        </div>
      </div>

      {/* Floating tech chips — three stay on mobile, the rest join from `sm:` up */}
      <span
        className={`${chipClass} -left-3 top-8 animate-[hero-chip-float_6s_ease-in-out_infinite]`}
      >
        AI
      </span>
      <span
        className={`${chipClass} -bottom-3 -left-4 animate-[hero-chip-float_6.5s_ease-in-out_infinite] [animation-delay:1.4s]`}
      >
        CV
      </span>
      <span
        className={`${chipClass} -right-4 top-[40%] animate-[hero-chip-float_6.8s_ease-in-out_infinite] [animation-delay:0.8s]`}
      >
        {"</> Code"}
      </span>
      <span
        className={`${chipClass} -top-4 right-10 hidden animate-[hero-chip-float_7.5s_ease-in-out_infinite] [animation-delay:0.4s] sm:inline-flex`}
      >
        YOLO
      </span>
      <span
        className={`${chipClass} -bottom-4 right-10 hidden animate-[hero-chip-float_7s_ease-in-out_infinite] [animation-delay:1.1s] sm:inline-flex`}
      >
        Prompt
      </span>
      <span
        className={`${chipClass} -left-3 top-[18%] hidden animate-[hero-chip-float_7.2s_ease-in-out_infinite] [animation-delay:0.2s] sm:inline-flex`}
      >
        {"{ }"}
      </span>
    </div>
  );
}
