import type { ComponentType } from "react";
import { site, type SocialKey } from "@/content/site";
import { cn } from "@/lib/cn";
import { GithubIcon, LinkedinIcon, MailIcon, XIcon, YoutubeIcon, type IconProps } from "./icons";

const platforms: Record<SocialKey, { label: string; Icon: ComponentType<IconProps>; href: (value: string) => string }> = {
  github: { label: "GitHub", Icon: GithubIcon, href: (value) => value },
  linkedin: { label: "LinkedIn", Icon: LinkedinIcon, href: (value) => value },
  x: { label: "X", Icon: XIcon, href: (value) => value },
  youtube: { label: "YouTube", Icon: YoutubeIcon, href: (value) => value },
  email: { label: "E-posta", Icon: MailIcon, href: (value) => `mailto:${value}` },
};

const order: SocialKey[] = ["github", "linkedin", "x", "youtube", "email"];

/** The accounts that are actually configured in `content/site.ts`, in a fixed order. */
export function getSocialLinks() {
  return order.flatMap((key) => {
    const value = site.social[key as keyof typeof site.social];
    if (!value) return [];
    const { label, Icon, href } = platforms[key];
    return [{ key, label, Icon, href: href(value), external: key !== "email" }];
  });
}

/** Row of round icon buttons for each configured account. Renders nothing when none are set. */
export function SocialLinks({
  size = "md",
  exclude = [],
  className,
}: {
  size?: "sm" | "md";
  /** Accounts to leave out (e.g. the e-mail when it is shown separately) */
  exclude?: SocialKey[];
  className?: string;
}) {
  const links = getSocialLinks().filter((link) => !exclude.includes(link.key));
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {links.map(({ key, label, Icon, href, external }) => (
        <li key={key}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(
              "inline-flex items-center justify-center rounded-full border border-line bg-surface text-ink shadow-card transition-[transform,color,border-color] hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand",
              size === "md" ? "h-11 w-11" : "h-9 w-9",
            )}
          >
            <Icon className={size === "md" ? "h-5 w-5" : "h-[1.1rem] w-[1.1rem]"} />
          </a>
        </li>
      ))}
    </ul>
  );
}
