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

export function LegalNotice() {
  const { language } = useLanguage();

  // Always scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageTitle titleKey="page.title.legal" />

      {/* Header NOT fixed anymore */}
      <div className="relative z-50">
        <TopBar />
      </div>

      {/* Main Content (no fake padding anymore) */}
      <div className="relative z-10">
        <div className="min-h-screen py-16 md:py-24">
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
                ← {language === "fr" ? "Retour à l'accueil" : "Back to home"}
              </Link>

              <h1
                className="text-4xl md:text-5xl mb-4"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                {language === "fr" ? "Mentions Légales" : "Legal Notice"}
              </h1>

              <p className="text-slate-500 mb-12">
                {language === "fr"
                  ? "Dernière mise à jour : 27 février 2026"
                  : "Last updated: February 27, 2026"}
              </p>

              <div className="prose prose-slate max-w-none">
                {language === 'fr' ? (
                  <>
                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        1. Éditeur du Site
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Raison sociale :</strong> Luuzon SAS
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Forme juridique :</strong> Société par Actions Simplifiée
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Capital social :</strong> 10 000 €
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Siège social :</strong> 128 Rue La Boétie, 75008 Paris, France
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>SIRET :</strong> 123 456 789 00012
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>RCS :</strong> Paris B 123 456 789
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Numéro de TVA intracommunautaire :</strong> FR12 345678900
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Directeur de publication :</strong> [Nom du Fondateur]
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        <strong>Email :</strong> <a href="mailto:contact@luuzon.com" className="text-[var(--brand-coral)] hover:underline">contact@luuzon.com</a>
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        2. Hébergement
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Hébergeur :</strong> OVH SAS
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Siège social :</strong> 2 rue Kellermann, 59100 Roubaix, France
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        <strong>Téléphone :</strong> 1007
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        3. Propriété Intellectuelle
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        L'ensemble du contenu de ce site (textes, images, logos, vidéos, éléments graphiques, code source) est la propriété exclusive de Luuzon SAS et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Toute reproduction, représentation, modification, publication, adaptation totale ou partielle des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de Luuzon SAS.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        4. Données Personnelles
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Conformément à la loi n° 78-17 du 6 janvier 1978 modifiée relative à l'informatique, aux fichiers et aux libertés (CNIL), et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Pour exercer ces droits, veuillez nous contacter à : <a href="mailto:privacy@luuzon.com" className="text-[var(--brand-coral)] hover:underline">privacy@luuzon.com</a>
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mt-4">
                        Pour plus d'informations, consultez notre <Link to={`/${language}/privacy`} className="text-[var(--brand-coral)] hover:underline">Politique de Confidentialité</Link>.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        5. Cookies
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. Vous pouvez gérer vos préférences de cookies via le bandeau de consentement qui apparaît lors de votre première visite.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        6. Responsabilité
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Luuzon SAS s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, Luuzon SAS ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Luuzon SAS ne peut être tenue responsable des dommages directs ou indirects résultant de l'accès ou de l'utilisation du site, y compris l'inaccessibilité, les pertes de données, détériorations, destructions ou virus qui pourraient affecter l'équipement informatique de l'utilisateur.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        7. Liens Hypertextes
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Ce site peut contenir des liens hypertextes vers d'autres sites. Luuzon SAS ne contrôle pas ces sites et décline toute responsabilité quant à leur contenu.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        8. Droit Applicable et Juridiction
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        9. Contact
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Pour toute question concernant ces mentions légales :
                        <br />
                        <strong>Email :</strong> <a href="mailto:legal@luuzon.com" className="text-[var(--brand-coral)] hover:underline">legal@luuzon.com</a>
                        <br />
                        <strong>Téléphone :</strong> +33 (0)1 23 45 67 89
                        <br />
                        <strong>Adresse :</strong> Luuzon SAS, 128 Rue La Boétie, 75008 Paris, France
                      </p>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        1. Site Publisher
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Company name:</strong> Luuzon SAS
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Legal form:</strong> Simplified Joint Stock Company
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Share capital:</strong> €10,000
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Registered office:</strong> 128 Rue La Boétie, 75008 Paris, France
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>SIRET:</strong> 123 456 789 00012
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>RCS:</strong> Paris B 123 456 789
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>VAT number:</strong> FR12 345678900
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Publication director:</strong> [Founder Name]
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        <strong>Email:</strong> <a href="mailto:contact@luuzon.com" className="text-[var(--brand-coral)] hover:underline">contact@luuzon.com</a>
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        2. Hosting
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Host:</strong> OVH SAS
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
                        <strong>Registered office:</strong> 2 rue Kellermann, 59100 Roubaix, France
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        <strong>Phone:</strong> 1007
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        3. Intellectual Property
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        All content on this site (texts, images, logos, videos, graphic elements, source code) is the exclusive property of Luuzon SAS and is protected by French and international intellectual property laws.
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Any reproduction, representation, modification, publication, total or partial adaptation of the site's elements, regardless of the means or process used, is prohibited without prior written authorization from Luuzon SAS.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        4. Personal Data
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        In accordance with the amended law n° 78-17 of January 6, 1978 relating to data processing, files and freedoms (CNIL), and the General Data Protection Regulation (GDPR), you have the right to access, rectify, delete and object to personal data concerning you.
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        To exercise these rights, please contact us at: <a href="mailto:privacy@luuzon.com" className="text-[var(--brand-coral)] hover:underline">privacy@luuzon.com</a>
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mt-4">
                        For more information, see our <Link to={`/${language}/privacy`} className="text-[var(--brand-coral)] hover:underline">Privacy Policy</Link>.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        5. Cookies
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        This site uses cookies to improve user experience and analyze traffic. You can manage your cookie preferences via the consent banner that appears on your first visit.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        6. Liability
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        Luuzon SAS strives to ensure the accuracy and updating of information published on this site. However, Luuzon SAS cannot guarantee the accuracy, precision or completeness of information made available on this site.
                      </p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Luuzon SAS cannot be held responsible for direct or indirect damages resulting from access to or use of the site, including inaccessibility, data loss, deterioration, destruction or viruses that could affect user's computer equipment.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        7. Hyperlinks
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        This site may contain hyperlinks to other sites. Luuzon SAS does not control these sites and disclaims all responsibility for their content.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        8. Applicable Law and Jurisdiction
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        These legal notices are governed by French law. In case of dispute, French courts will have sole jurisdiction.
                      </p>
                    </section>

                    <section className="mb-12">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "Instrument Serif, serif" }}>
                        9. Contact
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        For any questions regarding these legal notices:
                        <br />
                        <strong>Email:</strong> <a href="mailto:legal@luuzon.com" className="text-[var(--brand-coral)] hover:underline">legal@luuzon.com</a>
                        <br />
                        <strong>Phone:</strong> +33 (0)1 23 45 67 89
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
      </div>

      <Footer />
    </>
  );
}