import { Instagram, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import logo from "@/assets/logo.png";

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
        <a href="#home" className="flex items-center gap-2" aria-label="Lotus Bloom Nails & More">
          <img src={logo} alt="Lotus Bloom" className="h-10 w-auto" width={40} height={40} />
          <span className="font-display text-xl font-bold tracking-tight italic hidden sm:inline">Lotus Bloom</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:+302313052391"
            aria-label="Call +30 2313 052391"
            className="hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            <span className="hidden lg:inline">2313 052391</span>
          </a>
          <a
            href="https://www.instagram.com/lotusbloom_nails.and.more"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}