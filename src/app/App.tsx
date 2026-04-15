import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { OurPromise } from "./components/OurPromise";
import { Alumni } from "./components/Alumni";
import FraudDetection from "./components/FraudDetection";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonial } from "./components/Testimonial";
import { PassportDemo } from "./components/PassportDemo";
import { FAQ } from "./components/FAQ";
import { Manifesto } from "./components/Manifesto";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { LegalNotice } from "./components/LegalNotice";
import { NotFound } from "./components/NotFound";
import { CookieConsent } from "./components/CookieConsent";
import { GlobalBackground } from "./components/GlobalBackground";
import { SectionTransition } from "./components/SectionTransition";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SEOHead } from "./components/SEOHead";
import { BlogList } from "./components/BlogList";
import { BlogDetail } from "./components/BlogDetail";
import { LanguageRedirect } from "./components/LanguageRedirect";

function LandingPage() {
  return (
    <>
      <SEOHead
        titleKey="page.title.home"
        descriptionKey="page.description.home"
        canonicalPath=""
      />
      <main>
        <div className="relative">
          <Navbar />
          <SectionTransition gradient="linear-gradient(180deg, transparent 0%, transparent 100%)">
            <Hero />
          </SectionTransition>
        </div>

        <SectionTransition background="transparent">
          <OurPromise />
        </SectionTransition>

        <SectionTransition background="white">
          <Alumni />
        </SectionTransition>

        <SectionTransition background="transparent">
          <HowItWorks />
        </SectionTransition>

        <SectionTransition gradient="linear-gradient(180deg, rgba(254,145,112,0.03) 0%, transparent 100%)">
          <Testimonial />
        </SectionTransition>

        <SectionTransition background="transparent">
          <PassportDemo />
        </SectionTransition>

        <SectionTransition background="transparent">
          <FAQ />
        </SectionTransition>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full overflow-x-hidden relative">
        <GlobalBackground />
        <div className="relative z-10">
          <Routes>
            {/* Redirect root to /fr */}
            <Route path="/" element={<Navigate to="/fr" replace />} />

            {/* Language-based routes */}
            <Route
              path="/:lang"
              element={<LanguageProvider><LandingPage /></LanguageProvider>}
            />
            <Route
              path="/:lang/manifesto"
              element={<LanguageProvider><Manifesto /><CookieConsent /></LanguageProvider>}
            />
            <Route
              path="/:lang/privacy"
              element={<LanguageProvider><PrivacyPolicy /><CookieConsent /></LanguageProvider>}
            />
            <Route
              path="/:lang/legal"
              element={<LanguageProvider><LegalNotice /><CookieConsent /></LanguageProvider>}
            />

            {/* Blog routes */}
            <Route
              path="/:lang/blog"
              element={<LanguageProvider><BlogList /><CookieConsent /></LanguageProvider>}
            />
            <Route
              path="/:lang/blog/:slug"
              element={<LanguageProvider><BlogDetail /><CookieConsent /></LanguageProvider>}
            />

            {/* 404 */}
            <Route
              path="/:lang/*"
              element={<LanguageProvider><NotFound /><CookieConsent /></LanguageProvider>}
            />

            {/* Catch-all: redirect to /:lang based on browser language */}
            <Route path="*" element={<LanguageRedirect />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
