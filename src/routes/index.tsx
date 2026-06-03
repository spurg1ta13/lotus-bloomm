import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Instagram, Facebook } from "lucide-react";
import { Header } from "@/components/Header";
import { CookieBanner } from "@/components/CookieBanner";
import { useI18n, translations } from "@/lib/i18n";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lotus Bloom Nails & More — Beauty Salon in Thessaloniki" },
      { name: "description", content: "Nails, lashes, brows and signature beauty rituals in Thessaloniki. Book your appointment at Lotus Bloom." },
      { property: "og:title", content: "Lotus Bloom Nails & More" },
      { property: "og:description", content: "Signature beauty rituals in Thessaloniki — nails, lashes, brows and more." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          name: "Lotus Bloom Nails & More",
          image: "/og-image.jpg",
          address: { "@type": "PostalAddress", addressLocality: "Thessaloniki", addressCountry: "GR" },
          telephone: "+30 210 000 0000",
          email: "hello@lotusbloom.gr",
          sameAs: [
            "https://www.instagram.com/lotusbloom_nails.and.more",
            "https://www.facebook.com/p/Lotus-Bloom-nailsmore-61584502558088/",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  const services = [1, 2, 3, 4, 5, 6].map((i) => ({
    title: t(`svc_${i}_t` as keyof typeof translations.en),
    desc: t(`svc_${i}_d` as keyof typeof translations.en),
    price: ["€25", "€45", "€35", "€45", "€20", "€40"][i - 1],
  }));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />

      {/* Hero */}
      <header id="home" className="relative pt-16 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-reveal">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-10 bg-accent/40" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {t("hero_kicker")}
              </span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9] text-balance mb-8">
              {t("hero_title_a")} <br />
              <span className="italic text-accent underline decoration-1 underline-offset-8">
                {t("hero_title_b")}
              </span>
            </h1>
            <p className="max-w-[40ch] text-lg text-muted-foreground text-pretty leading-relaxed mb-10 italic">
              {t("hero_lede")}
            </p>
            <a
              href="#contact"
              className="inline-block px-10 py-4 bg-foreground text-background text-[11px] uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-accent transition-all duration-500 hover:tracking-[0.3em]"
            >
              {t("hero_cta")}
            </a>
          </div>
          <div className="relative animate-unfurl">
            <img
              src={heroImg}
              alt="Lotus Bloom salon interior"
              width={1024}
              height={1344}
              className="w-full aspect-[3/4] object-cover rounded-t-[200px] rounded-b-lg shadow-2xl"
            />
            {/* Decorative ornament */}
            <div className="absolute -bottom-6 -left-6 md:-left-10 w-28 h-28 rounded-full border border-accent/30 flex items-center justify-center bg-background/40 backdrop-blur-sm">
              <div className="w-full h-full rounded-full border border-accent/15 flex items-center justify-center">
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-accent">Bloom</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <section id="gallery" className="py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-reveal">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-10 bg-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {t("home_gallery_kicker")}
              </span>
              <span className="h-px w-10 bg-border" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl italic text-balance">
              {t("home_gallery_title")}
            </h2>
          </div>
          <GalleryCarousel showThumbnails={false} ctaHref="/gallery" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28 px-6 bg-foreground/5 relative">
        <div className="max-w-4xl mx-auto text-center animate-reveal">
          <div className="font-display italic text-5xl text-accent/40 mb-6 leading-none">&</div>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-10 bg-border" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              {t("about_kicker")}
            </span>
            <span className="h-px w-10 bg-border" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl mb-10 leading-tight text-balance italic">
            {t("about_title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-[60ch] mx-auto text-pretty leading-relaxed">
            {t("about_body")}
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-accent/40 to-transparent mx-auto mt-12" />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20 border-b border-border pb-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-3">01 — Menu</span>
              <h2 className="font-display text-5xl md:text-6xl italic">{t("services_title")}</h2>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase hidden md:block">
              {t("services_meta")}
            </p>
          </div>

          <div className="divide-y divide-border">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group py-10 md:py-12 grid grid-cols-[auto_1fr_auto] items-baseline gap-6 md:gap-10 transition-colors hover:text-accent"
              >
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest opacity-60 pt-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display mb-2 group-hover:italic transition-all">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm italic max-w-xl">{s.desc}</p>
                </div>
                <span className="font-mono text-lg md:text-xl tracking-tight text-accent self-start pt-2">
                  {s.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />

      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display italic text-lg opacity-60">{t("footer_brand")}</div>
          <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
            © {new Date().getFullYear()} Lotus Bloom · {t("footer_rights")}
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground">{t("footer_privacy")}</a>
            <a href="/terms" className="hover:text-foreground">{t("footer_terms")}</a>
          </div>
        </div>
      </footer>

      <div className="py-4 px-6 border-t border-border bg-foreground/5">
        <div className="max-w-7xl mx-auto text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {t("footer_powered")}{" "}
          <a
            href="https://devcraft.gr"
            target="_blank"
            rel="noopener"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            devcraft.gr
          </a>
        </div>
      </div>

      <CookieBanner />
    </div>
  );
}

function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:hello@lotusbloom.gr?subject=${encodeURIComponent("Booking inquiry")}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="py-16 md:py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 mb-16">
        <div>
          <h2 className="font-display text-5xl mb-8 italic text-balance">{t("contact_title")}</h2>
          <div className="space-y-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4">
              {t("contact_info")}
            </p>
            <div className="space-y-2">
              <p className="text-xl">
                <a href="tel:+302313052391" className="hover:text-accent transition-colors">+30 231 305 2391</a>
              </p>
              <p className="text-xl">
                <a href="mailto:hello@lotusbloom.gr" className="hover:text-accent transition-colors">hello@lotusbloom.gr</a>
              </p>
              <p className="text-sm">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lotus+Bloom+Paraskevopoulou+15+Thessaloniki+54640"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors underline underline-offset-4"
                >
                  {t("contact_address")}
                </a>
              </p>
              <p className="text-muted-foreground text-sm">{t("contact_hours")}</p>
            </div>
            <div className="pt-8 flex gap-6">
              <a
                href="https://www.instagram.com/lotusbloom_nails.and.more"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-accent transition-colors"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/p/Lotus-Bloom-nailsmore-61584502558088/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" strokeWidth={1.5} />
                <span>Facebook</span>
              </a>
              <a href="mailto:hello@lotusbloom.gr" className="text-sm underline underline-offset-4 hover:text-accent transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>
        <div className="bg-foreground/5 p-8 md:p-12 rounded-sm">
          {sent ? (
            <p className="font-display text-2xl italic">{t("form_sent")}</p>
          ) : (
            <form className="space-y-8" onSubmit={onSubmit}>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-mono">{t("form_name")}</label>
                <input
                  name="name"
                  required
                  type="text"
                  className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-mono">{t("form_email")}</label>
                <input
                  name="email"
                  required
                  type="email"
                  className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-mono">{t("form_message")}</label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 border border-foreground text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-all"
              >
                {t("form_submit")}
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <a
          href="https://www.google.com/maps/search/?api=1&query=Lotus+Bloom+Paraskevopoulou+15+Thessaloniki+54640"
          target="_blank"
          rel="noopener noreferrer"
          className="block group rounded-sm overflow-hidden border border-border"
          aria-label="Open Lotus Bloom on Google Maps"
        >
          <iframe
            title="Lotus Bloom — Paraskevopoulou 15, Thessaloniki"
            src="https://www.google.com/maps?q=Paraskevopoulou%2015%2C%20Thessaloniki%20546%2040&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[360px] md:h-[420px] grayscale group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
          />
        </a>
      </div>
    </section>
  );
}
