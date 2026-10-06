import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "./components";

/** Renders the MDX body of a post. The wrapper resets the counter that numbers each `##` heading. */
export function MdxContent({ source }: { source: string }) {
  return (
    <div className="[counter-reset:section]">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
