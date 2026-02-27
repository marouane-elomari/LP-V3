import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router";
import { useEffect } from "react";
import favicon from "../assets/favicon.png";
import { Hero } from "./components/Hero";
import { OurPromise } from "./components/OurPromise";
import { Alumni } from "./components/Alumni";
import FraudDetection from "./components/FraudDetection";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonial } from "./components/Testimonial";
import { PassportDemo } from "./components/PassportDemo";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Manifesto } from "./components/Manifesto";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { LegalNotice } from "./components/LegalNotice";
import { CookieConsent } from "./components/CookieConsent";
import { GlobalBackground } from "./components/GlobalBackground";
import { SectionTransition } from "./components/SectionTransition";
import { LanguageProvider } from "./contexts/LanguageContext";
import { PageTitle } from "./components/PageTitle";

function LandingPage() {
  return (
    <>
      <PageTitle titleKey="page.title.home" />
      <SectionTransition gradient="linear-gradient(180deg, transparent 0%, transparent 100%)">
        <Hero />
      </SectionTransition>

      <SectionTransition background="transparent">
        <OurPromise />
      </SectionTransition>

      <SectionTransition background="white">
        <Alumni />
      </SectionTransition>

      <SectionTransition background="#f9fafb">
        <FraudDetection />
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

      <SectionTransition background="transparent">
        {/* CTA merged into Footer */}
        <Footer />
      </SectionTransition>

      <CookieConsent />
    </>
  );
}

export default function App() {
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = favicon;
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full overflow-x-hidden relative">
        <GlobalBackground />
        <div className="relative z-10">
          <Routes>
            {/* Redirect root to /fr */}
            <Route
              path="/"
              element={<Navigate to="/fr" replace />}
            />

            {/* Language-based routes */}
            <Route
              path="/:lang"
              element={
                <LanguageProvider>
                  <LandingPage />
                </LanguageProvider>
              }
            />
            <Route
              path="/:lang/manifesto"
              element={
                <LanguageProvider>
                  <Manifesto />
                  <CookieConsent />
                </LanguageProvider>
              }
            />
            <Route
              path="/:lang/privacy"
              element={
                <LanguageProvider>
                  <PrivacyPolicy />
                  <CookieConsent />
                </LanguageProvider>
              }
            />
            <Route
              path="/:lang/legal"
              element={
                <LanguageProvider>
                  <LegalNotice />
                  <CookieConsent />
                </LanguageProvider>
              }
            />

            {/* Catch-all redirect to /fr */}
            <Route
              path="*"
              element={<Navigate to="/fr" replace />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}