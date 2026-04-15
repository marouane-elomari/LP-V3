import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import imgImageLuuzonLogo from "figma:asset/e63cb367c32f14aac3dc78f143344c930f915ff1.png";
import { useLanguage } from "../contexts/LanguageContext";

// Helper function to scroll to section
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 100;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function TopBanner() {
  const { t } = useLanguage();
  return (
    <div className="absolute h-[36px] left-0 top-0 w-full flex items-center justify-center gap-2 md:gap-4 px-2 z-50 bg-transparent backdrop-blur-sm">
      <div className="flex w-4 h-3 overflow-hidden rounded-[1px] shadow-sm opacity-90">
        <div className="w-1/3 h-full bg-[#2A66B7]" />
        <div className="w-1/3 h-full bg-white" />
        <div className="w-1/3 h-full bg-[#DB3A49]" />
      </div>
      <p className="font-sans text-slate-900 text-[10px] md:text-[12px] font-medium truncate">
        {t("hero.topBanner")}
      </p>
      <a
        href="https://www.cal.eu/luuzon/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:block bg-slate-900/10 border border-slate-900/20 px-3 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-slate-900 hover:bg-slate-900/20 transition-colors backdrop-blur-sm"
      >
        {t("hero.topBannerButton")}
      </a>
    </div>
  );
}

export function Navbar() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleScrollLink = (id: string) => {
    setOpen(false);
    // Check if we're on the homepage
    if (window.location.pathname === `/${language}` || window.location.pathname === `/${language}/`) {
      setTimeout(() => scrollToSection(id), 200);
    } else {
      // Navigate to homepage with hash
      window.location.href = `/${language}#${id}`;
    }
  };

  return (
    <>
      <TopBanner />
      
      {/* Navbar container */}
      <div
        className="absolute left-0 w-full z-40 flex items-center justify-center px-4 md:px-8"
        style={{ top: "40px" }}
      >
        <div className="w-full max-w-[1200px] bg-black/95 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">

        {/* ══════════ MOBILE BAR ══════════ */}
        <div className="grid grid-cols-3 md:hidden items-center h-[64px] px-4">

          {/* Col 1 — Hamburger (left) */}
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="w-[40px] h-[40px] flex items-center justify-center text-white"
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
                className="h-[24px] object-contain brightness-0 invert"
              />
            </Link>
          </div>

          {/* Col 3 — Empty spacer (right) balances hamburger */}
          <div />
        </div>

        {/* ══════════ DESKTOP BAR ══════════ */}
        <div className="hidden md:flex items-center h-[60px] px-8 gap-12">

          {/* Logo (left) */}
          <div className="flex items-center flex-shrink-0">
            <Link to={`/${language}`}>
              <img
                alt="Luuzon"
                src={imgImageLuuzonLogo}
                className="h-[28px] object-contain hover:opacity-80 transition-opacity brightness-0 invert"
              />
            </Link>
          </div>

          {/* Center links */}
          <div className="flex items-center gap-12 flex-1 justify-center">
            <Link
              to={`/${language}/manifesto`}
              className="text-white/90 text-[13px] hover:text-white transition-colors font-medium"
            >
              {t("nav.manifesto")}
            </Link>
            <button
              type="button"
              onClick={() => handleScrollLink("fraud-detection")}
              className="text-white/90 text-[13px] hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 font-medium"
            >
              {t("nav.product")}
            </button>
            <button
              type="button"
              onClick={() => handleScrollLink("why-now")}
              className="text-white/90 text-[13px] hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 font-medium"
            >
              {t("nav.whyNow")}
            </button>
            <button
              type="button"
              onClick={() => handleScrollLink("how-it-works")}
              className="text-white/90 text-[13px] hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 font-medium"
            >
              {t("nav.howItWorks")}
            </button>
          </div>

          {/* Right spacer for balance */}
          <div className="flex-shrink-0 w-[28px]" />
        </div>
        </div>
      </div>

      {/* ══════════ MOBILE DROPDOWN ══════════ */}
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
                onClick={() => handleScrollLink("why-now")}
                className="px-6 py-4 text-left text-[15px] font-medium text-slate-800 hover:text-[var(--brand-coral)] hover:bg-slate-50 border-b border-slate-100 transition-colors bg-transparent w-full cursor-pointer border-none"
              >
                {t("nav.whyNow")}
              </button>
              <button
                type="button"
                onClick={() => handleScrollLink("how-it-works")}
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