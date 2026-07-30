import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(20)
    .regex(/^\+?[0-9 ]+$/),
  message: z.string().trim().min(1).max(4000),
  website: z.string().trim().max(200).optional().default(""),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        try {
          const rawBody = await request.text();
          if (rawBody.length > 6000) {
            return Response.json(
              { error: "Message too large" },
              { status: 413, headers: corsHeaders },
            );
          }

          const data = ContactSchema.parse(JSON.parse(rawBody));
          if (data.website) {
            return Response.json({ ok: true }, { headers: corsHeaders });
          }

          const { enqueueContactEmail } = await import("@/lib/contact-email.server");
          await enqueueContactEmail({ name: data.name, phone: data.phone, message: data.message });

          return Response.json({ ok: true }, { headers: corsHeaders });
        } catch (error) {
          console.error("Contact form request failed", error);
          return Response.json(
            { error: "Unable to send message" },
            { status: 500, headers: corsHeaders },
          );
        }
      },
    },
  },
});
