import type { ReactNode } from "react";
import { normalize } from "./search";

export type Heading = { id: string; text: string };

/** "Claude Code Nedir?" → "claude-code-nedir" (Turkish-safe, matches the ids on rendered headings). */
export function slugify(text: string): string {
  return normalize(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Plain text of a React node tree — used to derive a heading's id from its children. */
export function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (node && typeof node === "object" && "props" in node) {
    return getTextContent((node.props as { children?: ReactNode }).children);
  }
  return "";
}

/** The `##` headings of an MDX document (skipping fenced code), with inline markdown stripped. */
export function extractHeadings(source: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of source.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    const match = !inFence && /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = match[1].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[`*_]/g, "");
    headings.push({ id: slugify(text), text });
  }
  return headings;
}
