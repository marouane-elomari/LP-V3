import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X, Settings } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("luuzon-cookie-consent");
    if (!consent) {
      // Show banner after 1 second delay
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("luuzon-cookie-consent", JSON.stringify(prefs));
    setShow(false);
    setShowConfig(false);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const rejectAll = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(onlyEssential);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[100000] p-4 md:p-6"
        >
          <div className="max-w-5xl mx-auto bg-white border border-[var(--border)] rounded-lg shadow-2xl overflow-hidden">
            {!showConfig ? (
              /* Main Cookie Banner */
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
                      {t('cookies.title')}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">
                      {t('cookies.description')}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={acceptAll}
                        className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-md text-sm font-bold hover:bg-slate-800 transition-colors"
                      >
                        {t('cookies.acceptAll')}
                      </button>
                      <button
                        onClick={rejectAll}
                        className="px-6 py-2.5 border border-[var(--border)] bg-white text-slate-600 rounded-md text-sm font-bold hover:border-slate-400 hover:text-slate-800 transition-colors"
                      >
                        {t('cookies.rejectAll')}
                      </button>
                      <button
                        onClick={() => setShowConfig(true)}
                        className="px-6 py-2.5 border border-[var(--border)] bg-white text-slate-600 rounded-md text-sm font-bold hover:border-slate-400 hover:text-slate-800 transition-colors flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        {t('cookies.configure')}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setShow(false)}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Configuration Panel */
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    {t('cookies.configure')}
                  </h3>
                  <button
                    onClick={() => setShowConfig(false)}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Back"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Essential Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-[var(--foreground)]">
                          {t('cookies.essential')}
                        </h4>
                        <div className="px-3 py-1 bg-slate-200 text-slate-500 text-xs font-bold rounded-full">
                          {t('cookies.essential')}
                        </div>
                      </div>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {t('cookies.essentialDesc')}
                      </p>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[var(--border)]">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-[var(--foreground)]">
                          {t('cookies.analytics')}
                        </h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) =>
                              setPreferences({
                                ...preferences,
                                analytics: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"></div>
                        </label>
                      </div>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {t('cookies.analyticsDesc')}
                      </p>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[var(--border)]">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-[var(--foreground)]">
                          {t('cookies.marketing')}
                        </h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={(e) =>
                              setPreferences({
                                ...preferences,
                                marketing: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"></div>
                        </label>
                      </div>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {t('cookies.marketingDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={saveCustomPreferences}
                    className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-md text-sm font-bold hover:bg-slate-800 transition-colors"
                  >
                    {t('cookies.savePreferences')}
                  </button>
                  <button
                    onClick={() => setShowConfig(false)}
                    className="px-6 py-2.5 border border-[var(--border)] bg-white text-slate-600 rounded-md text-sm font-bold hover:border-slate-400 hover:text-slate-800 transition-colors"
                  >
                    {t('cookies.backToMain')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
