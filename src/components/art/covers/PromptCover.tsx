import { useId } from "react";

/** A glowing chat window floating over a dark workspace. */
export function PromptCover({ className }: { className?: string }) {
  const id = useId();
  const u = (name: string) => `${id}-${name}`;

  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={u("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#070b30" />
          <stop offset="1" stopColor="#1a1470" />
        </linearGradient>
        <linearGradient id={u("big")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3f66ff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#6b3df0" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={u("small")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#7a4dff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#4a2fc8" stopOpacity="0.5" />
        </linearGradient>
        <filter id={u("glow")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={u("lamp")}>
          <stop stopColor="#ffb25e" />
          <stop offset="1" stopColor="#ffb25e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="220" fill={`url(#${u("bg")})`} />
      <ellipse cx="200" cy="90" rx="190" ry="90" fill="#5a4bff" opacity="0.18" />

      {/* background silhouettes */}
      <path d="M0 170h60v-30h26v30h40v-18h30v18h244v50H0Z" fill="#0a0d3c" />
      <path d="M312 170v-44c0-4 6-4 6 0v44h14v-24c0-4 6-4 6 0v24h-26Z" fill="#05072a" />

      {/* small purple bubble */}
      <g filter={`url(#${u("glow")})`}>
        <path d="M40 92a10 10 0 0 1 10-10h74a10 10 0 0 1 10 10v54a10 10 0 0 1-10 10H62l-16 14v-14h-6a10 10 0 0 1-10-10V92Z" transform="translate(-6 8)" fill={`url(#${u("small")})`} stroke="#b59bff" strokeWidth="1.5" />
      </g>

      {/* main chat window */}
      <g filter={`url(#${u("glow")})`} transform="rotate(-3 200 80)">
        <path d="M96 38h210a12 12 0 0 1 12 12v78a12 12 0 0 1-12 12H260l-22 22v-22H96a12 12 0 0 1-12-12V50a12 12 0 0 1 12-12Z" fill={`url(#${u("big")})`} stroke="#9cc8ff" strokeWidth="2" />
        <path d="M100 38h200a12 12 0 0 1 12 12v8H88v-8a12 12 0 0 1 12-12Z" fill="#fff" opacity="0.12" />
        <rect x="100" y="52" width="58" height="5" rx="2.5" fill="#fff" opacity="0.9" />
        <rect x="272" y="52" width="26" height="5" rx="2.5" fill="#cfe0ff" opacity="0.8" />
        <rect x="100" y="74" width="170" height="4" rx="2" fill="#e9f1ff" opacity="0.95" />
        <rect x="100" y="90" width="190" height="4" rx="2" fill="#e9f1ff" opacity="0.8" />
        <rect x="100" y="106" width="120" height="4" rx="2" fill="#e9f1ff" opacity="0.65" />
        <rect x="100" y="120" width="150" height="4" rx="2" fill="#e9f1ff" opacity="0.45" />
      </g>

      {/* warm lamp bottom-right */}
      <circle cx="352" cy="178" r="22" fill={`url(#${u("lamp")})`} />
      <circle cx="352" cy="180" r="6" fill="#ffd9a0" />
      <path d="M0 196h400v24H0z" fill="#06082a" />
    </svg>
  );
}
