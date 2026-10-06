import type { ComponentType } from "react";
import { NewsletterScene } from "@/components/art/NewsletterScene";
import { Container } from "@/components/ui/Container";
import { LockIcon, MailIcon, UsersIcon, type IconProps } from "@/components/ui/icons";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/cn";
import { NewsletterForm } from "./NewsletterForm";

type FeatureIcon = (typeof homeContent.newsletter.features)[number]["icon"];

const featureIcons: Record<FeatureIcon, ComponentType<IconProps>> = {
  mail: MailIcon,
  lock: LockIcon,
  users: UsersIcon,
};

/** Dark newsletter band. The anchor id lets any page link to it with `/#abone`. */
export function Newsletter() {
  const { title, subtitle, features } = homeContent.newsletter;

  return (
    <section id="abone" aria-labelledby="abone-baslik" className="relative isolate overflow-hidden bg-[#0b1040] text-white">
      <NewsletterScene className="absolute inset-0 -z-20 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070b36]/85 via-[#070b36]/35 to-[#070b36]/60" />

      <Container size="wide" className="grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,27rem)_1fr] lg:gap-12">
        <div>
          <h2 id="abone-baslik" className="text-[1.45rem] font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="mt-1 text-sm text-white/80">{subtitle}</p>
          <NewsletterForm className="mt-4" />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:ml-auto lg:max-w-[40rem] lg:grid-cols-[auto_auto] lg:gap-x-12">
          {features.map(({ icon, title: featureTitle, description }, index) => {
            const Icon = featureIcons[icon];
            return (
              <li key={featureTitle} className={cn("flex items-center gap-3", index === 0 && "lg:row-span-2")}>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-300/30 bg-sky-500/25 text-sky-200 backdrop-blur">
                  <Icon className="h-[1.15rem] w-[1.15rem]" />
                </span>
                <span>
                  <span className="block text-[0.8125rem] font-bold">{featureTitle}</span>
                  <span className="block text-xs text-white/70">{description}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
