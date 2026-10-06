import { Backdrop } from "./Backdrop";
import { FloatingChips } from "./FloatingChips";
import { PlantPlacements, PlantSymbols } from "./Plants";
import { Workstation } from "./Workstation";

const stop = (color: string) => ({ stopColor: color });

function SceneDefs() {
  return (
    <defs>
      {/* Theme-aware fills read the CSS variables from globals.css */}
      <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={stop("var(--scene-sky-a)")} />
        <stop offset="1" style={stop("var(--scene-sky-b)")} />
      </linearGradient>
      <linearGradient id="hero-wall" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style={stop("var(--scene-wall-b)")} />
        <stop offset="1" style={stop("var(--scene-wall-a)")} />
      </linearGradient>
      <linearGradient id="hero-desk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={stop("var(--scene-desk-a)")} />
        <stop offset="1" style={stop("var(--scene-desk-b)")} />
      </linearGradient>

      <radialGradient id="hero-ambient">
        <stop offset="0" stopColor="#9b6bff" stopOpacity="0.45" />
        <stop offset="1" stopColor="#9b6bff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="hero-warm" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ffb25e" stopOpacity="0" />
        <stop offset="0.35" stopColor="#ffb25e" />
        <stop offset="1" stopColor="#ff7fb0" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="hero-screen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#070a2c" />
        <stop offset="1" stopColor="#0f1450" />
      </linearGradient>
      <radialGradient id="hero-brain-glow">
        <stop offset="0" stopColor="#5b7dff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#5b7dff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="hero-head" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4a7bff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#7a3df0" stopOpacity="0.35" />
      </linearGradient>
      <linearGradient id="hero-laptop-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5b6cf0" />
        <stop offset="1" stopColor="#f0a0d0" />
      </linearGradient>

      <linearGradient id="hero-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8fc4ff" stopOpacity="0.62" />
        <stop offset="1" stopColor="#a78bff" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="hero-glass-strong" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4f9bff" stopOpacity="0.85" />
        <stop offset="1" stopColor="#8a6bff" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="hero-glass-stroke" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d8ebff" />
        <stop offset="1" stopColor="#c3adff" />
      </linearGradient>

      <linearGradient id="hero-mug" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fbfaff" />
        <stop offset="1" stopColor="#d6d0f2" />
      </linearGradient>
      <pattern id="hero-keys" width="8" height="6" patternUnits="userSpaceOnUse">
        <rect width="7" height="5" rx="1" fill="#2c3290" />
      </pattern>

      <filter id="hero-blur-sm" x="-20%" y="-200%" width="140%" height="500%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <filter id="hero-blur-md" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" />
      </filter>
      <filter id="hero-neon" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.1" result="soft" />
        <feMerge>
          <feMergeNode in="soft" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <clipPath id="hero-window-clip">
        <rect width="350" height="340" />
      </clipPath>
      <clipPath id="hero-laptop-clip">
        <path d="M694 250 861 243l-10 112-160 5 3-110Z" />
      </clipPath>

      <PlantSymbols />
    </defs>
  );
}

/**
 * The home hero's illustration: a glowing developer desk in front of an alpine window, with floating
 * glass labels. Drawn as one SVG so it scales crisply and follows the light/dark theme through CSS
 * variables. Render it once per page (gradient ids are global to the document).
 */
export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 980 500"
      preserveAspectRatio="xMaxYMax slice"
      role="img"
      aria-label="Yapay zeka ve yazılım üzerine çalışılan, ekranında parlayan bir beyin görseli bulunan modern bir çalışma masası"
      className={className}
    >
      <SceneDefs />
      <Backdrop />
      <PlantPlacements />
      <Workstation />
      <FloatingChips />
    </svg>
  );
}
