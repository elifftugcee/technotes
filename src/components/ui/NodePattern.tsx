/**
 * A small node-graph motif (think keypoints/graph edges from a CV or neural
 * net diagram) used as a placeholder cover texture and decorative accent
 * until real cover images and illustrations are ready.
 */
export function NodePattern({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className={className}>
      <g stroke="#2563EB" strokeOpacity="0.3" strokeWidth="1.5">
        <line x1="30" y1="40" x2="100" y2="90" />
        <line x1="100" y1="90" x2="170" y2="50" />
        <line x1="100" y1="90" x2="60" y2="150" />
        <line x1="100" y1="90" x2="150" y2="150" />
        <line x1="30" y1="40" x2="60" y2="150" />
      </g>
      <circle cx="30" cy="40" r="5" fill="#2563EB" />
      <circle cx="170" cy="50" r="4" fill="#7C3AED" />
      <circle cx="100" cy="90" r="6" fill="#7C3AED" />
      <circle cx="60" cy="150" r="4" fill="#0D9488" />
      <circle cx="150" cy="150" r="5" fill="#0D9488" />
    </svg>
  );
}
