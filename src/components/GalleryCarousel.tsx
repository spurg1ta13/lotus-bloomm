import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useI18n } from "@/lib/i18n";
import img1 from "@/assets/gallery/1.jpg.asset.json";
import img3 from "@/assets/gallery/3.jpg.asset.json";
import img5 from "@/assets/gallery/5.jpg.asset.json";
import img6 from "@/assets/gallery/6.jpg.asset.json";
import img7 from "@/assets/gallery/7.jpg.asset.json";
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
import imgNew1 from "@/assets/gallery/new-1.jpg.asset.json";
import imgNew2 from "@/assets/gallery/new-2.jpg.asset.json";
import imgNew3 from "@/assets/gallery/new-3.jpg.asset.json";
import imgNew4 from "@/assets/gallery/new-4.jpg.asset.json";
import imgNew5 from "@/assets/gallery/new-5.jpg.asset.json";
import imgNew6 from "@/assets/gallery/new-6.jpg.asset.json";
import imgNew7 from "@/assets/gallery/new-7.jpg.asset.json";
import imgNew8 from "@/assets/gallery/new-8.jpg.asset.json";
import imgNew9 from "@/assets/gallery/new-9.jpg.asset.json";
import imgNew10 from "@/assets/gallery/new-10.jpg.asset.json";
import imgNew32 from "@/assets/gallery/new-32.jpg.asset.json";
import imgNew33 from "@/assets/gallery/new-33.jpg.asset.json";
import imgNew34 from "@/assets/gallery/new-34.jpg.asset.json";
import imgNew35 from "@/assets/gallery/new-35.jpg.asset.json";
// Mobile-optimized WebP variants (≈900px wide) served via srcset on small viewports.
import mImg1 from "@/assets/gallery/gallery-1.webp.asset.json";
import mImg3 from "@/assets/gallery/gallery-3.webp.asset.json";
import mImg5 from "@/assets/gallery/gallery-5.webp.asset.json";
import mImg6 from "@/assets/gallery/gallery-6.webp.asset.json";
import mImg7 from "@/assets/gallery/gallery-7.webp.asset.json";
import mImg9 from "@/assets/gallery/gallery-9.webp.asset.json";
import mImg10 from "@/assets/gallery/gallery-10.webp.asset.json";
import mImg11 from "@/assets/gallery/gallery-11.webp.asset.json";
import mImg12 from "@/assets/gallery/gallery-12.webp.asset.json";
import mImg13 from "@/assets/gallery/gallery-13.webp.asset.json";
import mImg14 from "@/assets/gallery/gallery-14.webp.asset.json";
import mImg15 from "@/assets/gallery/gallery-15.webp.asset.json";
import mImg16 from "@/assets/gallery/gallery-16.webp.asset.json";
import mImg17 from "@/assets/gallery/gallery-17.webp.asset.json";
import mImg19 from "@/assets/gallery/gallery-19.webp.asset.json";
import mImg20 from "@/assets/gallery/gallery-20.webp.asset.json";
import mImg21 from "@/assets/gallery/gallery-21.webp.asset.json";
import mImg22 from "@/assets/gallery/gallery-22.webp.asset.json";
import mImgNew1 from "@/assets/gallery/gallery-new-1.webp.asset.json";
import mImgNew2 from "@/assets/gallery/gallery-new-2.webp.asset.json";
import mImgNew3 from "@/assets/gallery/gallery-new-3.webp.asset.json";
import mImgNew4 from "@/assets/gallery/gallery-new-4.webp.asset.json";
import mImgNew5 from "@/assets/gallery/gallery-new-5.webp.asset.json";
import mImgNew6 from "@/assets/gallery/gallery-new-6.webp.asset.json";
import mImgNew7 from "@/assets/gallery/gallery-new-7.webp.asset.json";
import mImgNew8 from "@/assets/gallery/gallery-new-8.webp.asset.json";
import mImgNew9 from "@/assets/gallery/gallery-new-9.webp.asset.json";
import mImgNew10 from "@/assets/gallery/gallery-new-10.webp.asset.json";
import mImgNew32 from "@/assets/gallery/gallery-new-32.webp.asset.json";
import mImgNew33 from "@/assets/gallery/gallery-new-33.webp.asset.json";
import mImgNew34 from "@/assets/gallery/gallery-new-34.webp.asset.json";
import mImgNew35 from "@/assets/gallery/gallery-new-35.webp.asset.json";

export const galleryImages = [
  { src: imgNew32.url, mSrc: mImgNew32.url, alt: "Pastel ombré almond gel manicure with hand-painted gold starburst nail art and multicolored rhinestone gems" },
  { src: imgNew33.url, mSrc: mImgNew33.url, alt: "Glossy hot pink fuchsia almond gel manicure with shimmer accent nail" },
  { src: imgNew34.url, mSrc: mImgNew34.url, alt: "Nude short square manicure with black French tips and hand-painted red cherry accent nail" },
  { src: imgNew35.url, mSrc: mImgNew35.url, alt: "Classic pink and white French manicure on almond-shaped natural nails" },
  { src: imgNew9.url, mSrc: mImgNew9.url, alt: "Nude almond manicure with pink leopard French tips and hand-painted pink floral accent nails" },
  { src: imgNew10.url, mSrc: mImgNew10.url, alt: "Glossy pastel yellow ombré French tip square gel manicure" },
  { src: img1.url, mSrc: mImg1.url, alt: "Black gel manicure with white animal-print accent nails" },
  { src: img3.url, mSrc: mImg3.url, alt: "Dark stiletto nail art with sculpted 3D elements" },
  { src: img5.url, mSrc: mImg5.url, alt: "Glossy magenta fuchsia almond gel manicure" },
  { src: img6.url, mSrc: mImg6.url, alt: "Pink and white French manicure with hand-painted cherry nail art" },
  { src: img7.url, mSrc: mImg7.url, alt: "Red gel manicure with checkered, 8-ball and stitches nail art accents" },
  { src: img9.url, mSrc: mImg9.url, alt: "Pink and white French manicure with painted stone-pattern tips on long square nails" },
  { src: img10.url, mSrc: mImg10.url, alt: "Blue shimmer ombré almond gel manicure" },
  { src: img11.url, mSrc: mImg11.url, alt: "Glazed donut pearl chrome manicure on round natural nails" },
  { src: img12.url, mSrc: mImg12.url, alt: "Classic white-tip French manicure on short square nails" },
  { src: img13.url, mSrc: mImg13.url, alt: "Nude almond nails with minimalist hand-painted pink wildflower nail art" },
  { src: img14.url, mSrc: mImg14.url, alt: "Glossy bright red almond manicure with solid color finish" },
  { src: img15.url, mSrc: mImg15.url, alt: "Abstract red French swirl nail art on almond nails" },
  { src: img16.url, mSrc: mImg16.url, alt: "Soft pink almond manicure with daisy flower nail art and gold centers" },
  { src: img17.url, mSrc: mImg17.url, alt: "Pastel lilac almond manicure with white polka dot nail art" },
  { src: img19.url, mSrc: mImg19.url, alt: "Milky white ombré manicure on short square nails" },
  { src: img20.url, mSrc: mImg20.url, alt: "Fuchsia square manicure with leopard accent nail art" },
  { src: img21.url, mSrc: mImg21.url, alt: "Classic pink and white French manicure on square nails" },
  { src: img22.url, mSrc: mImg22.url, alt: "Black and white dotted French tip almond manicure" },
  { src: imgNew1.url, mSrc: mImgNew1.url, alt: "Burgundy swirl French tip almond manicure with abstract nail art" },
  { src: imgNew2.url, mSrc: mImgNew2.url, alt: "Glossy classic red almond gel manicure" },
  { src: imgNew3.url, mSrc: mImgNew3.url, alt: "Red and white polka dot nail art on short almond nails" },
  { src: imgNew4.url, mSrc: mImgNew4.url, alt: "Brown 3D blooming gel snake skin nail art on almond nails" },
  { src: imgNew5.url, mSrc: mImgNew5.url, alt: "Milky white ombré square manicure with leopard print accent nail" },
  { src: imgNew6.url, mSrc: mImgNew6.url, alt: "Nude almond manicure with multicolored rhinestone crystal nail art" },
  { src: imgNew7.url, mSrc: mImgNew7.url, alt: "Glossy milky white almond gel manicure" },
  { src: imgNew8.url, mSrc: mImgNew8.url, alt: "Deep red almond manicure with white polka dot nail art" },
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length)),
    [],
  );
  const nextLightbox = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i + 1) % galleryImages.length)),
    [],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") prevLightbox();
      else if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, closeLightbox, prevLightbox, nextLightbox]);

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
                <picture>
                  <source media="(max-width: 767px)" srcSet={im.mSrc} type="image/webp" />
                  <img
                    src={im.src}
                    alt={im.alt}
                    width={1600}
                    height={1200}
                    loading={eagerFirst && i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={eagerFirst && i === 0 ? "high" : "auto"}
                    onClick={() => setLightboxIndex(i)}
                    className="w-full h-auto aspect-[4/5] md:aspect-[4/3] object-cover cursor-zoom-in"
                  />
                </picture>
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

      <div className="mt-8 flex items-center justify-center gap-1">
        {galleryImages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
            onClick={() => api?.scrollTo(i)}
            className="inline-flex items-center justify-center h-11 w-11 md:w-6 group"
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${
                i === current ? "w-6 bg-foreground" : "w-2 bg-border group-hover:bg-foreground/40"
              }`}
            />
          </button>
        ))}
      </div>

      {showThumbnails && (
        <div className="mt-12 grid grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((im, i) => (
            <button
              key={im.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              aria-label={`Show ${im.alt}`}
              className={`group overflow-hidden rounded-sm border transition-all ${
                i === current ? "border-accent" : "border-border hover:border-foreground/40"
              }`}
            >
              <picture>
                <source media="(max-width: 767px)" srcSet={im.mSrc} type="image/webp" />
                <img
                  src={im.src}
                  alt=""
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                />
              </picture>
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

      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex items-center justify-center h-11 w-11 rounded-full bg-background/80 border border-border text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-11 w-11 rounded-full bg-background/80 border border-border text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-11 w-11 rounded-full bg-background/80 border border-border text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[92vw] object-contain rounded-sm shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}