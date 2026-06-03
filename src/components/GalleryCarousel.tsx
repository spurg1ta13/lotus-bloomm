import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useI18n } from "@/lib/i18n";
import img1 from "@/assets/gallery/1.jpg.asset.json";
import img2 from "@/assets/gallery/2.jpg.asset.json";
import img3 from "@/assets/gallery/3.jpg.asset.json";

export const galleryImages = [
  { src: img1.url, alt: "Black gel manicure with white animal-print accent nails" },
  { src: img2.url, alt: "Soft pink signature manicure on square nails" },
  { src: img3.url, alt: "Dark stiletto nail art with sculpted 3D elements" },
];

interface GalleryCarouselProps {
  showThumbnails?: boolean;
  eagerFirst?: boolean;
  ctaHref?: string;
}

export function GalleryCarousel({
  showThumbnails = true,
  eagerFirst = false,
  ctaHref,
}: GalleryCarouselProps) {
  const { t } = useI18n();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  return (
    <div>
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
          {galleryImages.map((im, i) => (
            <CarouselItem key={im.src}>
              <figure className="overflow-hidden rounded-sm border border-border bg-foreground/5">
                <img
                  src={im.src}
                  alt={im.alt}
                  width={1600}
                  height={1200}
                  loading={eagerFirst && i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={eagerFirst && i === 0 ? "high" : "auto"}
                  className="w-full h-auto aspect-[4/5] md:aspect-[4/3] object-cover"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex items-center justify-center gap-3">
        {galleryImages.map((_, i) => (
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

      {showThumbnails && (
        <div className="mt-12 grid grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((im, i) => (
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
      )}

      {ctaHref && (
        <div className="mt-12 text-center">
          <Link
            to={ctaHref}
            className="inline-block px-10 py-4 border border-foreground text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-all"
          >
            {t("gallery_cta")}
          </Link>
        </div>
      )}
    </div>
  );
}