import { createServerFn } from "@tanstack/react-start";

type ContactFormInput = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendContactForm = createServerFn({ method: "POST" })
  .inputValidator((input: ContactFormInput) => {
    if (!input || typeof input !== "object") throw new Error("Invalid input");

    const name = String(input.name || "").trim();
    const email = String(input.email || "").trim();
    const message = String(input.message || "").trim();
    const website = String(input.website || "").trim();

    if (name.length < 1 || name.length > 120) throw new Error("Invalid name");
    if (!emailRegex.test(email) || email.length > 254) throw new Error("Invalid email");
    if (message.length < 1 || message.length > 4000) throw new Error("Invalid message");

    return { name, email, message, website };
  })
  .handler(async ({ data }) => {
    try {
      if (data.website) {
        console.warn("Contact form honeypot triggered");
        return { ok: true as const };
      }

      const { enqueueContactEmail } = await import("./contact-email.server");
      await enqueueContactEmail({ name: data.name, email: data.email, message: data.message });
      return { ok: true as const };
    } catch (error) {
      console.error("Contact form email failed", error);
      return { ok: false, reason: "send_failed" as const };
    }
  });