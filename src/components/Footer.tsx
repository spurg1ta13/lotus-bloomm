import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <>
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display italic text-lg opacity-60">{t("footer_brand")}</div>
          <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
            © {new Date().getFullYear()} Lotus Bloom · {t("footer_rights")}
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground">
              {t("footer_privacy")}
            </a>
            <a href="/terms" className="hover:text-foreground">
              {t("footer_terms")}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
