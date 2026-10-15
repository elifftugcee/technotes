/**
 * Newsletter provider seam (server only — keep API keys in server-side environment variables, never in the repo).
 *
 * The signup is switched off for now (`site.newsletter.enabled` in `content/site.ts`): there is no e-mail service
 * behind it yet, and the site is hosted where the file system is read-only, so nothing is stored or pretended.
 *
 * To turn it on:
 *   1. implement `addSubscriber` below with your provider (Buttondown, Resend, Mailchimp, …);
 *   2. set `site.newsletter.enabled` to `true`.
 * The form (`components/home/NewsletterForm.tsx`) and the Server Action (`app/actions/subscribe.ts`) already take
 * care of validation, the pending state and the success / error messages.
 */

export type SubscribeResult = "added" | "exists";

/** Adds `email` (already trimmed, lower-cased and validated) to the mailing list. */
export async function addSubscriber(email: string): Promise<SubscribeResult> {
  void email;
  throw new Error("Newsletter provider is not configured: implement addSubscriber in src/lib/newsletter.ts");
}
