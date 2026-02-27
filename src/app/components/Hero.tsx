import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import imgImageLuuzonLogo from "figma:asset/e63cb367c32f14aac3dc78f143344c930f915ff1.png";
import { useLanguage } from "../contexts/LanguageContext";

// ─── Helpers ────────────────────────────────────────────────────────────────
//
// FIX 1 — Use window.scrollTo instead of scrollIntoView.
// scrollIntoView() scrolls the nearest scrollable ancestor, which is the
// Hero's overflow-hidden div — NOT the page. window.scrollTo always scrolls
// the actual page viewport.

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 100; // 36px banner + 64px mobile nav (80px desktop)
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

// ─── Small pieces ────────────────────────────────────────────────────────────

function PrivateBetaPill() {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="absolute bg-white border-slate-200 border border-solid h-[28px] left-[50%] -translate-x-1/2 rounded-full top-[140px] sm:top-[160px] px-4 flex items-center justify-center gap-2 z-20 shadow-sm"
    >
      <div className="bg-emerald-500 rounded-full size-[6px] animate-pulse" />
      <p className="text-[var(--muted-foreground)] text-[10px] sm:text-[11px] tracking-[0.6px] uppercase font-semibold">
        {t("hero.badge")}
      </p>
    </motion.div>
  );
}

function MainHeading() {
  const { t } = useLanguage();
  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-[60%] w-full px-4 flex flex-col items-center justify-center z-10 pointer-events-none">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-[48px] sm:text-[80px] md:text-[100px] lg:text-[140px] leading-[0.85] text-center tracking-tight text-[var(--foreground)] drop-shadow-sm px-4">
          {t("hero.title1")}
        </h1>
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="italic text-[48px] sm:text-[80px] md:text-[100px] lg:text-[140px] leading-[0.85] text-center block text-[var(--brand-coral)]"
          style={{ fontFamily: "Instrument Serif, serif" }}
        >
          {t("hero.title2")}
        </motion.span>
      </motion.div>
    </div>
  );
}

function SubHeading() {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="absolute left-[50%] -translate-x-1/2 top-[62%] w-full max-w-[90%] sm:max-w-[580px] px-4 z-20"
    >
      <p className="leading-[1.6] text-[var(--muted-foreground)] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-center w-full whitespace-normal backdrop-blur-[2px]">
        {t("hero.subtitle")}
      </p>
    </motion.div>
  );
}

function CTAButton() {
  const { t } = useLanguage();
  return (
    <motion.a
      href="https://www.cal.eu/luuzon/30min"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay: 1 }}
      className="absolute bg-[var(--primary)] h-[48px] sm:h-[56px] left-[50%] -translate-x-1/2 rounded-md shadow-lg top-[78%] w-[220px] sm:w-[260px] flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-all duration-300 z-30 group border border-transparent hover:border-slate-600"
    >
      <p className="text-[var(--brand-white)] text-[14px] sm:text-[16px] tracking-[0.5px] uppercase font-bold group-hover:tracking-[1px] transition-all">
        {t("hero.cta")}
      </p>
    </motion.a>
  );
}

function HeroHeader() {
  const { t } = useLanguage();
  return (
    <div className="absolute h-[36px] left-0 top-0 w-full flex items-center justify-center gap-2 md:gap-4 px-2 z-20 border-b border-slate-800 bg-[#000000]">
      <div className="flex w-4 h-3 overflow-hidden rounded-[1px] shadow-sm opacity-90">
        <div className="w-1/3 h-full bg-[#2A66B7]" />
        <div className="w-1/3 h-full bg-white" />
        <div className="w-1/3 h-full bg-[#DB3A49]" />
      </div>
      <p className="font-sans text-slate-300 text-[10px] md:text-[12px] font-medium truncate">
        {t("hero.topBanner")}
      </p>
      <a
        href="https://www.cal.eu/luuzon/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:block bg-slate-800 border border-slate-700 px-3 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white hover:bg-slate-700 transition-colors"
      >
        {t("hero.topBannerButton")}
      </a>
    </div>
  );
}

// ─── TopBar ──────────────────────────────────────────────────────────────────

function TopBar() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleScrollLink = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToSection(id), 200);
  };

  return (
    <>
      {/* ── Navbar container ── */}
      <div
        className="absolute left-0 w-full z-40 bg-white border-b border-slate-200 shadow-sm"
        style={{ top: "36px" }}
      >

        {/* ══════════ MOBILE BAR ══════════ */}
        {/*
          FIX 2 — Correct mobile layout: hamburger LEFT, logo CENTER, spacer RIGHT.
          We use a 3-column grid so the logo is always perfectly centered
          regardless of the hamburger width.
        */}
        <div className="grid grid-cols-3 md:hidden items-center h-[64px] px-4">

          {/* Col 1 — Hamburger (left) */}
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="w-[40px] h-[40px] flex items-center justify-center text-slate-800"
              aria-label="Menu"
            >
              {open ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>

          {/* Col 2 — Logo (center) */}
          <div className="flex items-center justify-center">
            <Link to={`/${language}`}>
              <img
                alt="Luuzon"
                src={imgImageLuuzonLogo}
                className="h-[24px] object-contain"
              />
            </Link>
          </div>

          {/* Col 3 — Empty spacer (right) balances hamburger */}
          <div />
        </div>

        {/* ══════════ DESKTOP BAR ══════════ */}
        <div className="hidden md:grid grid-cols-3 items-center h-[80px] px-12">

          {/* Col 1 — Left links */}
          <div className="flex items-center gap-8">
            <Link
              to={`/${language}/manifesto`}
              className="text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors"
            >
              {t("nav.manifesto")}
            </Link>
            <button
              type="button"
              onClick={() => scrollToSection("fraud-detection")}
              className="text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              {t("nav.product")}
            </button>
          </div>

          {/* Col 2 — Logo (center) */}
          <div className="flex items-center justify-center">
            <Link to={`/${language}`}>
              <img
                alt="Luuzon"
                src={imgImageLuuzonLogo}
                className="h-[32px] object-contain hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Col 3 — Right links */}
          <div className="flex items-center gap-8 justify-end">
            <button
              type="button"
              onClick={() => scrollToSection("how-it-works")}
              className="text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              {t("nav.whyNow")}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("passport-demo")}
              className="text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              {t("nav.howItWorks")}
            </button>
          </div>
        </div>
      </div>

      {/* ══════════ MOBILE DROPDOWN ══════════
          FIX 3 — Use fixed positioning so the menu escapes the Hero's
          overflow container and always appears on top of everything.
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed left-0 right-0 bg-white border-b border-slate-200 shadow-lg md:hidden"
            style={{ top: "calc(36px + 64px)", zIndex: 99999 }}
          >
            <div className="flex flex-col">
              <Link
                to={`/${language}/manifesto`}
                onClick={() => setOpen(false)}
                className="px-6 py-4 text-[15px] font-medium text-slate-800 hover:text-[var(--brand-coral)] hover:bg-slate-50 border-b border-slate-100 transition-colors"
              >
                {t("nav.manifesto")}
              </Link>
              <button
                type="button"
                onClick={() => handleScrollLink("fraud-detection")}
                className="px-6 py-4 text-left text-[15px] font-medium text-slate-800 hover:text-[var(--brand-coral)] hover:bg-slate-50 border-b border-slate-100 transition-colors bg-transparent w-full cursor-pointer border-none"
              >
                {t("nav.product")}
              </button>
              <button
                type="button"
                onClick={() => handleScrollLink("how-it-works")}
                className="px-6 py-4 text-left text-[15px] font-medium text-slate-800 hover:text-[var(--brand-coral)] hover:bg-slate-50 border-b border-slate-100 transition-colors bg-transparent w-full cursor-pointer border-none"
              >
                {t("nav.whyNow")}
              </button>
              <button
                type="button"
                onClick={() => handleScrollLink("passport-demo")}
                className="px-6 py-4 text-left text-[15px] font-medium text-slate-800 hover:text-[var(--brand-coral)] hover:bg-slate-50 transition-colors bg-transparent w-full cursor-pointer border-none"
              >
                {t("nav.howItWorks")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    // FIX 4 — overflow-visible so nothing inside gets clipped
    <div className="relative w-full min-h-[600px] h-[700px] md:h-[850px] overflow-visible bg-transparent">
      <HeroHeader />
      <TopBar />
      <div className="relative w-full max-w-[1363px] h-full mx-auto px-4">
        <PrivateBetaPill />
        <MainHeading />
        <SubHeading />
        <CTAButton />
      </div>
    </div>
  );
}