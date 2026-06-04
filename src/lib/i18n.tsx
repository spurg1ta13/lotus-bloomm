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
    hero_lede: "A clean, modern boho studio where simplicity meets natural harmony.",
    hero_cta: "Book Your Appointment",
    about_kicker: "Our Philosophy",
    about_title: "We believe in the beauty of the slow ritual.",
    about_body: "At Lotus Bloom Nails & More in Thessaloniki we don't just provide beauty services — we curate moments of luminosity. Every manicure, pedicure, lash and brow treatment is designed to reveal your natural radiance, guided by certified specialists and premium professional products.",
    services_title: "Services",
    services_meta: "Price List 2026",
    svc_cat_hands: "Hands",
    svc_cat_feet: "Feet",
    svc_cat_extras: "Add-Ons",
    svc_from: "from",
    svc_h1: "Express manicure",
    svc_h2: "Classic manicure",
    svc_h3: "Gel polish manicure",
    svc_h4: "Structured gel polish manicure",
    svc_h5: "Natural nail overlay (gel)",
    svc_h6: "Nail extensions gel / acrygel",
    svc_h7: "Gel / acrygel infill",
    svc_h8: "Express gel polish manicure",
    svc_f1: "Express pedicure",
    svc_f2: "Express gel polish pedicure",
    svc_f3: "Gel polish pedicure",
    svc_f4: "Classic pedicure",
    svc_f5: "Medical pedicure",
    svc_f6: "Jelly spa",
    svc_f7: "Foot mask",
    svc_e1: "Nail repair",
    svc_e2: "Gel / acrygel removal",
    svc_e3: "Gel polish removal",
    svc_e4: "Ombre / French tip",
    svc_e5: "Nail art / glitter",
    contact_title: "Let's Bloom.",
    contact_info: "Contact Details",
    contact_address: "Paraskevopoulou 15, Thessaloniki 546 40",
    contact_hours: "Mon–Sat · 10:00 — 20:00",
    form_name: "Name",
    form_email: "Email Address",
    form_message: "Your Message",
    form_submit: "Send Inquiry",
    form_sent: "Thank you — we'll be in touch shortly.",
    form_err_name: "Please enter your name.",
    form_err_email: "Please enter a valid email address.",
    form_err_message: "Please write a short message.",
    form_err_consent: "Please accept the Terms of Service to continue.",
    form_consent_a: "I agree to the",
    form_consent_b: "Terms of Service",
    form_err_bot: "Verification failed. Please try again.",
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
    gallery_cta: "View Full Gallery",
    home_gallery_kicker: "Gallery",
    home_gallery_title: "Recent work, freshly polished.",
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
    hero_lede: "Ένα καθαρό, μοντέρνο boho studio όπου η απλότητα συναντά τη φυσική αρμονία.",
    hero_cta: "Κλείστε Ραντεβού",
    about_kicker: "Η Φιλοσοφία μας",
    about_title: "Πιστεύουμε στην ομορφιά του αργού τελετουργικού.",
    about_body: "Στο Lotus Bloom Nails & More στη Θεσσαλονίκη δεν προσφέρουμε απλώς υπηρεσίες ομορφιάς — δημιουργούμε στιγμές λάμψης. Κάθε μανικιούρ, πεντικιούρ, περιποίηση βλεφαρίδων και φρυδιών αναδεικνύει τη φυσική σας ομορφιά, με πιστοποιημένες ειδικούς και premium επαγγελματικά προϊόντα.",
    services_title: "Υπηρεσίες",
    services_meta: "Τιμοκατάλογος 2026",
    svc_cat_hands: "Χέρια",
    svc_cat_feet: "Πόδια",
    svc_cat_extras: "Επιπλέον",
    svc_from: "από",
    svc_h1: "Εξπρές μανικιούρ",
    svc_h2: "Απλό μανικιούρ",
    svc_h3: "Ημιμόνιμο μανικιούρ",
    svc_h4: "Ενισχυμένο ημιμόνιμο",
    svc_h5: "Ενίσχυση φυσικού νυχιού gel",
    svc_h6: "Επεκτάσεις νυχιών gel / acrygel",
    svc_h7: "Συντήρηση gel / acrygel",
    svc_h8: "Εξπρές ημιμόνιμο",
    svc_f1: "Εξπρές πεντικιούρ",
    svc_f2: "Εξπρές ημιμόνιμο πεντικιούρ",
    svc_f3: "Ημιμόνιμο πεντικιούρ",
    svc_f4: "Απλό πεντικιούρ",
    svc_f5: "Θεραπευτικό πεντικιούρ",
    svc_f6: "Jelly spa",
    svc_f7: "Μάσκα ενυδάτωσης ποδιών",
    svc_e1: "Χτίσιμο νυχιού",
    svc_e2: "Αφαίρεση gel / acrygel",
    svc_e3: "Αφαίρεση ημιμόνιμου",
    svc_e4: "Όμπρε / γαλλικό",
    svc_e5: "Σχέδιο / στρας",
    contact_title: "Ελάτε να ανθίσουμε.",
    contact_info: "Στοιχεία Επικοινωνίας",
    contact_address: "Παρασκευοπούλου 15, Θεσσαλονίκη 546 40",
    contact_hours: "Δευ–Σαβ · 10:00 — 20:00",
    form_name: "Όνομα",
    form_email: "Διεύθυνση Email",
    form_message: "Το Μήνυμά σας",
    form_submit: "Αποστολή Αιτήματος",
    form_sent: "Ευχαριστούμε — θα επικοινωνήσουμε σύντομα μαζί σας.",
    form_err_name: "Παρακαλώ συμπληρώστε το όνομά σας.",
    form_err_email: "Παρακαλώ εισάγετε έγκυρη διεύθυνση email.",
    form_err_message: "Παρακαλώ γράψτε ένα σύντομο μήνυμα.",
    form_err_consent: "Παρακαλώ αποδεχτείτε τους Όρους Χρήσης για να συνεχίσετε.",
    form_consent_a: "Αποδέχομαι τους",
    form_consent_b: "Όρους Χρήσης",
    form_err_bot: "Η επαλήθευση απέτυχε. Δοκιμάστε ξανά.",
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
    gallery_cta: "Δείτε όλη τη γκαλερί",
    home_gallery_kicker: "Γκαλερί",
    home_gallery_title: "Πρόσφατες δημιουργίες, φρεσκογυαλισμένες.",
  },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof translations.en) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("gr");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "gr") setLangState(saved);
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