import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { PageTitle } from "./PageTitle";
import { Footer } from "./Footer";
import imgImageLuuzonLogo from "figma:asset/e63cb367c32f14aac3dc78f143344c930f915ff1.png";
import { useState, useEffect } from "react";

function TopBar() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleScrollLink = (id: string) => {
    setOpen(false);
    navigate(`/${language}#${id}`);
  };

  return (
    <div className="left-0 w-full bg-white border-b border-slate-200 shadow-sm">
      {/* Mobile Bar */}
      <div className="grid grid-cols-3 md:hidden items-center h-[64px] px-4">
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

        <div className="flex items-center justify-center">
          <Link to={`/${language}`}>
            <img
              alt="Luuzon"
              src={imgImageLuuzonLogo}
              className="h-[24px] object-contain"
            />
          </Link>
        </div>

        <div />
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 flex flex-col gap-4">
          <button
            onClick={() => handleScrollLink("fraud-detection")}
            className="text-left text-sm text-slate-700"
          >
            {t("nav.product")}
          </button>

          <button
            onClick={() => handleScrollLink("how-it-works")}
            className="text-left text-sm text-slate-700"
          >
            {t("nav.whyNow")}
          </button>

          <button
            onClick={() => handleScrollLink("passport-demo")}
            className="text-left text-sm text-slate-700"
          >
            {t("nav.howItWorks")}
          </button>

          <Link
            to={`/${language}/manifesto`}
            onClick={() => setOpen(false)}
            className="text-sm text-slate-700"
          >
            {t("nav.manifesto")}
          </Link>
        </div>
      )}

      {/* Desktop Bar */}
      <div className="hidden md:grid grid-cols-3 items-center h-[80px] px-12">
        <div className="flex items-center gap-8">
          <Link
            to={`/${language}/manifesto`}
            className="text-[14px] hover:text-[var(--brand-coral)] transition-colors"
          >
            {t("nav.manifesto")}
          </Link>

          <button
            onClick={() => handleScrollLink("fraud-detection")}
            className="text-[14px] hover:text-[var(--brand-coral)] transition-colors"
          >
            {t("nav.product")}
          </button>
        </div>

        <div className="flex items-center justify-center">
          <Link to={`/${language}`}>
            <img
              alt="Luuzon"
              src={imgImageLuuzonLogo}
              className="h-[32px] object-contain hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        <div className="flex items-center gap-8 justify-end">
          <button
            onClick={() => handleScrollLink("how-it-works")}
            className="text-[14px] hover:text-[var(--brand-coral)] transition-colors"
          >
            {t("nav.whyNow")}
          </button>

          <button
            onClick={() => handleScrollLink("passport-demo")}
            className="text-[14px] hover:text-[var(--brand-coral)] transition-colors"
          >
            {t("nav.howItWorks")}
          </button>
        </div>
      </div>
    </div>
  );
}
export function PrivacyPolicy() {
  const { t, language } = useLanguage();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <PageTitle titleKey="page.title.privacy" />
      
      {/* Fixed Header and TopBar */}
      <div className="relative z-50">
        <TopBar />
      </div>

      {/* Main content with top padding to account for fixed header */}
      <div className="relative z-10">
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
                ← {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
              </Link>

              <h1
                className="text-4xl md:text-5xl text-[var(--foreground)] mb-4"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                {language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
              </h1>
              <p className="text-slate-500 mb-12">
                {language === 'fr' ? 'Dernière mise à jour : 27 février 2026' : 'Last updated: February 27, 2026'}
              </p>

              <div className="prose prose-slate max-w-none">
                {language === 'fr' ? (
                  <>
                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        1. Introduction
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Chez Luuzon, nous prenons votre vie privée au sérieux. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles lorsque vous utilisez notre plateforme de vérification de bail.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        2. Données Collectées
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Nous collectons les types de données suivants :
                      </p>
                      <ul className="list-disc pl-6 text-[var(--muted-foreground)] space-y-2">
                        <li><strong>Informations d'identité :</strong> Nom, prénom, date de naissance, pièce d'identité</li>
                        <li><strong>Informations financières :</strong> Bulletins de salaire, avis d'imposition, revenus</li>
                        <li><strong>Historique locatif :</strong> Adresses précédentes, durée de location</li>
                        <li><strong>Données techniques :</strong> Adresse IP, cookies, logs de connexion</li>
                      </ul>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        3. Utilisation des Données
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Vos données sont utilisées exclusivement pour :
                      </p>
                      <ul className="list-disc pl-6 text-[var(--muted-foreground)] space-y-2">
                        <li>Vérifier l'authenticité de vos documents</li>
                        <li>Détecter les fraudes potentielles</li>
                        <li>Générer votre score de confiance</li>
                        <li>Faciliter votre processus de candidature locative</li>
                        <li>Améliorer nos services via des analyses anonymisées</li>
                      </ul>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        4. Sécurité et Cryptage
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Nous utilisons un cryptage de niveau bancaire (AES-256) pour protéger vos données. Nos serveurs sont conformes aux standards ISO 27001 et hébergés dans l'Union Européenne. Nous n'avons jamais accès à vos données en clair - elles sont cryptées de bout en bout.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        5. Partage des Données
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Vos données ne sont <strong>jamais vendues</strong>. Elles sont partagées uniquement avec :
                      </p>
                      <ul className="list-disc pl-6 text-[var(--muted-foreground)] space-y-2">
                        <li>Les agences immobilières que vous avez explicitement autorisées</li>
                        <li>Nos partenaires de vérification sous contrat de confidentialité stricte</li>
                        <li>Les autorités légales en cas de réquisition judiciaire</li>
                      </ul>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        6. Vos Droits (RGPD)
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Conformément au RGPD, vous disposez des droits suivants :
                      </p>
                      <ul className="list-disc pl-6 text-[var(--muted-foreground)] space-y-2">
                        <li><strong>Droit d'accès :</strong> Consultez toutes vos données collectées</li>
                        <li><strong>Droit de rectification :</strong> Corrigez vos informations</li>
                        <li><strong>Droit à l'oubli :</strong> Supprimez votre compte et vos données</li>
                        <li><strong>Droit de portabilité :</strong> Téléchargez vos données au format JSON</li>
                        <li><strong>Droit d'opposition :</strong> Refusez certains traitements</li>
                      </ul>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mt-4">
                        Pour exercer vos droits, contactez-nous à : <a href="mailto:privacy@luuzon.com" className="text-[var(--brand-coral)] hover:underline">privacy@luuzon.com</a>
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        7. Cookies
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Nous utilisons des cookies essentiels pour le fonctionnement du site, des cookies analytiques (Google Analytics) et des cookies marketing (avec votre consentement). Vous pouvez gérer vos préférences via notre bandeau de cookies.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        8. Conservation des Données
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Vos données sont conservées pendant 3 ans après votre dernière activité ou jusqu'à suppression de votre compte. Les documents de vérification sont supprimés automatiquement après 90 jours.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        9. Contact
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Pour toute question concernant cette politique de confidentialité :
                        <br />
                        <strong>Email :</strong> <a href="mailto:privacy@luuzon.com" className="text-[var(--brand-coral)] hover:underline">privacy@luuzon.com</a>
                        <br />
                        <strong>Adresse :</strong> Luuzon SAS, 128 Rue La Boétie, 75008 Paris, France
                      </p>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        1. Introduction
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        At Luuzon, we take your privacy seriously. This privacy policy explains how we collect, use, store, and protect your personal information when you use our lease verification platform.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        2. Data Collected
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        We collect the following types of data:
                      </p>
                      <ul className="list-disc pl-6 text-[var(--muted-foreground)] space-y-2">
                        <li><strong>Identity information:</strong> First name, last name, date of birth, ID documents</li>
                        <li><strong>Financial information:</strong> Pay slips, tax returns, income</li>
                        <li><strong>Rental history:</strong> Previous addresses, rental duration</li>
                        <li><strong>Technical data:</strong> IP address, cookies, connection logs</li>
                      </ul>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        3. Data Usage
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Your data is used exclusively to:
                      </p>
                      <ul className="list-disc pl-6 text-[var(--muted-foreground)] space-y-2">
                        <li>Verify the authenticity of your documents</li>
                        <li>Detect potential fraud</li>
                        <li>Generate your trust score</li>
                        <li>Facilitate your rental application process</li>
                        <li>Improve our services through anonymized analytics</li>
                      </ul>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        4. Security and Encryption
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        We use bank-grade encryption (AES-256) to protect your data. Our servers comply with ISO 27001 standards and are hosted in the European Union. We never have access to your data in plain text - it is encrypted end-to-end.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        5. Data Sharing
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Your data is <strong>never sold</strong>. It is shared only with:
                      </p>
                      <ul className="list-disc pl-6 text-[var(--muted-foreground)] space-y-2">
                        <li>Real estate agencies you have explicitly authorized</li>
                        <li>Our verification partners under strict confidentiality agreements</li>
                        <li>Legal authorities in case of judicial requisition</li>
                      </ul>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        6. Your Rights (GDPR)
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        In accordance with GDPR, you have the following rights:
                      </p>
                      <ul className="list-disc pl-6 text-[var(--muted-foreground)] space-y-2">
                        <li><strong>Right of access:</strong> View all your collected data</li>
                        <li><strong>Right of rectification:</strong> Correct your information</li>
                        <li><strong>Right to be forgotten:</strong> Delete your account and data</li>
                        <li><strong>Right to data portability:</strong> Download your data in JSON format</li>
                        <li><strong>Right to object:</strong> Refuse certain processing</li>
                      </ul>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mt-4">
                        To exercise your rights, contact us at: <a href="mailto:privacy@luuzon.com" className="text-[var(--brand-coral)] hover:underline">privacy@luuzon.com</a>
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        7. Cookies
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        We use essential cookies for site functionality, analytics cookies (Google Analytics), and marketing cookies (with your consent). You can manage your preferences via our cookie banner.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        8. Data Retention
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Your data is retained for 3 years after your last activity or until account deletion. Verification documents are automatically deleted after 90 days.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        9. Contact
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        For any questions regarding this privacy policy:
                        <br />
                        <strong>Email:</strong> <a href="mailto:privacy@luuzon.com" className="text-[var(--brand-coral)] hover:underline">privacy@luuzon.com</a>
                        <br />
                        <strong>Address:</strong> Luuzon SAS, 128 Rue La Boétie, 75008 Paris, France
                      </p>
                    </section>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}