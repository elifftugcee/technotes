import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GithubIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="max-w-sm text-sm text-muted">{site.description}</p>
        </div>

        <nav aria-label="Alt bilgi menüsü" className="flex flex-wrap gap-x-6 gap-y-2">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-muted transition-colors hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={site.social.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profili"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-brand/40 hover:text-brand"
        >
          <GithubIcon className="h-5 w-5" />
        </a>
      </Container>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        © {year} {site.name}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
