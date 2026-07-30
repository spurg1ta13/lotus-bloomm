import { createServerFn } from "@tanstack/react-start";

type ContactFormInput = {
  name: string;
  phone: string;
  message: string;
  website?: string;
};

const phoneRegex = /^\+?[0-9 ]{6,20}$/;

export const sendContactForm = createServerFn({ method: "POST" })
  .inputValidator((input: ContactFormInput) => {
    if (!input || typeof input !== "object") throw new Error("Invalid input");

    const name = String(input.name || "").trim();
    const phone = String(input.phone || "").trim();
    const message = String(input.message || "").trim();
    const website = String(input.website || "").trim();

    if (name.length < 1 || name.length > 120) throw new Error("Invalid name");
    if (!phoneRegex.test(phone)) throw new Error("Invalid phone");
    if (message.length < 1 || message.length > 4000) throw new Error("Invalid message");

    return { name, phone, message, website };
  })
  .handler(async ({ data }) => {
    try {
      if (data.website) {
        console.warn("Contact form honeypot triggered");
        return { ok: true as const };
      }

      const { enqueueContactEmail } = await import("./contact-email.server");
      await enqueueContactEmail({ name: data.name, phone: data.phone, message: data.message });
      return { ok: true as const };
    } catch (error) {
      console.error("Contact form email failed", error);
      return { ok: false, reason: "send_failed" as const };
    }
  });
