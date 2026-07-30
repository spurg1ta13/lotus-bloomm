import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export function CookieBanner() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie-consent")) setShow(true);
    } catch {}
  }, []);

  const decide = (v: "accepted" | "declined") => {
    try {
      localStorage.setItem("cookie-consent", v);
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 bg-foreground text-background rounded-sm p-6 shadow-2xl border border-foreground animate-reveal">
      <p className="text-sm leading-relaxed text-pretty mb-4">{t("cookie_text")}</p>
      <div className="flex gap-3">
        <button
          onClick={() => decide("accepted")}
          className="flex-1 py-2.5 bg-background text-foreground text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {t("cookie_accept")}
        </button>
        <button
          onClick={() => decide("declined")}
          className="flex-1 py-2.5 border border-background/30 text-[11px] uppercase tracking-[0.2em] font-medium hover:border-background transition-colors"
        >
          {t("cookie_decline")}
        </button>
      </div>
    </div>
  );
}
