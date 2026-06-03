import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "gr";

type Dict = Record<string, string>;
type Translations = Record<Lang, Dict>;

export const translations: Translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_gallery: "Gallery",
    nav_contact: "Contact",
    hero_kicker: "Lotus Bloom Nails & More — Thessaloniki",
    hero_title_a: "Softness",
    hero_title_b: "unfolding.",
    hero_lede: "A Thessaloniki sanctuary for refined nail care, lash and brow rituals — crafted by expert hands with premium products.",
    hero_cta: "Book Your Appointment",
    about_kicker: "Our Philosophy",
    about_title: "We believe in the beauty of the slow ritual.",
    about_body: "At Lotus Bloom Nails & More in Thessaloniki we don't just provide beauty services — we curate moments of luminosity. Every manicure, pedicure, lash and brow treatment is designed to reveal your natural radiance, guided by certified specialists and premium professional products.",
    services_title: "Services",
    services_meta: "Price List 2026",
    svc_1_t: "Signature Manicure",
    svc_1_d: "Nail shaping, cuticle care and long-wear gel polish in your chosen colour.",
    svc_2_t: "Gel Nail Extensions",
    svc_2_d: "Hand-sculpted soft-gel or builder gel extensions with a flawless, durable finish.",
    svc_3_t: "Spa Pedicure",
    svc_3_d: "Botanical foot soak, exfoliation and restorative hydration treatment.",
    svc_4_t: "Lash Lift & Tint",
    svc_4_d: "Semi-permanent eyelash lift and deep tint for naturally wide-awake eyes.",
    svc_5_t: "Brow Design & Tint",
    svc_5_d: "Custom brow mapping, shaping and professional tinting for your perfect arch.",
    svc_6_t: "Nail Art",
    svc_6_d: "Hand-painted nail designs, chrome finishes, French manicure and seasonal styles.",
    contact_title: "Let's Bloom.",
    contact_info: "Contact Details",
    contact_address: "Paraskevopoulou 15, Thessaloniki 546 40",
    contact_hours: "Mon–Sat · 10:00 — 20:00",
    form_name: "Full Name",
    form_email: "Email Address",
    form_message: "Your Message",
    form_submit: "Send Inquiry",
    form_sent: "Thank you — we'll be in touch shortly.",
    cookie_text: "We use cookies to enhance your browsing experience. By continuing, you accept our cookie policy.",
    cookie_accept: "Accept",
    cookie_decline: "Decline",
    footer_brand: "Lotus Bloom Beauty",
    footer_rights: "All rights reserved.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_powered: "Powered by",
    meta_title: "Lotus Bloom Nails & More — Beauty Salon in Thessaloniki",
    meta_desc: "Premium nail care, lash lifts and brow design in Thessaloniki. Book your appointment at Lotus Bloom Nails & More.",
    gallery_title: "Gallery — Nail Art by Lotus Bloom",
    gallery_desc: "Browse our latest nail art creations: signature manicures, gel extensions and hand-painted designs from Lotus Bloom in Thessaloniki.",
    gallery_kicker: "Our Work",
    gallery_heading: "A glimpse into our craft.",
    gallery_lede: "Hand-picked moments from our studio — each set sculpted, painted and polished with care.",
  },
  gr: {
    nav_home: "Αρχική",
    nav_about: "Σχετικά",
    nav_services: "Υπηρεσίες",
    nav_gallery: "Γκαλερί",
    nav_contact: "Επικοινωνία",
    hero_kicker: "Lotus Bloom Nails & More — Θεσσαλονίκη",
    hero_title_a: "Απαλότητα",
    hero_title_b: "που ανθίζει.",
    hero_lede: "Ένας χώρος υψηλής αισθητικής στη Θεσσαλονίκη για περιποίηση νυχιών, βλεφαρίδων και φρυδιών — από εξειδικευμένα χέρια με κορυφαία επαγγελματικά προϊόντα.",
    hero_cta: "Κλείστε Ραντεβού",
    about_kicker: "Η Φιλοσοφία μας",
    about_title: "Πιστεύουμε στην ομορφιά του αργού τελετουργικού.",
    about_body: "Στο Lotus Bloom Nails & More στη Θεσσαλονίκη δεν προσφέρουμε απλώς υπηρεσίες ομορφιάς — δημιουργούμε στιγμές λάμψης. Κάθε μανικιούρ, πεντικιούρ, περιποίηση βλεφαρίδων και φρυδιών αναδεικνύει τη φυσική σας ομορφιά, με πιστοποιημένες ειδικούς και premium επαγγελματικά προϊόντα.",
    services_title: "Υπηρεσίες",
    services_meta: "Τιμοκατάλογος 2026",
    svc_1_t: "Signature Μανικιούρ",
    svc_1_d: "Σχηματισμός νυχιών, περιποίηση επωνυχίων και ημιμόνιμο βερνίκι στο χρώμα της επιλογής σας.",
    svc_2_t: "Επεκτάσεις Νυχιών Gel",
    svc_2_d: "Χειροποίητες επεκτάσεις soft-gel ή builder gel με άψογο και ανθεκτικό φινίρισμα.",
    svc_3_t: "Spa Πεντικιούρ",
    svc_3_d: "Βοτανικό λουτρό, απολέπιση και θεραπεία βαθιάς ενυδάτωσης για τα πόδια.",
    svc_4_t: "Lash Lift & Βαφή Βλεφαρίδων",
    svc_4_d: "Ημιμόνιμη ανόρθωση και επαγγελματική βαφή βλεφαρίδων για ξεκούραστο, ζωντανό βλέμμα.",
    svc_5_t: "Σχεδιασμός & Βαφή Φρυδιών",
    svc_5_d: "Εξατομικευμένο mapping, σχηματισμός και επαγγελματική βαφή για το τέλειο τόξο φρυδιών.",
    svc_6_t: "Nail Art",
    svc_6_d: "Ζωγραφική στο χέρι, chrome φινίρισμα, γαλλικό μανικιούρ και εποχιακά σχέδια.",
    contact_title: "Ελάτε να ανθίσουμε.",
    contact_info: "Στοιχεία Επικοινωνίας",
    contact_address: "Παρασκευοπούλου 15, Θεσσαλονίκη 546 40",
    contact_hours: "Δευ–Σαβ · 10:00 — 20:00",
    form_name: "Ονοματεπώνυμο",
    form_email: "Διεύθυνση Email",
    form_message: "Το Μήνυμά σας",
    form_submit: "Αποστολή Αιτήματος",
    form_sent: "Ευχαριστούμε — θα επικοινωνήσουμε σύντομα μαζί σας.",
    cookie_text: "Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία περιήγησής σας. Συνεχίζοντας αποδέχεστε την πολιτική cookies.",
    cookie_accept: "Αποδοχή",
    cookie_decline: "Άρνηση",
    footer_brand: "Lotus Bloom Beauty",
    footer_rights: "Με επιφύλαξη παντός δικαιώματος.",
    footer_privacy: "Πολιτική Απορρήτου",
    footer_terms: "Όροι Χρήσης",
    footer_powered: "Powered by",
    meta_title: "Lotus Bloom Nails & More — Ινστιτούτο Ομορφιάς στη Θεσσαλονίκη",
    meta_desc: "Premium περιποίηση νυχιών, lash lift και σχεδιασμός φρυδιών στη Θεσσαλονίκη. Κλείστε ραντεβού στο Lotus Bloom Nails & More.",
    gallery_title: "Γκαλερί — Nail Art από το Lotus Bloom",
    gallery_desc: "Δείτε τις πιο πρόσφατες δημιουργίες nail art: signature μανικιούρ, επεκτάσεις gel και ζωγραφισμένα σχέδια στο Lotus Bloom Θεσσαλονίκης.",
    gallery_kicker: "Η Δουλειά μας",
    gallery_heading: "Μια ματιά στην τέχνη μας.",
    gallery_lede: "Επιλεγμένες στιγμές από το studio μας — κάθε set σχεδιασμένο, ζωγραφισμένο και γυαλισμένο με αγάπη.",
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