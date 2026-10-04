import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export type PostFrontmatter = {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: string;
  readingTime?: string;
};

export type PostSummary = PostFrontmatter & { slug: string };

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): { frontmatter: PostFrontmatter; content: string } {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { frontmatter: data as PostFrontmatter, content };
}

export function getAllPosts(): PostSummary[] {
  return getAllSlugs()
    .map((slug) => {
      const { frontmatter } = getPostBySlug(slug);
      return { ...frontmatter, slug };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
