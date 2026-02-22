import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from "./components/Hero";
import { OurPromise } from "./components/OurPromise";
import { FraudDetection } from "./components/FraudDetection";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonial } from "./components/Testimonial";
import { PassportDemo } from "./components/PassportDemo";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Manifesto } from "./components/Manifesto";
import { GlobalBackground } from "./components/GlobalBackground";

function LandingPage() {
  return (
    <>
      <Hero />
      <OurPromise />
      <FraudDetection />
      <HowItWorks />
      <Testimonial />
      <PassportDemo />
      <FAQ />
      {/* CTA merged into Footer */}
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/manifesto" element={<Manifesto />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
