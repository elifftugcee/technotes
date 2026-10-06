"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/headings";
import { cn } from "@/lib/cn";

/**
 * Distance from the top of the viewport at which a heading counts as "current". It sits just below where a
 * clicked heading lands (sticky header + scroll padding), so a click keeps its own section highlighted.
 */
const ACTIVATION_OFFSET = 120;

/** Numbered list of the article's sections. Highlights the section being read and jumps to one on click. */
export function TableOfContents({ headings, className }: { headings: Heading[]; className?: string }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = headings[0]?.id ?? "";
      for (const { id } of headings) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= ACTIVATION_OFFSET) current = id;
      }
      // at the very bottom of the page the last section is always the one being read
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActiveId(atBottom ? (headings[headings.length - 1]?.id ?? current) : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <ol className={cn("space-y-1", className)}>
      {headings.map(({ id, text }, index) => {
        const active = id === activeId;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active ? "location" : undefined}
              onClick={() => setActiveId(id)}
              className={cn(
                "relative flex items-baseline gap-2.5 rounded-xl py-2 pl-4 pr-3 text-[0.8125rem] transition-colors",
                active ? "bg-brand/10 font-semibold text-brand" : "text-ink/75 hover:bg-surface-2 hover:text-ink",
              )}
            >
              {active && <span aria-hidden="true" className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-brand" />}
              <span className="w-4 shrink-0 text-xs">{index + 1}.</span>
              {text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
