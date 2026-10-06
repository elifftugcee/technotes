import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/content/site";
import { getAllPosts } from "@/lib/posts";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// `latin-ext` is required for Turkish glyphs (ş ğ İ ı)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Handwritten accent used only by illustrations (latin-ext for Turkish letters)
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name} — Teknolojiyi Daha İyi Anlamak ve Uygulamak İçin`, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const searchEntries = getAllPosts().map(({ slug, title, category, excerpt }) => ({ slug, title, category, excerpt }));

  return (
    // data-theme is set by the inline script before first paint, hence suppressHydrationWarning
    <html lang="tr" suppressHydrationWarning className={`${inter.variable} ${caveat.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <a
          href="#icerik"
          className="sr-only z-[60] rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          İçeriğe geç
        </a>
        <Header searchEntries={searchEntries} />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
