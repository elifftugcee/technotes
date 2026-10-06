import { AsteriskIcon, BookIcon, ChatIcon, ClockIcon, CodeIcon } from "@/components/ui/icons";

const actions = [
  { label: "Write code", Icon: CodeIcon },
  { label: "Explain code", Icon: BookIcon },
  { label: "Debug issues", Icon: AsteriskIcon },
  { label: "Refactor", Icon: ChatIcon },
  { label: "Run tests", Icon: ClockIcon },
];

/** Illustration of an interactive coding-assistant prompt — for `<Figure><TerminalDemo /></Figure>`. */
export function TerminalDemo() {
  return (
    <div
      role="img"
      aria-label="Terminalde çalışan bir kodlama asistanı: komut satırında 'claude code' yazılmış, altında kod yaz, açıkla, hata ayıkla, yeniden düzenle ve testleri çalıştır seçenekleri listeleniyor"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#070b32] via-[#0f1450] to-[#241a78] p-5 sm:p-8"
    >
      {/* mountains + glass card (right) */}
      <svg viewBox="0 0 300 200" aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden h-full w-[45%] sm:block" preserveAspectRatio="xMaxYMax slice">
        <defs>
          <linearGradient id="term-m1" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#7b8cff" />
            <stop offset="1" stopColor="#3b2fa8" />
          </linearGradient>
        </defs>
        <path d="M0 200 70 90l36 40 54-86 70 96 40-50 30 40v70Z" fill="url(#term-m1)" opacity="0.85" />
        <path d="m160 44-14 22 12-6 8 10 10-10-16-16Z" fill="#fff" opacity="0.8" />
        <path d="M0 200 90 130l60 40 60-50 90 80Z" fill="#241a78" opacity="0.8" />
      </svg>

      <div className="max-w-[26rem] rounded-xl border border-white/10 bg-[#0a0e2e]/90 p-4 font-mono text-[0.8rem] text-slate-200 shadow-2xl backdrop-blur">
        <div className="mb-4 flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <p>
          <span className="text-emerald-300">$</span> claude code
        </p>
        <p className="mt-3 text-slate-400">
          <span className="text-sky-300">&gt;</span> How can I help you today?
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
          {actions.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-2 text-slate-300">
              <Icon className="h-3.5 w-3.5 text-sky-300" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-5 right-5 hidden items-center gap-2 rounded-2xl border border-white/30 bg-white/15 px-5 py-3 text-lg font-semibold text-white shadow-xl backdrop-blur-md sm:flex">
        <AsteriskIcon className="h-5 w-5 text-orange-300" />
        Claude
      </div>
    </div>
  );
}
