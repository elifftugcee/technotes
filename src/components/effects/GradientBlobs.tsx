/**
 * Soft, static blurred gradient blobs used behind hero/CTA sections for a
 * gentle sense of depth. Intentionally not animated yet — motion for these
 * lands in a dedicated later step. Parent should be `relative overflow-hidden`.
 */
export function GradientBlobs({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent-blue/20 blur-3xl" />
      <div className="absolute -right-16 top-0 h-80 w-80 rounded-full bg-accent-violet/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent-turquoise/15 blur-3xl" />
    </div>
  );
}
