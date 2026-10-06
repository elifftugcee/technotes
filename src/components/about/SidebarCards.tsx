import { CheckCircleIcon, CubeIcon, MailIcon, TargetIcon } from "@/components/ui/icons";
import { getSocialLinks, SocialLinks } from "@/components/ui/SocialLinks";
import { aboutContent } from "@/content/about";
import { site } from "@/content/site";
import { AboutCard, CardHeading } from "./ui";

export function TechnologiesCard() {
  const { title, items } = aboutContent.technologies;

  return (
    <AboutCard labelledBy="teknolojiler">
      <CardHeading id="teknolojiler" icon={CubeIcon} tone="violet" title={title} size="sm" />
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((technology) => (
          <li
            key={technology}
            className="inline-flex h-7 items-center rounded-full border border-line bg-surface px-3 text-[0.6875rem] font-medium text-ink/80"
          >
            {technology}
          </li>
        ))}
      </ul>
    </AboutCard>
  );
}

export function GoalsCard() {
  const { title, items } = aboutContent.goals;

  return (
    <AboutCard labelledBy="hedefler">
      <CardHeading id="hedefler" icon={TargetIcon} tone="violet" title={title} size="sm" />
      <ul className="mt-4 space-y-3">
        {items.map((goal) => (
          <li key={goal} className="flex items-start gap-3 text-[0.8125rem] text-ink/80">
            <CheckCircleIcon className="mt-px h-5 w-5 shrink-0 text-emerald-500" />
            {goal}
          </li>
        ))}
      </ul>
    </AboutCard>
  );
}

/** Contact: the e-mail address (if configured) plus every other configured account. */
export function ContactCard() {
  const { title, text } = aboutContent.contact;
  const email = site.social.email;
  const hasOtherAccounts = getSocialLinks().some((link) => link.key !== "email");

  return (
    <AboutCard labelledBy="iletisim">
      <CardHeading id="iletisim" icon={MailIcon} tone="blue" title={title} size="sm" />
      <p className="mt-3 text-xs leading-relaxed text-muted">{text}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex h-10 min-w-0 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-xs font-medium text-ink transition-colors hover:border-brand/40 hover:text-brand"
          >
            <MailIcon className="h-4 w-4 shrink-0 text-brand" />
            <span className="truncate">{email}</span>
          </a>
        )}
        {hasOtherAccounts && <SocialLinks size="sm" exclude={["email"]} />}
      </div>
    </AboutCard>
  );
}
