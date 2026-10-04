/**
 * Viewfinder-style corner brackets — a nod to the bounding boxes this blog's
 * Computer Vision posts are actually about. Reused on the logo mark, the
 * hero's decorative panel, and as a hover/focus accent on article cards.
 * The parent element must be `relative` (or otherwise positioned).
 */
export function CornerFrame({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-accent-blue" />
      <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-accent-violet" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-accent-violet" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-accent-turquoise" />
    </span>
  );
}
