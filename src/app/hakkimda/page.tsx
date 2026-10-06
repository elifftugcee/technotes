import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { InterestsSection } from "@/components/about/InterestsSection";
import { JourneySection } from "@/components/about/JourneySection";
import { ContactCard, GoalsCard, TechnologiesCard } from "@/components/about/SidebarCards";
import { StatsRow, type AboutStat } from "@/components/about/StatsRow";
import { LakeCard, WhoAmICard } from "@/components/about/WhoAmICard";
import { ClockIcon, HeartIcon, PencilIcon, TrendingIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Hakkımda",
  description: `${site.name} hakkında: yapay zeka, bilgisayar görüşü ve yazılım geliştirme üzerine öğrenme notları.`,
};

/** Numbers come from the real posts, so they stay true as the blog grows. */
function getStats(): AboutStat[] {
  const posts = getAllPosts();
  const totalMinutes = posts.reduce((sum, post) => sum + post.readingTime, 0);
  const firstYear = posts.length > 0 ? posts[posts.length - 1].date.slice(0, 4) : String(new Date().getFullYear());

  return [
    { icon: PencilIcon, tone: "violet", value: String(posts.length), label: "Blog Yazısı" },
    { icon: ClockIcon, tone: "blue", value: `${totalMinutes} dk`, label: "Toplam Okuma" },
    { icon: TrendingIcon, tone: "green", value: firstYear, label: "Bloga Başlangıç" },
    { icon: HeartIcon, tone: "coral", value: "Sürekli", label: "Öğrenme" },
  ];
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <Container
        size="wide"
        className="relative z-10 -mt-3 grid grid-cols-[minmax(0,1fr)] items-start gap-5 pb-20 lg:grid-cols-[21.5rem_minmax(0,1fr)] xl:grid-cols-[21.5rem_minmax(0,1fr)_19rem]"
      >
        <div className="space-y-5">
          <WhoAmICard />
          <LakeCard />
        </div>

        <div className="space-y-6 rounded-3xl border border-line bg-glass p-4 shadow-card backdrop-blur-xl sm:p-5">
          <StatsRow stats={getStats()} />
          <InterestsSection />
          <JourneySection />
        </div>

        <div className="grid gap-5 lg:col-span-2 lg:grid-cols-3 xl:col-span-1 xl:block xl:space-y-5">
          <TechnologiesCard />
          <GoalsCard />
          <ContactCard />
        </div>
      </Container>
    </>
  );
}
