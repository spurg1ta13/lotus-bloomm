import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Lotus Bloom" },
      { name: "description", content: "Terms governing the use of Lotus Bloom services and website." },
      { property: "og:title", content: "Terms of Service — Lotus Bloom" },
      { property: "og:description", content: "Terms governing the use of Lotus Bloom services and website." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-6 pb-24 md:py-24 flex-1 w-full">
      <Link to="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">← Back</Link>
      <h1 className="font-display text-5xl mt-8 mb-10">Terms of Service</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>By booking an appointment with Lotus Bloom Nails & More you agree to the following terms.</p>
        <h2 className="font-display text-2xl text-foreground">Appointments & cancellations</h2>
        <p>Please notify us at least 24 hours in advance to cancel or reschedule.</p>
        <h2 className="font-display text-2xl text-foreground">Payment</h2>
        <p>Payment is due at the time of service. We accept cash and major debit/credit cards.</p>
        <h2 className="font-display text-2xl text-foreground">Liability</h2>
        <p>Please inform us of any allergies or skin conditions before treatment. We are not liable for reactions arising from undisclosed conditions.</p>
        <h2 className="font-display text-2xl text-foreground">Contact</h2>
        <p>
          For questions about these terms, contact{" "}
          <a href="mailto:lotusbloomnails@gmail.com" className="text-foreground hover:text-accent transition-colors">lotusbloomnails@gmail.com</a>
          {" "}or call{" "}
          <a href="tel:+302313052391" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">+30 231 305 2391</a>.
        </p>
      </div>
      </main>
      <Footer />
    </div>
  );
}