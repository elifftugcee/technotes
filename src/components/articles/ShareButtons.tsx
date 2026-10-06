"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, LinkedinIcon, LinkIcon, ShareIcon, XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const buttonClasses =
  "inline-flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-white";

/** The article's own address — without the `#section` or `?query` the visitor may currently have. */
const articleUrl = () => window.location.origin + window.location.pathname;

/** Share this page: system share sheet (or copy as a fallback), X, LinkedIn and copy-link. */
export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl());
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked (insecure context / permissions) — nothing useful to do */
    }
  };

  const openPopup = (shareUrl: string) => window.open(shareUrl, "_blank", "noopener,noreferrer");

  const share = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url: articleUrl() });
      } catch {
        /* the visitor dismissed the share sheet */
      }
    } else {
      await copyLink();
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button type="button" onClick={share} className="inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-white">
        <ShareIcon className="h-4 w-4" />
        Paylaş
      </button>
      <button
        type="button"
        aria-label="X'te paylaş"
        title="X'te paylaş"
        onClick={() =>
          openPopup(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(articleUrl())}`)
        }
        className={buttonClasses}
      >
        <XIcon className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        aria-label="LinkedIn'de paylaş"
        title="LinkedIn'de paylaş"
        onClick={() => openPopup(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl())}`)}
        className={buttonClasses}
      >
        <LinkedinIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label={copied ? "Bağlantı kopyalandı" : "Bağlantıyı kopyala"}
        title={copied ? "Kopyalandı!" : "Bağlantıyı kopyala"}
        onClick={copyLink}
        className={cn(buttonClasses, copied && "bg-emerald-400/25 text-emerald-200")}
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Bağlantı panoya kopyalandı" : ""}
      </span>
    </div>
  );
}
