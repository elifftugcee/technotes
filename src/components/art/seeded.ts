/**
 * Small deterministic PRNG (LCG). The illustrations scatter particles / code lines with it —
 * a fixed seed means server and client render identical markup (no hydration mismatch).
 */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/** Round to one decimal to keep generated SVG markup compact. */
export const r1 = (value: number): number => Math.round(value * 10) / 10;
