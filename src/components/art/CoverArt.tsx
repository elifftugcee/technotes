import type { ComponentType } from "react";
import { ClaudeCodeCover } from "./covers/ClaudeCodeCover";
import { ClaudeProjectCover } from "./covers/ClaudeProjectCover";
import { IouNmsCover } from "./covers/IouNmsCover";
import { JourneyCover } from "./covers/JourneyCover";
import { PromptCover } from "./covers/PromptCover";
import { PromptTemplatesCover } from "./covers/PromptTemplatesCover";
import { TechStackCover } from "./covers/TechStackCover";
import { YoloCover } from "./covers/YoloCover";

const covers = {
  "claude-code": ClaudeCodeCover,
  prompt: PromptCover,
  yolo: YoloCover,
  "iou-nms": IouNmsCover,
  journey: JourneyCover,
  "tech-stack": TechStackCover,
  "claude-project": ClaudeProjectCover,
  "prompt-templates": PromptTemplatesCover,
} satisfies Record<string, ComponentType<{ className?: string }>>;

export type CoverKey = keyof typeof covers;

/**
 * Code-drawn SVG covers. NOT used by any post any more — posts use a real `coverImage` (see `PostCover`).
 * Kept on purpose as a placeholder library; it is safe to delete later.
 */
export function CoverArt({ cover, className = "h-full w-full" }: { cover: CoverKey; className?: string }) {
  const Cover = covers[cover];
  return <Cover className={className} />;
}
