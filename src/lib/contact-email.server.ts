import { supabaseAdmin } from "@/integrations/supabase/client.server";

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
  const messageBaseId = `contact-form-${crypto.randomUUID()}`;
  const email = buildContactEmail(input);
  const recipients = [BUSINESS_RECIPIENT, BCC_RECIPIENT];

  for (const recipient of recipients) {
    const messageId = `${messageBaseId}-${recipient === BUSINESS_RECIPIENT ? "business" : "copy"}`;
    const payload = {
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
      queued_at: new Date().toISOString(),
    };

    const { error: enqueueError } = await supabaseAdmin.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload,
    });

    if (enqueueError) throw enqueueError;

    await supabaseAdmin.from("email_send_log").insert({
      message_id: messageId,
      template_name: "contact-form",
      recipient_email: recipient,
      status: "pending",
      metadata: { source: "website_contact_form" },
    });
  }
}