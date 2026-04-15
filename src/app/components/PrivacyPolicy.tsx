import { motion } from "motion/react";
import { Link } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { PageTitle } from "./PageTitle";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useEffect } from "react";

export function PrivacyPolicy() {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageTitle titleKey="page.title.privacy" />
      
      <div className="relative">
        <Navbar />
      </div>

      {/* Main content with top padding to account for navbar */}
      <div className="relative z-10 pt-[140px]">
        <div className="min-h-screen bg-transparent py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to={`/${language}`}
                className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[var(--brand-coral)] transition-colors mb-8"
              >
                ← {t("nav.backToHome")}
              </Link>

              <h1
                className="text-4xl md:text-5xl text-[var(--foreground)] mb-4"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                {t("privacy.title")}
              </h1>
              <p className="text-slate-500 mb-12">
                {t("privacy.lastUpdated")}
              </p>

              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-line text-[var(--foreground)] leading-relaxed">
                  {t("privacy.content")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}