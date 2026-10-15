"use client";

import { useActionState, useId } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";
import { ArrowRightIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
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
    // coming-soon state: same shapes, but clearly inactive
    soonButton: "rounded-lg border border-white/25 bg-white/15 text-white/75",
    soonHint: "text-white/75",
  },
  /** On a light card */
  light: {
    input: "border-line bg-surface text-ink placeholder:text-muted focus:border-brand/60",
    button: "rounded-lg",
    error: "text-rose-600 dark:text-rose-300",
    success: "text-emerald-600 dark:text-emerald-300",
    soonButton: "rounded-lg border border-line bg-surface-2 text-muted",
    soonHint: "text-muted",
  },
} as const;

type FormProps = { variant: keyof typeof variants; className?: string };

/** Signup form while the newsletter is switched off: nothing is submitted, stored or confirmed. */
function ComingSoonForm({ variant, className }: FormProps) {
  const styles = variants[variant];
  const id = useId();

  return (
    <div className={className}>
      <div className="flex gap-2.5">
        <label htmlFor={`${id}-email`} className="sr-only">
          E-posta adresi
        </label>
        <input
          id={`${id}-email`}
          type="email"
          disabled
          placeholder="E-posta adresiniz"
          aria-describedby={`${id}-hint`}
          className={cn("h-10 min-w-0 flex-1 cursor-not-allowed rounded-lg border px-3.5 text-sm opacity-60 outline-none", styles.input)}
        />
        <button
          type="button"
          disabled
          aria-describedby={`${id}-hint`}
          className={cn("inline-flex h-10 shrink-0 cursor-not-allowed items-center gap-2 px-5 text-sm font-semibold", styles.soonButton)}
        >
          Yakında
        </button>
      </div>

      <p id={`${id}-hint`} className={cn("mt-2 min-h-5 text-xs", styles.soonHint)}>
        Bülten aboneliği çok yakında açılacak.
      </p>
    </div>
  );
}

/** The working form: validated Server Action, pending state, success / error message. */
function ActiveForm({ variant, className }: FormProps) {
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

/** Newsletter signup. Shows the "Yakında" state until `site.newsletter.enabled` is turned on (see lib/newsletter.ts). */
export function NewsletterForm({ variant = "dark", className }: Partial<FormProps>) {
  const Form = site.newsletter.enabled ? ActiveForm : ComingSoonForm;
  return <Form variant={variant} className={className} />;
}
