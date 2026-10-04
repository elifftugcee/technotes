import Link from "next/link";
import { CornerFrame } from "@/components/ui/CornerFrame";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Elif Tech Blog, ana sayfa">
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center">
        <CornerFrame />
        <span className="h-2 w-2 rounded-full bg-gradient-to-br from-accent-blue via-accent-violet to-accent-turquoise" />
      </span>
      <span className="font-display text-lg font-semibold leading-none text-ink">
        Elif
        <span className="ml-1 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-turquoise bg-clip-text text-transparent">
          Tech Blog
        </span>
      </span>
    </Link>
  );
}
