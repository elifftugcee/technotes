import Link from "next/link";
import type { ComponentProps } from "react";
import { getTextContent, slugify } from "@/lib/headings";
import { Feature, FeatureGrid } from "./FeatureGrid";
import { Figure } from "./Figure";
import { TerminalDemo } from "./TerminalDemo";

const linkClasses = "font-medium text-brand underline-offset-4 hover:underline";

/**
 * Elements and custom components available inside post MDX.
 * `h2` gets an id (for the table of contents) and a number from the `section` CSS counter,
 * which `MdxContent` resets on its wrapper.
 */
export const mdxComponents = {
  h2: ({ children, ...props }: ComponentProps<"h2">) => (
    <h2
      id={slugify(getTextContent(children))}
      className="mb-3 mt-10 flex items-center gap-3 text-2xl font-bold tracking-tight text-ink [counter-increment:section] first:mt-0 before:inline-flex before:h-8 before:w-8 before:shrink-0 before:items-center before:justify-center before:rounded-full before:bg-brand/10 before:text-base before:font-bold before:text-brand before:content-[counter(section)]"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: (props: ComponentProps<"h3">) => <h3 className="mb-2 mt-8 text-xl font-bold tracking-tight text-ink" {...props} />,
  p: (props: ComponentProps<"p">) => <p className="my-4 text-[0.9375rem] leading-[1.8] text-ink/80" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="my-4 list-disc space-y-2 pl-6 text-[0.9375rem] text-ink/80 marker:text-brand" {...props} />,
  ol: (props: ComponentProps<"ol">) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-[0.9375rem] text-ink/80 marker:font-semibold marker:text-brand" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li className="leading-[1.75]" {...props} />,
  strong: (props: ComponentProps<"strong">) => <strong className="font-semibold text-ink" {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="my-6 rounded-r-2xl border-l-4 border-brand bg-brand/5 px-5 py-1 text-ink/80 [&>p]:my-3" {...props} />
  ),
  hr: () => <hr className="my-10 border-line" />,
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} className={linkClasses} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClasses} {...props} />
    ),
  // Fenced blocks arrive as <pre><code>; inline code is a bare <code>
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-2xl bg-[#0b1030] p-5 text-sm leading-relaxed text-slate-100 shadow-card [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  ),
  code: (props: ComponentProps<"code">) => (
    <code className="rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em] text-ink" {...props} />
  ),
  Figure,
  TerminalDemo,
  FeatureGrid,
  Feature,
};
