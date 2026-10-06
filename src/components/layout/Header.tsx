"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import type { SearchEntry } from "@/lib/search";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";
import { ThemeToggle } from "./ThemeToggle";

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};
const getScrolled = () => window.scrollY > 8;
const getServerScrolled = () => false;

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ searchEntries }: { searchEntries: SearchEntry[] }) {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);

  // The menu is "open for" a pathname, so it closes by itself whenever the route changes.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-14 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || menuOpen
          ? "border-b border-line bg-glass shadow-[0_1px_0_rgb(0_0_0/0.02)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-[1368px] items-center gap-6 px-5 sm:px-6 lg:gap-10">
        <Logo />

        <nav aria-label="Ana menü" className="hidden h-full items-stretch gap-1 lg:flex">
          {site.nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex items-center px-3 text-sm font-medium transition-colors",
                  "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand after:transition-opacity",
                  active ? "text-brand after:opacity-100" : "text-ink/80 after:opacity-0 hover:text-brand",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <SearchBox entries={searchEntries} enableShortcut className="w-56 xl:w-72" />
          <ThemeToggle />
          <Button href={site.social.github} variant="soft" className="h-11">
            Takip Et <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setMenuPath(menuOpen ? null : pathname)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-line bg-canvas/95 px-5 pb-6 pt-3 shadow-card-lg backdrop-blur-xl lg:hidden"
        >
          <SearchBox entries={searchEntries} onNavigate={() => setMenuPath(null)} />
          <nav aria-label="Mobil menü" className="mt-3 flex flex-col">
            {site.nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-3 text-base font-medium",
                    active ? "bg-brand/10 text-brand" : "text-ink hover:bg-surface-2",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Button href={site.social.github} variant="primary" className="mt-3 w-full">
            Takip Et <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </header>
  );
}
