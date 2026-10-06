"use client";

import { useActionState, useId } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const initialState: SubscribeState = { status: "idle", message: "" };

const variants = {
  /** On the dark newsletter band */
  dark: {
    input:
      "border-transparent bg-white text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40",
    button: "rounded-lg border border-white/25",
    error: "text-rose-300",
    success: "text-emerald-300",
  },
  /** On a light card */
  light: {
    input: "border-line bg-surface text-ink placeholder:text-muted focus:border-brand/60",
    button: "rounded-lg",
    error: "text-rose-600 dark:text-rose-300",
    success: "text-emerald-600 dark:text-emerald-300",
  },
} as const;

export function NewsletterForm({ variant = "dark", className }: { variant?: keyof typeof variants; className?: string }) {
  const [state, formAction, pending] = useActionState(subscribe, initialState);
  const hasError = state.status === "error";
  const styles = variants[variant];
  const id = useId();

  return (
    <form action={formAction} className={className}>
      <div className="flex gap-2.5">
        <label htmlFor={`${id}-email`} className="sr-only">
          E-posta adresi
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="E-posta adresiniz"
          defaultValue={hasError ? state.email : ""}
          aria-invalid={hasError}
          aria-describedby={`${id}-status`}
          className={cn("h-10 min-w-0 flex-1 rounded-lg border px-3.5 text-sm outline-none", styles.input)}
        />
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex h-10 shrink-0 items-center gap-2 bg-brand-gradient px-5 text-sm font-semibold text-white shadow-brand transition-[filter,transform] hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-70",
            styles.button,
          )}
        >
          {pending ? "Gönderiliyor…" : "Abone Ol"}
          {!pending && <ArrowRightIcon className="h-4 w-4" />}
        </button>
      </div>

      <p id={`${id}-status`} role="status" className={cn("mt-2 min-h-5 text-xs", hasError ? styles.error : styles.success)}>
        {state.message}
      </p>
    </form>
  );
}
