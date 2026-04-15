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

function MainHeading() {
  const { t } = useLanguage();
  return (
    <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-[50%] w-full px-4 flex flex-col items-center justify-center z-10 pointer-events-none">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="leading-[0.85] text-center tracking-tight text-[var(--foreground)] drop-shadow-sm px-4 text-[56px] sm:text-[72px] md:text-[100px] lg:text-[120px]">
          {t("hero.title1")}
        </h1>
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="italic leading-[0.85] text-center block text-[var(--brand-coral)] text-[56px] sm:text-[72px] md:text-[100px] lg:text-[120px]"
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
      className="absolute left-[50%] -translate-x-1/2 top-[62%] w-full max-w-[90%] sm:max-w-[700px] px-4 z-20"
    >
      <p className="leading-[1.6] text-[var(--muted-foreground)] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-center w-full whitespace-normal backdrop-blur-[2px] mb-3">
        {t("hero.subtitle")}
      </p>
      <p className="leading-[1.5] text-[var(--muted-foreground)] text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-center w-full whitespace-normal backdrop-blur-[2px] opacity-90">
        {t("hero.subtitleSecondary")}
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
      className="absolute bg-[var(--primary)] h-[48px] sm:h-[56px] left-[50%] -translate-x-1/2 rounded-md shadow-lg top-[90%] md:top-[88%] w-[220px] sm:w-[260px] flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-all duration-300 z-30 group border border-transparent hover:border-slate-600"
    >
      <p className="text-[var(--brand-white)] text-[14px] sm:text-[16px] tracking-[0.5px] uppercase font-bold group-hover:tracking-[1px] transition-all">
        {t("hero.cta")}
      </p>
    </motion.a>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    // Full viewport height for the hero section
    <section 
      id="hero" 
      className="relative w-full h-screen overflow-visible bg-transparent" 
      aria-label="Hero section"
    >
      <div className="relative w-full max-w-[1363px] h-full mx-auto px-4">
        <MainHeading />
        <SubHeading />
        <CTAButton />
      </div>
    </section>
  );
}