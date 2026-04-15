import { motion } from "motion/react";
import { Link } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { SEOHead } from "./SEOHead";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useEffect } from "react";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  const { t, language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        titleKey="page.title.notFound" 
        descriptionKey="page.description.notFound"
        canonicalPath="/404"
      />

      <div className="relative">
        <Navbar />
      </div>

      {/* Main content with top padding to account for navbar */}
      <div className="relative z-10 pt-[140px]">
        <div className="min-h-screen flex items-center justify-center py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[var(--brand-coral)]/10 blur-3xl rounded-full" />
                  <AlertCircle className="w-24 h-24 text-[var(--brand-coral)] relative" />
                </div>
              </motion.div>

              {/* 404 Number */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-8xl md:text-9xl font-bold text-[var(--foreground)]"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                404
              </motion.h1>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-4xl text-[var(--foreground)]"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                {t("notFound.heading")}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed"
              >
                {t("notFound.description")}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              >
                <Link
                  to={`/${language}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--brand-coral)] text-white rounded-full hover:bg-[var(--brand-coral)]/90 transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Home className="w-5 h-5" />
                  {t("notFound.backHome")}
                </Link>

                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-full hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 font-medium text-base"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t("notFound.goBack")}
                </button>
              </motion.div>

              {/* Helpful Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-8 border-t border-slate-200 mt-12"
              >
                <p className="text-sm text-slate-500 mb-4">
                  {t("notFound.helpfulLinks")}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    to={`/${language}/manifesto`}
                    className="text-sm text-[var(--brand-coral)] hover:underline"
                  >
                    {t("nav.manifesto")}
                  </Link>
                  <Link
                    to={`/${language}/privacy`}
                    className="text-sm text-[var(--brand-coral)] hover:underline"
                  >
                    {t("footer.privacy")}
                  </Link>
                  <Link
                    to={`/${language}/legal`}
                    className="text-sm text-[var(--brand-coral)] hover:underline"
                  >
                    {t("footer.legal")}
                  </Link>
                  <a
                    href="https://www.cal.eu/luuzon/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--brand-coral)] hover:underline"
                  >
                    {t("footer.contact")}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}