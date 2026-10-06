import Link from "next/link";
import { PostGrid } from "@/components/articles/PostGrid";
import { ArrowRightIcon, DocumentIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PostSummary } from "@/content/types";
import { FeaturedCarousel } from "./FeaturedCarousel";

/** Featured carousel on the left, latest posts on the right (stacked below `xl`). */
export function PostsShowcase({ featured, recent }: { featured: PostSummary[]; recent: PostSummary[] }) {
  return (
    <section aria-label="Öne çıkan ve son yazılar" className="pb-14 pt-6">
      <Container size="wide" className="grid items-start gap-10 xl:grid-cols-[minmax(0,509fr)_minmax(0,883fr)] xl:gap-7">
        <FeaturedCarousel posts={featured} />

        <div>
          <SectionHeading icon={DocumentIcon} tone="blue" title="Son Yazılar">
            <Link href="/yazilar" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
              Tüm Yazılar <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </SectionHeading>
          <PostGrid posts={recent} layout="compact" className="mt-4" />
        </div>
      </Container>
    </section>
  );
}
