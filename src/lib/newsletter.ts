import { promises as fs } from "fs";
import path from "path";

/**
 * Newsletter storage adapter.
 *
 * Subscribers are appended to a local JSON file (`.data/subscribers.json`, git-ignored). That works
 * in `next dev` and on a self-hosted Node server. On serverless hosts (e.g. Vercel) the file system
 * is read-only — replace the body of `addSubscriber` with a call to your email provider
 * (Buttondown, Resend, Mailchimp, …). Nothing else in the app needs to change.
 */
const dataDir = path.join(process.cwd(), ".data");
const subscribersFile = path.join(dataDir, "subscribers.json");

type Subscriber = { email: string; subscribedAt: string };

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    return JSON.parse(await fs.readFile(subscribersFile, "utf8")) as Subscriber[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function addSubscriber(email: string): Promise<"added" | "exists"> {
  const subscribers = await readSubscribers();
  if (subscribers.some((subscriber) => subscriber.email === email)) return "exists";

  subscribers.push({ email, subscribedAt: new Date().toISOString() });
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(subscribersFile, JSON.stringify(subscribers, null, 2));
  return "added";
}
