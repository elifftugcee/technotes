import type { ComponentType } from "react";
import type { CoverKey } from "@/content/types";
import { ClaudeCodeCover } from "./covers/ClaudeCodeCover";
import { ClaudeProjectCover } from "./covers/ClaudeProjectCover";
import { IouNmsCover } from "./covers/IouNmsCover";
import { JourneyCover } from "./covers/JourneyCover";
import { PromptCover } from "./covers/PromptCover";
import { PromptTemplatesCover } from "./covers/PromptTemplatesCover";
import { TechStackCover } from "./covers/TechStackCover";
import { YoloCover } from "./covers/YoloCover";

const covers: Record<CoverKey, ComponentType<{ className?: string }>> = {
  "claude-code": ClaudeCodeCover,
  prompt: PromptCover,
  yolo: YoloCover,
  "iou-nms": IouNmsCover,
  journey: JourneyCover,
  "tech-stack": TechStackCover,
  "claude-project": ClaudeProjectCover,
  "prompt-templates": PromptTemplatesCover,
};

/** Illustrated cover for a post. Fills (and crops to) its parent. */
export function CoverArt({ cover, className = "h-full w-full" }: { cover: CoverKey; className?: string }) {
  const Cover = covers[cover];
  return <Cover className={className} />;
}
