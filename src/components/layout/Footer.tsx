import Link from "next/link";
import { Logo } from "./Logo";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-ink/8 bg-surface">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-blue via-accent-violet to-accent-turquoise" />

      <div className="mx-auto flex max-w-[80rem] flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 font-body text-sm leading-relaxed text-muted">
            Yapay zeka, Computer Vision, Claude Code, prompt engineering ve yazılım geliştirme üzerine notlar.
          </p>
        </div>

        <nav aria-label="Alt bilgi menüsü" className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-sm font-medium text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profili"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-accent-blue/40 hover:text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profili"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-accent-blue/40 hover:text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="border-t border-ink/8 px-4 py-4 text-center font-mono text-xs text-muted sm:px-6 lg:px-8">
        © {year} Elif Tech Blog. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
