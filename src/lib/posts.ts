import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getCategory } from "@/content/categories";
import type { PostFrontmatter, PostSummary } from "@/content/types";

const postsDirectory = path.join(process.cwd(), "src/content/posts");
const publicDirectory = path.join(process.cwd(), "public");

/** "x%" or "x% y%" — the only shapes `coverPosition` may take */
const COVER_POSITION = /^\d{1,3}%( \d{1,3}%)?$/;

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
  if (typeof frontmatter.coverImage !== "string" || !frontmatter.coverImage.startsWith("/")) {
    fail('`coverImage` is required and must be a path under /public, e.g. "/images/posts/<slug>.webp"');
  }
  if (!fs.existsSync(path.join(publicDirectory, frontmatter.coverImage))) {
    fail(`coverImage "${frontmatter.coverImage}" does not exist in /public`);
  }
  if (frontmatter.coverPosition !== undefined && !COVER_POSITION.test(frontmatter.coverPosition)) {
    fail(`coverPosition "${frontmatter.coverPosition}" must look like "50%" or "50% 30%"`);
  }
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
