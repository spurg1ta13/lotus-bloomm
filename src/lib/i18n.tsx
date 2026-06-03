import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "gr";

type Dict = Record<string, string>;
type Translations = Record<Lang, Dict>;

export const translations: Translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_contact: "Contact",
    hero_kicker: "Lotus Bloom Nails & More",
    hero_title_a: "Softness",
    hero_title_b: "unfolding.",
    hero_lede: "A sanctuary of refined aesthetics and mindful rituals — nails, lashes, brows and beyond.",
    hero_cta: "Book a Ritual",
    about_kicker: "The Philosophy",
    about_title: "We believe in the beauty of the slow ritual.",
    about_body: "At Lotus Bloom we don't just provide services — we curate moments of luminosity. Every treatment is an unfurling of your natural radiance, guided by expert hands and the finest products.",
    services_title: "Menu",
    services_meta: "Selection 2026",
    svc_1_t: "Signature Manicure",
    svc_1_d: "Shaping, cuticle care, and a long-wear color of your choice.",
    svc_2_t: "Gel Extensions",
    svc_2_d: "Sculpted soft-gel or builder extensions with a flawless finish.",
    svc_3_t: "Spa Pedicure",
    svc_3_d: "Botanical soak, exfoliation, and restorative hydration.",
    svc_4_t: "Lash Lift & Tint",
    svc_4_d: "Semi-permanent curl and deep tint for wide-awake eyes.",
    svc_5_t: "Brow Design",
    svc_5_d: "Custom mapping, shaping, and tint for your perfect arch.",
    svc_6_t: "Nail Art",
    svc_6_d: "Hand-painted designs, chrome, French and seasonal moods.",
    contact_title: "Let's Bloom.",
    contact_info: "Information",
    contact_address: "Paraskevopoulou 15, Thessaloniki 546 40",
    contact_hours: "Mon–Sat · 10:00 — 20:00",
    form_name: "Name",
    form_email: "Email",
    form_message: "Message",
    form_submit: "Send Inquiry",
    form_sent: "Thank you — we'll be in touch shortly.",
    cookie_text: "We use cookies to enhance your experience. By continuing, you accept our cookie policy.",
    cookie_accept: "Accept",
    cookie_decline: "Decline",
    footer_rights: "All rights reserved.",
    footer_privacy: "Privacy",
    footer_terms: "Terms",
    meta_title: "Lotus Bloom Nails & More — Beauty Salon in Athens",
    meta_desc: "Nails, lashes, brows and signature beauty rituals in Athens. Book your appointment at Lotus Bloom.",
  },
  gr: {
    nav_home: "Αρχική",
    nav_about: "Σχετικά",
    nav_services: "Υπηρεσίες",
    nav_contact: "Επικοινωνία",
    hero_kicker: "Lotus Bloom Nails & More",
    hero_title_a: "Απαλότητα",
    hero_title_b: "που ανθίζει.",
    hero_lede: "Ένας χώρος γαλήνης και υψηλής αισθητικής — νύχια, βλεφαρίδες, φρύδια και κάτι παραπάνω.",
    hero_cta: "Κλείσε ραντεβού",
    about_kicker: "Η Φιλοσοφία μας",
    about_title: "Πιστεύουμε στην ομορφιά του αργού τελετουργικού.",
    about_body: "Στο Lotus Bloom δεν προσφέρουμε απλώς υπηρεσίες — δημιουργούμε στιγμές λάμψης. Κάθε περιποίηση αναδεικνύει τη φυσική σας ομορφιά με εξειδικευμένα χέρια και κορυφαία προϊόντα.",
    services_title: "Κατάλογος",
    services_meta: "Επιλογή 2026",
    svc_1_t: "Μανικιούρ Signature",
    svc_1_d: "Σχηματισμός, περιποίηση επωνυχίων και ημιμόνιμο της επιλογής σας.",
    svc_2_t: "Επεκτάσεις Gel",
    svc_2_d: "Soft-gel ή builder επεκτάσεις με άψογο φινίρισμα.",
    svc_3_t: "Πεντικιούρ Spa",
    svc_3_d: "Βοτανικό λουτρό, απολέπιση και βαθιά ενυδάτωση.",
    svc_4_t: "Lash Lift & Βαφή",
    svc_4_d: "Ημιμόνιμη ανόρθωση και βαφή για βλέμμα γεμάτο ένταση.",
    svc_5_t: "Σχεδιασμός Φρυδιών",
    svc_5_d: "Mapping, σχηματισμός και βαφή για τέλειο τόξο.",
    svc_6_t: "Nail Art",
    svc_6_d: "Ζωγραφική στο χέρι, chrome, γαλλικό και εποχιακά σχέδια.",
    contact_title: "Ελάτε να ανθίσουμε.",
    contact_info: "Στοιχεία",
    contact_address: "Παρασκευοπούλου 15, Θεσσαλονίκη 546 40",
    contact_hours: "Δευ–Σαβ · 10:00 — 20:00",
    form_name: "Όνομα",
    form_email: "Email",
    form_message: "Μήνυμα",
    form_submit: "Αποστολή",
    form_sent: "Ευχαριστούμε — θα επικοινωνήσουμε σύντομα.",
    cookie_text: "Χρησιμοποιούμε cookies για καλύτερη εμπειρία. Συνεχίζοντας αποδέχεστε την πολιτική μας.",
    cookie_accept: "Αποδοχή",
    cookie_decline: "Άρνηση",
    footer_rights: "Με επιφύλαξη παντός δικαιώματος.",
    footer_privacy: "Απόρρητο",
    footer_terms: "Όροι",
    meta_title: "Lotus Bloom Nails & More — Ινστιτούτο Ομορφιάς στην Αθήνα",
    meta_desc: "Νύχια, βλεφαρίδες, φρύδια και signature beauty rituals στην Αθήνα. Κλείστε ραντεβού στο Lotus Bloom.",
  },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof translations.en) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "gr") setLangState(saved);
    else if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("el")) {
      setLangState("gr");
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang === "gr" ? "el" : "en";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  };

  const t = (key: keyof typeof translations.en) => translations[lang][key] ?? translations.en[key];

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be inside LanguageProvider");
  return v;
}