import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Lotus Bloom" },
      { name: "description", content: "How Lotus Bloom collects, uses, and protects your data." },
      { property: "og:title", content: "Privacy Policy — Lotus Bloom" },
      { property: "og:description", content: "How Lotus Bloom collects, uses, and protects your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-24 flex-1 w-full">
      <Link to="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">← Back</Link>
      <h1 className="font-display text-5xl mt-8 mb-10">Privacy Policy</h1>
      <div className="prose prose-neutral max-w-none space-y-6 text-muted-foreground leading-relaxed">
        <p>Lotus Bloom Nails & More ("we", "us") respects your privacy and complies with the EU General Data Protection Regulation (GDPR).</p>
        <h2 className="font-display text-2xl text-foreground">Data we collect</h2>
        <p>When you contact us via our form, email, or phone, we collect your name, email, phone number and any message content for the purpose of responding to your inquiry and managing appointments.</p>
        <h2 className="font-display text-2xl text-foreground">Cookies</h2>
        <p>We use a minimal set of cookies to remember your language preference and your cookie consent choice. We do not run third-party tracking without your consent.</p>
        <h2 className="font-display text-2xl text-foreground">Your rights</h2>
        <p>You may request access, rectification, or deletion of your personal data at any time by writing to lotusbloomnails@gmail.com.</p>
        <h2 className="font-display text-2xl text-foreground">Contact</h2>
        <p>Lotus Bloom Nails & More — Thessaloniki, Greece — lotusbloomnails@gmail.com</p>
      </div>
      </main>
      <Footer />
    </div>
  );
}