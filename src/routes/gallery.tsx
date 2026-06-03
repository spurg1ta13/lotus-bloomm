import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Header } from "@/components/Header";
import { CookieBanner } from "@/components/CookieBanner";
import { useI18n } from "@/lib/i18n";
import img1 from "@/assets/gallery/1.jpg.asset.json";
import img2 from "@/assets/gallery/2.jpg.asset.json";
import img3 from "@/assets/gallery/3.jpg.asset.json";

const images = [
  { src: img1.url, alt: "Black gel manicure with white animal-print accent nails" },
  { src: img2.url, alt: "Soft pink signature manicure on square nails" },
  { src: img3.url, alt: "Dark stiletto nail art with sculpted 3D elements" },
];

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
      { property: "og:image", content: img1.url },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t } = useI18n();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="pt-16 pb-24 px-6">
        <section className="max-w-6xl mx-auto pt-16 text-center mb-16 animate-reveal">
          <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            {t("gallery_kicker")}
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.9] text-balance mb-8 italic">
            {t("gallery_heading")}
          </h1>
          <p className="max-w-[55ch] mx-auto text-lg text-muted-foreground text-pretty leading-relaxed">
            {t("gallery_lede")}
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12">
          <Carousel
            opts={{ loop: true }}
            setApi={(a) => {
              setApi(a);
              if (!a) return;
              setCurrent(a.selectedScrollSnap());
              a.on("select", () => setCurrent(a.selectedScrollSnap()));
            }}
          >
            <CarouselContent>
              {images.map((im, i) => (
                <CarouselItem key={im.src}>
                  <figure className="overflow-hidden rounded-sm border border-border bg-foreground/5">
                    <img
                      src={im.src}
                      alt={im.alt}
                      width={1600}
                      height={1200}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={i === 0 ? "high" : "auto"}
                      className="w-full h-auto aspect-[4/5] md:aspect-[4/3] object-cover"
                    />
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="mt-8 flex items-center justify-center gap-3">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-8 bg-foreground" : "w-3 bg-border hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>

          <div className="mt-16 grid grid-cols-3 gap-3 md:gap-4">
            {images.map((im, i) => (
              <button
                key={im.src}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Show ${im.alt}`}
                className={`group overflow-hidden rounded-sm border transition-all ${
                  i === current ? "border-accent" : "border-border hover:border-foreground/40"
                }`}
              >
                <img
                  src={im.src}
                  alt=""
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            ))}
          </div>
        </section>
      </main>
      <CookieBanner />
    </div>
  );
}