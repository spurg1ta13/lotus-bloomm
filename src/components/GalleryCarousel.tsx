import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import img4 from "@/assets/gallery/4.jpg.asset.json";
import img5 from "@/assets/gallery/5.jpg.asset.json";
import img6 from "@/assets/gallery/6.jpg.asset.json";
import img7 from "@/assets/gallery/7.jpg.asset.json";
import img8 from "@/assets/gallery/8.jpg.asset.json";
import img9 from "@/assets/gallery/9.jpg.asset.json";
import img10 from "@/assets/gallery/10.jpg.asset.json";
import img11 from "@/assets/gallery/11.jpg.asset.json";
import img12 from "@/assets/gallery/12.jpg.asset.json";
import img13 from "@/assets/gallery/13.jpg.asset.json";
import img14 from "@/assets/gallery/14.jpg.asset.json";
import img15 from "@/assets/gallery/15.jpg.asset.json";
import img16 from "@/assets/gallery/16.jpg.asset.json";
import img17 from "@/assets/gallery/17.jpg.asset.json";
import img19 from "@/assets/gallery/19.jpg.asset.json";
import img20 from "@/assets/gallery/20.jpg.asset.json";
import img21 from "@/assets/gallery/21.jpg.asset.json";
import img22 from "@/assets/gallery/22.jpg.asset.json";
import img23 from "@/assets/gallery/23.jpg.asset.json";

export const galleryImages = [
  { src: img1.url, alt: "Black gel manicure with white animal-print accent nails" },
  { src: img2.url, alt: "Soft pink signature manicure on square nails" },
  { src: img3.url, alt: "Dark stiletto nail art with sculpted 3D elements" },
  { src: img4.url, alt: "Pink baby boomer French manicure with hot pink double-line tips on square nails" },
  { src: img5.url, alt: "Glossy magenta fuchsia almond gel manicure" },
  { src: img6.url, alt: "Pink and white French manicure with hand-painted cherry nail art" },
  { src: img7.url, alt: "Red gel manicure with checkered, 8-ball and stitches nail art accents" },
  { src: img8.url, alt: "Pink ombré almond nails with 3D sculpted flower and gold bead accents" },
  { src: img9.url, alt: "Pink and white French manicure with painted stone-pattern tips on long square nails" },
  { src: img10.url, alt: "Blue shimmer ombré almond gel manicure" },
  { src: img11.url, alt: "Glazed donut pearl chrome manicure on round natural nails" },
  { src: img12.url, alt: "Classic white-tip French manicure on short square nails" },
  { src: img13.url, alt: "Nude almond nails with minimalist hand-painted pink wildflower nail art" },
  { src: img14.url, alt: "Glossy bright red almond manicure with solid color finish" },
  { src: img15.url, alt: "Abstract red French swirl nail art on almond nails" },
  { src: img16.url, alt: "Soft pink almond manicure with daisy flower nail art and gold centers" },
  { src: img17.url, alt: "Pastel lilac almond manicure with white polka dot nail art" },
  { src: img19.url, alt: "Milky white ombré manicure on short square nails" },
  { src: img20.url, alt: "Fuchsia square manicure with leopard accent nail art" },
  { src: img21.url, alt: "Classic pink and white French manicure on square nails" },
  { src: img22.url, alt: "Black and white dotted French tip almond manicure" },
  { src: img23.url, alt: "Chocolate brown and nude manicure with bold daisy flower nail art" },
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
        <div className="relative">
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
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => api?.scrollPrev()}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-11 w-11 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-foreground hover:text-background transition-all shadow-sm"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => api?.scrollNext()}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-11 w-11 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-foreground hover:text-background transition-all shadow-sm"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
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