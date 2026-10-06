import { Badge } from "@/components/ui/Badge";
import { getCategory } from "@/content/categories";

export function CategoryBadge({ slug, variant }: { slug: string; variant?: "soft" | "onDark" }) {
  const category = getCategory(slug);
  if (!category) return null;
  return (
    <Badge tone={category.badgeTone} variant={variant}>
      {category.name}
    </Badge>
  );
}
