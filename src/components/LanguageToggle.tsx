import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] bg-foreground/5 px-3 py-1.5 rounded-full">
      <button
        onClick={() => setLang("en")}
        className={
          lang === "en"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground transition-colors"
        }
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <span className="text-muted-foreground">/</span>
      <button
        onClick={() => setLang("gr")}
        className={
          lang === "gr"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground transition-colors"
        }
        aria-pressed={lang === "gr"}
      >
        ΕΛ
      </button>
    </div>
  );
}
