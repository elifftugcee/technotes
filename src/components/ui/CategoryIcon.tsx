import type { ComponentType } from "react";
import type { CategoryIconName } from "@/content/categories";
import { AsteriskIcon, BookIcon, ChatIcon, CodeIcon, TargetIcon, type IconProps } from "./icons";

const icons: Record<CategoryIconName, ComponentType<IconProps>> = {
  vision: TargetIcon,
  claude: AsteriskIcon,
  prompt: ChatIcon,
  code: CodeIcon,
  book: BookIcon,
};

export function CategoryIcon({ name, className }: { name: CategoryIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} />;
}
