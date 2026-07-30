import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { GalleryCarousel, galleryImages } from "@/components/GalleryCarousel";
import { MonsteraLeaf } from "@/components/MonsteraLeaf";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Nail Art by Lotus Bloom Thessaloniki" },
      {
        name: "description",
        content:
          "Browse Lotus Bloom Nails & More gallery — signature manicures, gel extensions and hand-painted nail art in Thessaloniki.",
      },
      { property: "og:title", content: "Gallery — Lotus Bloom Nails & More" },
      {
        property: "og:description",
        content: "Nail art creations from our Thessaloniki studio.",
      },
      { property: "og:image", content: galleryImages[0].src },
      { property: "og:url", content: "https://lotus-bloomm.lovable.app/gallery" },
    ],
    links: [{ rel: "canonical", href: "https://lotus-bloomm.lovable.app/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="relative pt-4 md:pt-16 pb-24 px-6 overflow-hidden">
        <MonsteraLeaf
          className="hidden md:block absolute -right-32 top-10 w-[460px] pointer-events-none select-none"
          rotate={20}
          opacity={0.5}
        />
        <MonsteraLeaf
          className="md:hidden absolute -right-24 top-4 w-[280px] pointer-events-none select-none"
          rotate={22}
          opacity={0.4}
        />
        <MonsteraLeaf
          className="hidden md:block absolute -left-28 bottom-20 w-[360px] pointer-events-none select-none"
          flip
          rotate={-18}
          opacity={0.4}
        />
        <section className="relative max-w-6xl mx-auto pt-4 md:pt-16 text-center mb-16 animate-reveal">
          <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            {t("gallery_kicker")}
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.9] text-balance mb-8 italic">
            <span className="sr-only">
              Gallery — Nail Art Portfolio by Lotus Bloom Thessaloniki
            </span>
            <span aria-hidden="true">{t("gallery_heading")}</span>
          </h1>
          <p className="max-w-[55ch] mx-auto text-lg text-muted-foreground text-pretty leading-relaxed">
            {t("gallery_lede")}
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12">
          <GalleryCarousel eagerFirst />
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
