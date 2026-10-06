"use server";

import { addSubscriber } from "@/lib/newsletter";

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Echoed back on errors so the field keeps what was typed */
  email?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function subscribe(_previous: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Lütfen geçerli bir e-posta adresi gir.", email };
  }

  try {
    const result = await addSubscriber(email);
    return {
      status: "success",
      message:
        result === "exists"
          ? "Bu e-posta zaten abone listesinde. Teşekkürler!"
          : "Abone oldun! Yeni yazılardan haberdar edileceksin.",
    };
  } catch (error) {
    console.error("Newsletter subscription failed", error);
    return { status: "error", message: "Şu an abonelik kaydedilemedi. Lütfen daha sonra tekrar dene.", email };
  }
}
