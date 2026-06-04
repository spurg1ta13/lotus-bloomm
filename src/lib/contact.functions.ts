import { createServerFn } from "@tanstack/react-start";

import { enqueueContactEmail } from "./contact-email.server";

type ContactFormInput = {
  name: string;
  email: string;
  message: string;
  token: string;
  action: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendContactForm = createServerFn({ method: "POST" })
  .inputValidator((input: ContactFormInput) => {
    if (!input || typeof input !== "object") throw new Error("Invalid input");

    const name = String(input.name || "").trim();
    const email = String(input.email || "").trim();
    const message = String(input.message || "").trim();
    const token = String(input.token || "").trim();
    const action = String(input.action || "").trim();

    if (name.length < 1 || name.length > 120) throw new Error("Invalid name");
    if (!emailRegex.test(email) || email.length > 254) throw new Error("Invalid email");
    if (message.length < 1 || message.length > 4000) throw new Error("Invalid message");
    if (token.length < 20 || token.length > 4096) throw new Error("Invalid token");
    if (action !== "contact_submit") throw new Error("Invalid action");

    return { name, email, message, token, action };
  })
  .handler(async ({ data }) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.error("RECAPTCHA_SECRET_KEY missing");
      return { ok: false, reason: "server_misconfigured" as const };
    }

    try {
      const params = new URLSearchParams({ secret, response: data.token });
      const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const json = (await res.json()) as {
        success: boolean;
        score?: number;
        action?: string;
        "error-codes"?: string[];
      };
      const score = json.score ?? 0;
      const actionOk = !json.action || json.action === data.action;
      if (json.success !== true || !actionOk || score < 0.5) {
        console.warn("Contact form blocked by reCAPTCHA", { score, action: json.action, errors: json["error-codes"] });
        return { ok: false, reason: "bot_check_failed" as const };
      }

      await enqueueContactEmail({ name: data.name, email: data.email, message: data.message });
      return { ok: true as const };
    } catch (error) {
      console.error("Contact form email failed", error);
      return { ok: false, reason: "send_failed" as const };
    }
  });