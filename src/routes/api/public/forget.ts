import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Schema = z.object({
  phone: z.string().trim().min(6).max(20).regex(/^\+?[0-9 ]+$/),
  website: z.string().max(200).optional().default(""),
});

// Right to be forgotten: anonymises every stored record mentioning the phone.
// The request itself is never logged or persisted.
export const Route = createFileRoute("/api/public/forget")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const raw = await request.text();
          if (raw.length > 1000) return Response.json({ error: "too large" }, { status: 413 });
          const data = Schema.parse(JSON.parse(raw));
          if (data.website) return Response.json({ ok: true });
          const digits = data.phone.replace(/\D/g, "");
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.rpc("anonymize_contact_phone", { _digits: digits });
          if (error) throw new Error("anonymize failed");
          return Response.json({ ok: true });
        } catch {
          return Response.json({ error: "failed" }, { status: 400 });
        }
      },
    },
  },
});
