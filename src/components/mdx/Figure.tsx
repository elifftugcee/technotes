import type { ReactNode } from "react";

/** Wraps an illustration or screenshot with an optional caption. */
export function Figure({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-2xl shadow-card-lg">{children}</div>
      {caption && <figcaption className="mt-2 text-center text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}
