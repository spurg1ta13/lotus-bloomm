import { useState, useEffect } from "react";
import { Instagram, Facebook, Phone, Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import logo from "@/assets/logo.png";

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/#home", label: t("nav_home") },
    { href: "/#about", label: t("nav_about") },
    { href: "/#services", label: t("nav_services") },
    { href: "/gallery", label: t("nav_gallery"), internal: true },
    { href: "/#contact", label: t("nav_contact") },
  ];
  return (
    <>
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Lotus Bloom Nails & More">
          <img src={logo} alt="Lotus Bloom" className="h-10 w-auto" width={40} height={40} />
          <span className="font-display text-xl font-bold tracking-tight italic hidden sm:inline">Lotus Bloom</span>
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
          {links.map((l) =>
            l.internal ? (
              <Link key={l.href} to={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            ),
          )}
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
            className="hidden sm:inline-flex text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <a
            href="https://www.facebook.com/p/Lotus-Bloom-nailsmore-61584502558088/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hidden sm:inline-flex text-muted-foreground hover:text-foreground transition-colors"
          >
            <Facebook className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <LanguageToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center h-9 w-9 -mr-2 text-foreground hover:text-accent transition-colors"
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-background border-t border-border overflow-y-auto transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-6 py-10 flex flex-col gap-6">
          {links.map((l) =>
            l.internal ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl italic hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl italic hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ),
          )}
          <div className="pt-8 mt-4 border-t border-border flex items-center gap-6 text-muted-foreground">
            <a
              href="tel:+302313052391"
              aria-label="Call +30 2313 052391"
              className="inline-flex items-center gap-2 text-sm hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              2313 052391
            </a>
          </div>
          <div className="flex items-center gap-6 text-muted-foreground">
            <a
              href="https://www.instagram.com/lotusbloom_nails.and.more"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://www.facebook.com/p/Lotus-Bloom-nailsmore-61584502558088/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-foreground transition-colors"
            >
              <Facebook className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}