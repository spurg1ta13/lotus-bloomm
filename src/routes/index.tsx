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
      <header id="home" className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-reveal">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
              {t("hero_kicker")}
            </span>
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
              className="inline-block px-10 py-4 bg-foreground text-background text-[11px] uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-accent transition-colors"
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
              className="w-full aspect-[3/4] object-cover rounded-t-[200px] rounded-b-lg"
            />
          </div>
        </div>
      </header>

      {/* Gallery */}
      <section id="gallery" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-reveal">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
              {t("home_gallery_kicker")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl italic text-balance">
              {t("home_gallery_title")}
            </h2>
          </div>
          <GalleryCarousel showThumbnails={false} ctaHref="/gallery" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-6 bg-foreground/5">
        <div className="max-w-4xl mx-auto text-center animate-reveal">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-6">
            {t("about_kicker")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight text-balance">
            {t("about_title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-[60ch] mx-auto text-pretty leading-relaxed">
            {t("about_body")}
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-border pb-8">
            <h2 className="font-display text-5xl italic">{t("services_title")}</h2>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
              {t("services_meta")}
            </p>
          </div>

          <div className="grid gap-px bg-border border border-border overflow-hidden rounded-sm">
            {services.map((s) => (
              <div
                key={s.title}
                className="group bg-background p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors hover:bg-accent/5"
              >
                <div className="md:max-w-xl">
                  <h3 className="text-2xl font-display mb-2 underline decoration-accent/30 decoration-1 underline-offset-4">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm italic">{s.desc}</p>
                </div>
                <div className="flex items-center gap-8">
                  <span className="font-mono text-xl tracking-tighter text-accent">{s.price}</span>
                </div>
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
            rel="noopener noreferrer"
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
    <section id="contact" className="py-32 px-6">
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
