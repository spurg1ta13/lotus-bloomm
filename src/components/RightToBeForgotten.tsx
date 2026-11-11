import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";

export function RightToBeForgotten({ className = "hover:text-foreground uppercase" }: { className?: string }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "invalid">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\+?[0-9 ]{6,20}$/.test(phone.trim())) return setState("invalid");
    setState("sending");
    try {
      const res = await fetch("/api/public/forget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), website }),
      });
      setPhone("");
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setState("idle"); setPhone(""); } }}>
      <DialogTrigger asChild>
        <button type="button" className={className}>{t("rtbf_link")}</button>
      </DialogTrigger>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">{t("rtbf_title")}</DialogTitle>
          <DialogDescription className="text-base">{t("rtbf_desc")}</DialogDescription>
        </DialogHeader>
        {state === "done" ? (
          <p className="text-base text-foreground" role="status">{t("rtbf_done")}</p>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-4">
            <label className="block text-sm text-muted-foreground" htmlFor="rtbf-phone">{t("rtbf_label")}</label>
            <input
              id="rtbf-phone"
              type="tel"
              inputMode="tel"
              autoComplete="off"
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/[^0-9+ ]/g, "")); if (state !== "sending") setState("idle"); }}
              className="w-full border-b border-border bg-transparent py-3 text-base outline-none focus:border-foreground"
              aria-invalid={state === "invalid"}
            />
            <input tabIndex={-1} aria-hidden="true" autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" />
            {state === "invalid" && <p className="text-sm text-destructive">{t("form_err_phone")}</p>}
            {state === "error" && <p className="text-sm text-destructive">{t("rtbf_error")}</p>}
            <button
              type="submit"
              disabled={state === "sending"}
              className="w-full min-h-11 bg-primary text-primary-foreground py-3 text-sm uppercase tracking-widest disabled:opacity-60"
            >
              {state === "sending" ? t("rtbf_sending") : t("rtbf_submit")}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
