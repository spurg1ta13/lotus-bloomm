import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const { t } = useI18n();
  const links = [
    { href: "#home", label: t("nav_home") },
    { href: "#about", label: t("nav_about") },
    { href: "#services", label: t("nav_services") },
    { href: "#contact", label: t("nav_contact") },
  ];
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="font-display text-xl font-bold tracking-tight italic">
          Lotus Bloom
        </a>
        <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <LanguageToggle />
      </div>
    </nav>
  );
}