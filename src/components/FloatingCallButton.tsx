import { Phone } from "lucide-react";

export function FloatingCallButton() {
  return (
    <a
      href="tel:+302313052391"
      aria-label="Call +30 2313 052391"
      className="md:hidden fixed bottom-5 right-5 z-40 inline-flex items-center justify-center h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg ring-1 ring-border/40 active:scale-95 transition-transform"
    >
      <Phone className="h-6 w-6" strokeWidth={1.5} />
    </a>
  );
}