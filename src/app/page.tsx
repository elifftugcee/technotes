import { CategoryStrip } from "@/components/home/CategoryStrip";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/home/Newsletter";
import { PostsShowcase } from "@/components/home/PostsShowcase";
import { getFeaturedPosts, getRecentPosts } from "@/lib/posts";

export default function Home() {
  const featured = getFeaturedPosts();
  // The lead featured post already has the big card, so "Son Yazılar" skips it
  const recent = getRecentPosts(4, featured[0]?.slug);

  return (
    <>
      <Hero />
      <CategoryStrip />
      <PostsShowcase featured={featured} recent={recent} />
      <Newsletter />
    </>
  );
}
