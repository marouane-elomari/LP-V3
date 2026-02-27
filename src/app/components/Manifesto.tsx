import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence } from "motion/react";
import { Footer } from "./Footer";
import imgImageLuuzonLogo from "figma:asset/e63cb367c32f14aac3dc78f143344c930f915ff1.png";
import { useLanguage } from "../contexts/LanguageContext";
import { PageTitle } from "./PageTitle";

// Helper function to scroll to section on homepage
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 100;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function ManifestoHeader() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleScrollLink = (id: string) => {
    setOpen(false);
    // Navigate to homepage first, then scroll
    window.location.href = `/${language}#${id}`;
  };

  return (
    <>
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
        {/* ══════════ MOBILE BAR ══════════ */}
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

          {/* Col 3 — Empty spacer (right) */}
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
            <Link
              to={`/${language}#fraud-detection`}
              className="text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors"
            >
              {t("nav.product")}
            </Link>
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
            <Link
              to={`/${language}#how-it-works`}
              className="text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors"
            >
              {t("nav.whyNow")}
            </Link>
            <Link
              to={`/${language}#passport-demo`}
              className="text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors"
            >
              {t("nav.howItWorks")}
            </Link>
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
            style={{ top: "64px", zIndex: 99999 }}
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

export function Manifesto() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-transparent min-h-screen w-full flex flex-col">
      <PageTitle titleKey="page.title.manifesto" />
      <ManifestoHeader />
      
      <main className="flex-grow w-full max-w-[800px] mx-auto px-4 md:px-6 py-8 sm:py-12 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-transparent backdrop-blur-sm p-5 sm:p-6 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-sm max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8 sm:mb-12 md:mb-16 pb-6 md:pb-8 border-b border-gray-200">
            <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-3 sm:mb-4">
              {t('manifesto.badge')}
            </div>
            <h1 className="italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[var(--foreground)]" style={{ fontFamily: 'Instrument Serif, serif' }}>
              {t('manifesto.hero.title1')}<br />
              {t('manifesto.hero.title2')}
            </h1>
          </div>

          {/* Blog Content */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            
            {/* Our Philosophy */}
            <article>
              <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-3">
                {t('manifesto.section1.number')}
              </div>
              <h2 className="italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--foreground)] mb-4 md:mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
                {t('manifesto.section1.title')}
              </h2>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>{t('manifesto.section1.p1')}</p>
                <p>{t('manifesto.section1.p2')}</p>
                <p>{t('manifesto.section1.p3')}</p>
              </div>
            </article>

            {/* Why Now */}
            <article>
              <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-3">
                {t('manifesto.section2.number')}
              </div>
              <h2 className="italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--foreground)] mb-4 md:mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
                {t('manifesto.section2.title')}
              </h2>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>{t('manifesto.section2.p1')}</p>
                <p>{t('manifesto.section2.p2')}</p>
                <p>{t('manifesto.section2.p3')}</p>
              </div>
            </article>

            {/* Our Solution */}
            <article>
              <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-3">
                {t('manifesto.section3.number')}
              </div>
              <h2 className="italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--foreground)] mb-4 md:mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
                {t('manifesto.section3.title')}
              </h2>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>{t('manifesto.section3.p1')}</p>
                <p>{t('manifesto.section3.p2')}</p>
                <p>{t('manifesto.section3.p3')}</p>
              </div>
            </article>

            {/* Our Vision */}
            <article>
              <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-3">
                {t('manifesto.section4.number')}
              </div>
              <h2 className="italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--foreground)] mb-4 md:mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
                {t('manifesto.section4.title')}
              </h2>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>{t('manifesto.section4.p1')}</p>
                <p>{t('manifesto.section4.p2')}</p>
                <p>{t('manifesto.section4.p3')}</p>
              </div>
            </article>

          </div>

          {/* Closing Statement */}
          <div className="mt-8 sm:mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200 text-center">
            <p className="text-[9px] uppercase tracking-widest text-gray-400">
              {t('manifesto.closing')}
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}