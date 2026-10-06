import type { ReactNode } from "react";

export type IconProps = { className?: string };

type IconOptions = { fill?: boolean; strokeWidth?: number };

/** Builds a 24×24 icon component. Stroke icons by default; `fill` for solid brand marks. */
function createIcon(children: ReactNode, { fill = false, strokeWidth = 1.8 }: IconOptions = {}) {
  return function Icon({ className = "h-5 w-5" }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        {...(fill
          ? { fill: "currentColor" }
          : { fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" })}
      >
        {children}
      </svg>
    );
  };
}

/* Navigation & actions */
export const SearchIcon = createIcon(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </>,
  { strokeWidth: 2 },
);
export const MenuIcon = createIcon(<path d="M4 7h16M4 12h16M4 17h16" />, { strokeWidth: 2 });
export const CloseIcon = createIcon(<path d="M6 6l12 12M18 6 6 18" />, { strokeWidth: 2 });
export const ArrowRightIcon = createIcon(<path d="M5 12h14M13 6l6 6-6 6" />, { strokeWidth: 2 });
export const ArrowLeftIcon = createIcon(<path d="M19 12H5M11 6l-6 6 6 6" />, { strokeWidth: 2 });
export const ChevronRightIcon = createIcon(<path d="m9 6 6 6-6 6" />, { strokeWidth: 2 });
export const CheckIcon = createIcon(<path d="m5 12.5 4.5 4.5L19 7.5" />, { strokeWidth: 2.2 });
export const ChevronDownIcon = createIcon(<path d="m6 9 6 6 6-6" />, { strokeWidth: 2 });
export const SparklesIcon = createIcon(
  <>
    <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
    <path d="m19 15 .7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
  </>,
);

/* About page */
export const PencilIcon = createIcon(
  <>
    <path d="M4 20h4L19.2 8.8a2.8 2.8 0 0 0-4-4L4 16v4Z" />
    <path d="m13.5 6.5 4 4" />
  </>,
);
export const UserIcon = createIcon(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20c.8-4 3.8-6 7.5-6s6.7 2 7.5 6" />
  </>,
);
export const HeartIcon = createIcon(
  <path d="M12 20.5s-8-4.9-8-11.1A4.4 4.4 0 0 1 12 6.9a4.4 4.4 0 0 1 8 2.5c0 6.2-8 11.1-8 11.1Z" />,
  { fill: true },
);
export const SettingsIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 13.5a7.7 7.7 0 0 0 0-3l1.7-1.3-1.7-3-2 .8a7.6 7.6 0 0 0-2.6-1.5L14.5 3h-3.4l-.3 2.5A7.6 7.6 0 0 0 8.2 7l-2-.8-1.7 3 1.7 1.3a7.7 7.7 0 0 0 0 3l-1.7 1.3 1.7 3 2-.8a7.6 7.6 0 0 0 2.6 1.5l.3 2.5h3.4l.3-2.5a7.6 7.6 0 0 0 2.6-1.5l2 .8 1.7-3-1.7-1.3Z" />
  </>,
);
export const ChipIcon = createIcon(
  <>
    <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
    <rect x="10" y="10" width="4" height="4" rx="0.8" />
    <path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21" />
  </>,
);
export const EyeIcon = createIcon(
  <>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </>,
);
export const CameraIcon = createIcon(
  <>
    <path d="M4 8h3l1.5-2h7L17 8h3v11H4V8Z" />
    <circle cx="12" cy="13.5" r="3.3" />
  </>,
);
export const FlagIcon = createIcon(<path d="M5 21V4M5 4h11l-2 4 2 4H5" />);
export const CheckCircleIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.5 3 3 5-6" />
  </>,
);
export const QuoteIcon = createIcon(
  <path d="M5 18v-4.6C5 9.8 6.8 7.4 10 6.3l.8 1.5C9 8.6 8.2 9.8 8.2 11.5H10.6V18H5Zm8.4 0v-4.6c0-3.6 1.8-6 5-7.1l.8 1.5c-1.8.8-2.6 2-2.6 3.7h2.4V18h-5.6Z" />,
  { fill: true },
);
export const YoutubeIcon = createIcon(
  <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />,
  { fill: true },
);

/* Article page */
export const HomeIcon = createIcon(
  <>
    <path d="M4 11.2 12 4l8 7.2" />
    <path d="M6 10v9.5h12V10M10 19.5v-5h4v5" />
  </>,
);
export const ShareIcon = createIcon(
  <>
    <circle cx="6" cy="12" r="2.4" />
    <circle cx="18" cy="6" r="2.4" />
    <circle cx="18" cy="18" r="2.4" />
    <path d="m8.1 10.9 7.8-3.8M8.1 13.1l7.8 3.8" />
  </>,
);
export const LinkIcon = createIcon(
  <>
    <path d="M10 14a4.2 4.2 0 0 0 5.9 0l3-3A4.2 4.2 0 0 0 13 5l-1 1" />
    <path d="M14 10a4.2 4.2 0 0 0-5.9 0l-3 3A4.2 4.2 0 0 0 11 19l1-1" />
  </>,
);
export const ArrowDownIcon = createIcon(<path d="M12 5v14M6 13l6 6 6-6" />, { strokeWidth: 2 });
export const TrendingIcon = createIcon(<path d="M4 17l5.5-5.5 3.5 3.5L20 8M15 8h5v5" />, { strokeWidth: 2 });
export const XIcon = createIcon(
  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  { fill: true },
);
export const LinkedinIcon = createIcon(
  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />,
  { fill: true },
);

/* Articles page */
export const GridIcon = createIcon(
  <>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </>,
);
export const ListIcon = createIcon(<path d="M9 6.5h11M9 12h11M9 17.5h11M4 6.5h1M4 12h1M4 17.5h1" />, { strokeWidth: 2 });
export const BookmarkIcon = createIcon(<path d="M6.5 4h11v16L12 16.2 6.5 20V4Z" />);
export const BookmarkFilledIcon = createIcon(<path d="M6.5 4h11v16L12 16.2 6.5 20V4Z" />, { fill: true });
export const StackIcon = createIcon(
  <>
    <ellipse cx="12" cy="6" rx="7" ry="2.8" />
    <path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" />
  </>,
);

/* Theme */
export const SunIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
  </>,
);
export const MoonIcon = createIcon(<path d="M20 14.2A8 8 0 0 1 9.8 4a8 8 0 1 0 10.2 10.2Z" />);

/* Meta */
export const ClockIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </>,
);
export const CalendarIcon = createIcon(
  <>
    <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </>,
);
export const StarIcon = createIcon(
  <path d="m12 3.6 2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.6Z" />,
);
export const DocumentIcon = createIcon(
  <>
    <path d="M7 3.5h7.5L19 8v12.5H7V3.5Z" />
    <path d="M14.5 3.5V8H19M10 13h6M10 16.5h6" />
  </>,
);

/* Categories */
export const TargetIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="7.5" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
  </>,
);
export const AsteriskIcon = createIcon(
  <path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6M7.6 3.4l8.8 17.2M16.4 3.4 7.6 20.6M2.7 12h18.6" />,
  { strokeWidth: 2 },
);
export const ChatIcon = createIcon(
  <>
    <path d="M4 5.5h16v10.5H9.5L5 19.5V16H4V5.5Z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </>,
);
export const CodeIcon = createIcon(<path d="m8 7.5-4.5 4.5L8 16.5M16 7.5l4.5 4.5-4.5 4.5M13.5 5.5l-3 13" />, {
  strokeWidth: 2,
});
export const BookIcon = createIcon(
  <>
    <path d="M3.5 5.5C6.5 4.3 9.5 4.6 12 6.5c2.5-1.9 5.5-2.2 8.5-1v13c-3-1.2-6-.9-8.5 1-2.5-1.9-5.5-2.2-8.5-1v-13Z" />
    <path d="M12 6.5v13" />
  </>,
);

/* Hero stats */
export const CubeIcon = createIcon(
  <>
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </>,
);
export const NetworkIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="2.4" />
    <circle cx="5" cy="6" r="1.6" />
    <circle cx="19" cy="6" r="1.6" />
    <circle cx="5" cy="18" r="1.6" />
    <circle cx="19" cy="18" r="1.6" />
    <path d="m6.3 7.1 4 3.3M17.7 7.1l-4 3.3M6.3 16.9l4-3.3M17.7 16.9l-4-3.3" />
  </>,
);
export const ChartCheckIcon = createIcon(
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="m8 12.5 3 3 5-6" />
  </>,
);

/* Newsletter */
export const MailIcon = createIcon(
  <>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m4 7.5 8 6 8-6" />
  </>,
);
export const LockIcon = createIcon(
  <>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5" />
  </>,
);
export const UsersIcon = createIcon(
  <>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3 19.5c.4-3.3 2.9-5.2 6-5.2s5.6 1.9 6 5.2" />
    <path d="M16 5.6a3 3 0 0 1 0 5.8M17.5 14.6c2 .5 3.2 2 3.5 4.4" />
  </>,
);

/* Brands */
export const GithubIcon = createIcon(
  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.35.95.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />,
  { fill: true },
);
