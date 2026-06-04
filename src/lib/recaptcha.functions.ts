import { createServerFn } from "@tanstack/react-start";

export const verifyRecaptcha = createServerFn({ method: "POST" })
  .inputValidator((input: { token: string; action: string }) => {
    if (!input || typeof input.token !== "string" || typeof input.action !== "string") {
      throw new Error("Invalid input");
    }
    if (input.token.length < 20 || input.token.length > 4096) throw new Error("Invalid token");
    if (input.action.length > 64) throw new Error("Invalid action");
    return input;
  })
  .handler(async ({ data }) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.error("RECAPTCHA_SECRET_KEY missing");
      return { ok: false, score: 0, reason: "server_misconfigured" as const };
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
      const ok = json.success === true && actionOk && score >= 0.5;
      return { ok, score, reason: ok ? ("passed" as const) : ("low_score" as const) };
    } catch (err) {
      console.error("reCAPTCHA verify failed", err);
      return { ok: false, score: 0, reason: "verify_failed" as const };
    }
  });