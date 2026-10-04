"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { GithubIcon, MenuIcon, CloseIcon, SearchIcon } from "@/components/ui/icons";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-white/90 shadow-[0_1px_0_rgba(16,21,43,0.04)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-[80rem] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Ana menü" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isActive ? "bg-surface text-ink" : "text-muted hover:bg-surface hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/articles"
            aria-label="Yazılarda ara"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:inline-flex"
          >
            <SearchIcon className="h-4 w-4" />
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-body text-sm font-medium text-ink transition-colors hover:border-accent-blue/50 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:inline-flex"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobil menü" className="border-t border-ink/8 bg-white px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-full px-4 py-2.5 font-body text-base text-ink hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-base text-ink hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
              >
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
