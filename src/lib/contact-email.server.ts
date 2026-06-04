import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendLovableEmail } from "@lovable.dev/email-js";

const SENDER_DOMAIN = "notify.lotusbloom.gr";
const BUSINESS_RECIPIENT = "lotusbloomnails@gmail.com";
const BCC_RECIPIENT = "grespurga@gmail.com";

type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildContactEmail({ name, email, message }: ContactEmailInput) {
  const submittedAt = new Date().toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Athens",
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const subject = `New booking inquiry from ${name}`.slice(0, 120);
  const text = [
    "New Lotus Bloom form submission",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #231f20; line-height: 1.6; background: #ffffff; padding: 24px;">
      <div style="max-width: 620px; margin: 0 auto; border: 1px solid #eadfe3; padding: 28px;">
        <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #9c6676;">Lotus Bloom Nails & More</p>
        <h1 style="margin: 0 0 24px; font-size: 24px; font-weight: 500;">New booking inquiry</h1>
        <p style="margin: 0 0 12px;"><strong>Name:</strong> ${safeName}</p>
        <p style="margin: 0 0 12px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #9c6676;">${safeEmail}</a></p>
        <p style="margin: 0 0 24px;"><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
        <div style="border-top: 1px solid #eadfe3; padding-top: 20px;">
          <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
          <p style="margin: 0; white-space: normal;">${safeMessage}</p>
        </div>
      </div>
    </div>
  `;

  return { subject, text, html };
}

export async function enqueueContactEmail(input: ContactEmailInput) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("Missing email API key");

  const messageBaseId = `contact-form-${crypto.randomUUID()}`;
  const email = buildContactEmail(input);
  const recipients = [BUSINESS_RECIPIENT, BCC_RECIPIENT];

  for (const recipient of recipients) {
    const messageId = `${messageBaseId}-${recipient === BUSINESS_RECIPIENT ? "business" : "copy"}`;
    const { data: suppressed, error: suppressionError } = await supabaseAdmin
      .from("suppressed_emails")
      .select("id")
      .eq("email", recipient)
      .maybeSingle();

    if (suppressionError) throw suppressionError;

    if (suppressed) {
      await supabaseAdmin.from("email_send_log").insert({
        message_id: messageId,
        template_name: "contact-form",
        recipient_email: recipient,
        status: "suppressed",
        metadata: { source: "website_contact_form" },
      });
      continue;
    }

    const { data: existingToken, error: existingTokenError } = await supabaseAdmin
      .from("email_unsubscribe_tokens")
      .select("token")
      .eq("email", recipient)
      .maybeSingle();

    if (existingTokenError) throw existingTokenError;

    let unsubscribeToken = existingToken?.token;

    if (!unsubscribeToken) {
      unsubscribeToken = crypto.randomUUID();
      const { error: tokenError } = await supabaseAdmin.from("email_unsubscribe_tokens").insert({
        token: unsubscribeToken,
        email: recipient,
      });

      if (tokenError) throw tokenError;
    }

    await supabaseAdmin.from("email_send_log").insert({
      message_id: messageId,
      template_name: "contact-form",
      recipient_email: recipient,
      status: "pending",
      metadata: { source: "website_contact_form" },
    });

    try {
      await sendLovableEmail(
        {
      to: recipient,
      from: `Lotus Bloom <noreply@${SENDER_DOMAIN}>`,
      reply_to: input.email,
      sender_domain: SENDER_DOMAIN,
      subject: email.subject,
      html: email.html,
      text: email.text,
      purpose: "transactional",
      label: "contact-form",
      idempotency_key: messageId,
      message_id: messageId,
      unsubscribe_token: unsubscribeToken,
        },
        { apiKey, sendUrl: process.env.LOVABLE_SEND_URL },
      );

      await supabaseAdmin.from("email_send_log").insert({
        message_id: messageId,
        template_name: "contact-form",
        recipient_email: recipient,
        status: "sent",
        metadata: { source: "website_contact_form" },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      await supabaseAdmin.from("email_send_log").insert({
        message_id: messageId,
        template_name: "contact-form",
        recipient_email: recipient,
        status: "failed",
        error_message: errorMessage.slice(0, 1000),
        metadata: { source: "website_contact_form" },
      });
      throw error;
    }
  }
}