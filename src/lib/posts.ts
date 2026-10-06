import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getCategory } from "@/content/categories";
import { coverKeys, type PostFrontmatter, type PostSummary } from "@/content/types";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function parseFrontmatter(slug: string, data: Record<string, unknown>): PostFrontmatter {
  const fail = (reason: string): never => {
    throw new Error(`Post "${slug}": ${reason}`);
  };

  const frontmatter = data as PostFrontmatter;
  if (!frontmatter.title) fail("`title` is required");
  if (!frontmatter.date) fail("`date` is required (YYYY-MM-DD)");
  if (!getCategory(frontmatter.category)) fail(`unknown category "${frontmatter.category}"`);
  if (!coverKeys.includes(frontmatter.cover)) fail(`unknown cover "${frontmatter.cover}"`);
  return frontmatter;
}

export function getPostBySlug(slug: string): { post: PostSummary; content: string } | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  return { post: { ...parseFrontmatter(slug, data), slug }, content };
}

/** All posts, newest first. */
export function getAllPosts(): PostSummary[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug)?.post)
    .filter((post): post is PostSummary => Boolean(post))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPosts(): PostSummary[] {
  return getAllPosts().filter((post) => post.featured);
}

/** Latest posts, optionally leaving one out (e.g. the lead featured post). */
export function getRecentPosts(limit: number, excludeSlug?: string): PostSummary[] {
  return getAllPosts()
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, limit);
}

/** Posts that share the category first, then the rest — never the post itself. */
export function getRelatedPosts(post: PostSummary, limit: number): PostSummary[] {
  const others = getAllPosts().filter((candidate) => candidate.slug !== post.slug);
  const sameCategory = others.filter((candidate) => candidate.category === post.category);
  const rest = others.filter((candidate) => candidate.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
