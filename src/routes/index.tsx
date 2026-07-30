import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Instagram, Facebook } from "lucide-react";
import { Header } from "@/components/Header";
import { CookieBanner } from "@/components/CookieBanner";
import { useI18n, translations } from "@/lib/i18n";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { MonsteraLeaf } from "@/components/MonsteraLeaf";
import heroAsset from "@/assets/hero.webp.asset.json";
import heroMobileAsset from "@/assets/hero-mobile.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ property: "og:url", content: "https://lotus-bloomm.lovable.app/" }],
    links: [
      { rel: "canonical", href: "https://lotus-bloomm.lovable.app/" },
      {
        rel: "preload",
        as: "image",
        href: heroAsset.url,
        imageSrcSet: `${heroMobileAsset.url} 720w, ${heroAsset.url} 1024w`,
        imageSizes: "(max-width: 767px) 100vw, 50vw",
        fetchpriority: "high",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          name: "Lotus Bloom Nails & More",
          url: "https://lotus-bloomm.lovable.app/",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Paraskevopoulou 15",
            addressLocality: "Thessaloniki",
            postalCode: "546 40",
            addressCountry: "GR",
          },
          telephone: "+30 231 305 2391",
          email: "lotusbloomnails@gmail.com",
          openingHours: "Mo-Sa 10:00-20:00",
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
  const fromLabel = t("svc_from");
  const groups: {
    label: string;
    items: { key: keyof typeof translations.en; price: string; from?: boolean }[];
  }[] = [
    {
      label: t("svc_cat_hands"),
      items: [
        { key: "svc_h1", price: "€7" },
        { key: "svc_h2", price: "€10" },
        { key: "svc_h3", price: "€13" },
        { key: "svc_h4", price: "€16" },
        { key: "svc_h5", price: "€22" },
        { key: "svc_h6", price: "€33", from: true },
        { key: "svc_h7", price: "€25" },
        { key: "svc_h8", price: "€10" },
      ],
    },
    {
      label: t("svc_cat_feet"),
      items: [
        { key: "svc_f1", price: "€18" },
        { key: "svc_f2", price: "€15" },
        { key: "svc_f3", price: "€24" },
        { key: "svc_f4", price: "€20" },
        { key: "svc_f5", price: "€25" },
        { key: "svc_f6", price: "€5" },
        { key: "svc_f7", price: "€7" },
      ],
    },
    {
      label: t("svc_cat_extras"),
      items: [
        { key: "svc_e1", price: "€3" },
        { key: "svc_e2", price: "€10" },
        { key: "svc_e3", price: "€5" },
        { key: "svc_e4", price: "€5" },
        { key: "svc_e5", price: "€1", from: true },
      ],
    },
    {
      label: t("svc_cat_face"),
      items: [
        { key: "svc_fa1", price: "€5" },
        { key: "svc_fa2", price: "€10" },
        { key: "svc_fa3", price: "€30" },
        { key: "svc_fa4", price: "€30" },
        { key: "svc_fa5", price: "€50" },
        { key: "svc_fa6", price: "€5" },
        { key: "svc_fa7", price: "€10" },
        { key: "svc_fa8", price: "€12" },
        { key: "svc_fa9", price: "€5" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main>
        {/* Hero */}
        <section id="home" className="relative pt-16 pb-20 px-6 overflow-hidden">
          <MonsteraLeaf
            eager
            className="hidden md:block absolute -right-32 -top-16 w-[520px] pointer-events-none select-none"
            rotate={15}
            opacity={0.55}
          />
          <MonsteraLeaf
            eager
            className="md:hidden absolute -right-24 -top-6 w-[300px] pointer-events-none select-none"
            rotate={18}
            opacity={0.45}
          />
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-reveal">
              <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
                {t("hero_kicker")}
              </span>
              <h1 className="font-display text-6xl md:text-8xl leading-[0.9] text-balance mb-8">
                <span className="sr-only">
                  Lotus Bloom Nails & More — Beauty Salon in Thessaloniki
                </span>
                <span aria-hidden="true">
                  {t("hero_title_a")} <br />
                  <span className="italic text-accent underline decoration-1 underline-offset-8">
                    {t("hero_title_b")}
                  </span>
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
                src={heroAsset.url}
                srcSet={`${heroMobileAsset.url} 720w, ${heroAsset.url} 1024w`}
                sizes="(max-width: 767px) 100vw, 50vw"
                alt="Lotus Bloom salon interior"
                width={1024}
                height={1024}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full aspect-[3/4] object-cover rounded-t-[200px] rounded-b-lg"
              />
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-16 md:py-20 px-6">
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
        <section
          id="about"
          className="relative py-16 md:py-20 px-6 bg-foreground/5 overflow-hidden"
        >
          <MonsteraLeaf
            className="absolute -left-24 -bottom-20 w-[380px] pointer-events-none select-none"
            flip
            rotate={-15}
            opacity={0.5}
          />
          <div className="relative max-w-4xl mx-auto text-center animate-reveal">
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
        <section id="services" className="relative py-16 md:py-20 px-6 overflow-hidden">
          <MonsteraLeaf
            className="hidden md:block absolute -right-40 top-32 w-[440px] pointer-events-none select-none"
            rotate={28}
            opacity={0.45}
          />
          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-8 mb-16 border-b border-border pb-8">
              <h2 className="font-display text-5xl italic leading-none">{t("services_title")}</h2>
              <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase sm:text-right shrink-0">
                {t("services_meta")}
              </p>
            </div>

            <div className="space-y-16">
              {groups.map((g) => (
                <div key={g.label}>
                  <h3 className="font-display text-3xl md:text-4xl italic mb-6 text-accent">
                    {g.label}
                  </h3>
                  <ul className="border-t border-border">
                    {g.items.map((item) => (
                      <li
                        key={item.key}
                        className="flex items-baseline justify-between gap-4 py-4 border-b border-border hover:bg-accent/5 transition-colors"
                      >
                        <span className="font-display text-lg md:text-xl pr-2">{t(item.key)}</span>
                        <span className="flex-1 mx-3 border-b border-dotted border-border/60 translate-y-[-4px]" />
                        <span className="font-mono text-sm md:text-base text-accent whitespace-nowrap shrink-0">
                          {item.from ? `${fromLabel} ` : ""}
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display italic text-lg text-muted-foreground">
            {t("footer_brand")}
          </div>
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
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    message?: string;
    consent?: string;
  }>({});
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const website = String(data.get("website") || "").trim();
    const consent = data.get("consent") === "on";
    const next: typeof errors = {};
    if (!name) next.name = t("form_err_name");
    if (!phone || !/^\+?[0-9]{6,20}$/.test(phone.replace(/\s+/g, "")))
      next.phone = t("form_err_phone");
    if (!message) next.message = t("form_err_message");
    if (!consent) next.consent = t("form_err_consent");
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    const response = await fetch("/api/public/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, message, website }),
    });
    if (!response.ok) {
      setErrors({
        consent: "We couldn't send your message. Please try again or email us directly.",
      });
      setSubmitting(false);
      return;
    }
    form.reset();
    setSent(true);
    setSubmitting(false);
  };

  return (
    <section id="contact" className="relative py-16 md:py-20 px-6 overflow-hidden">
      <MonsteraLeaf
        className="hidden md:block absolute -right-32 top-4 w-[460px] pointer-events-none select-none"
        rotate={22}
        opacity={0.5}
      />
      <MonsteraLeaf
        className="hidden md:block absolute -left-28 bottom-4 w-[340px] pointer-events-none select-none"
        flip
        rotate={-18}
        opacity={0.4}
      />
      <MonsteraLeaf
        className="md:hidden absolute -right-20 top-2 w-[240px] pointer-events-none select-none"
        rotate={25}
        opacity={0.4}
      />
      <MonsteraLeaf
        className="md:hidden absolute -left-24 top-[40%] w-[260px] pointer-events-none select-none"
        flip
        rotate={-20}
        opacity={0.35}
      />
      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-24 mb-16">
        <div>
          <h2 className="font-display text-5xl mb-8 italic text-balance">{t("contact_title")}</h2>
          <div className="space-y-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4">
              {t("contact_info")}
            </p>
            <div className="space-y-2">
              <p className="text-base">
                <a href="tel:+302313052391" className="hover:text-accent transition-colors">
                  +30 231 305 2391
                </a>
              </p>
              <p className="text-base">
                <a
                  href="mailto:lotusbloomnails@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  lotusbloomnails@gmail.com
                </a>
              </p>
              <p className="text-base">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lotus+Bloom+Paraskevopoulou+15+Thessaloniki+54640"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors underline underline-offset-4"
                >
                  {t("contact_address")}
                </a>
              </p>
              <p className="text-base">{t("contact_hours")}</p>
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
              <a
                href="mailto:lotusbloomnails@gmail.com"
                className="text-sm underline underline-offset-4 hover:text-accent transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        <div className="bg-foreground/5 p-8 md:p-12 rounded-sm">
          {sent ? (
            <p className="font-display text-2xl italic">{t("form_sent")}</p>
          ) : (
            <form className="space-y-8" onSubmit={onSubmit} noValidate>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="space-y-1">
                <label
                  htmlFor="contact-name"
                  className="text-[10px] uppercase tracking-widest font-mono block"
                >
                  {t("form_name")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className={`w-full bg-transparent border-b py-2 focus:outline-none transition-colors ${errors.name ? "border-accent" : "border-border focus:border-accent"}`}
                />
                {errors.name && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent pt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="contact-phone"
                  className="text-[10px] uppercase tracking-widest font-mono block"
                >
                  {t("form_phone")}
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="[+0-9 ]*"
                  maxLength={20}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    const cleaned = el.value.replace(/[^+0-9 ]/g, "");
                    if (cleaned !== el.value) el.value = cleaned;
                  }}
                  className={`w-full bg-transparent border-b py-2 focus:outline-none transition-colors ${errors.phone ? "border-accent" : "border-border focus:border-accent"}`}
                />
                {errors.phone && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent pt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="contact-message"
                  className="text-[10px] uppercase tracking-widest font-mono block"
                >
                  {t("form_message")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  className={`w-full bg-transparent border-b py-2 focus:outline-none transition-colors resize-none ${errors.message ? "border-accent" : "border-border focus:border-accent"}`}
                />
                {errors.message && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent pt-1">
                    {errors.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="flex items-start gap-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    className="mt-1 h-4 w-4 accent-accent border-border"
                  />
                  <span className="text-muted-foreground leading-relaxed">
                    {t("form_consent_a")}{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-accent transition-colors"
                    >
                      {t("form_consent_b")}
                    </a>
                    .
                  </span>
                </label>
                {errors.consent && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent pt-1">
                    {errors.consent}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 border border-foreground text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-all"
              >
                {submitting ? "…" : t("form_submit")}
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
