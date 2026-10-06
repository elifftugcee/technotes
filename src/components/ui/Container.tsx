import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Page-width wrapper. `wide` matches the home page's lower sections. */
export function Container({
  size = "default",
  className,
  children,
}: {
  size?: "default" | "wide";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6", size === "wide" ? "max-w-[1468px]" : "max-w-[1368px]", className)}>
      {children}
    </div>
  );
}
