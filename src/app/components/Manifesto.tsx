import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import imgImageLuuzonLogo from "figma:asset/e63cb367c32f14aac3dc78f143344c930f915ff1.png";

function ManifestoHeader() {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-[1364px] mx-auto px-6 h-20 flex items-center justify-between">
         {/* Left Links */}
         <div className="flex items-center gap-8">
            <Link to="/manifesto" className="font-['Arial:Regular',sans-serif] text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors font-bold">Read Manifesto</Link>
            <Link to="/" className="font-['Arial:Regular',sans-serif] text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors text-left">Product</Link>
        </div>

        {/* Center Logo */}
        <Link to="/" className="h-8 block">
            <img alt="Luuzon" className="h-full object-contain" src={imgImageLuuzonLogo} />
        </Link>
        
        {/* Right Links */}
        <div className="flex items-center gap-8">
            <Link to="/" className="font-['Arial:Regular',sans-serif] text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors">Why Now</Link>
            <Link to="/" className="font-['Arial:Regular',sans-serif] text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors">Security</Link>
        </div>
      </div>
    </div>
  );
}

export function Manifesto() {
  return (
    <div className="bg-transparent min-h-screen w-full flex flex-col">
      <ManifestoHeader />
      
      <main className="flex-grow w-full max-w-[800px] mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-[var(--border)] shadow-sm"
        >
          <h1 className="font-['Instrument_Serif:Regular',sans-serif] text-5xl md:text-7xl leading-tight text-[var(--foreground)] mb-8 text-center">
            Housing, Automated.<br />
            <span className="italic text-[var(--brand-coral)]">Living, Simplified.</span>
          </h1>

          <div className="font-['Arial:Regular',sans-serif] text-[var(--muted-foreground)] text-lg leading-relaxed space-y-6">
            <p>
              The rental market is broken. It is a tangle of inefficiencies, mistrust, and outdated processes that frustrate tenants and burden agencies. We believe there is a better way.
            </p>
            <p>
              We are building the institutional standard for lease verification. By connecting verified agencies with honest tenants through an intelligent, neutral B2B2C ecosystem, we remove the friction that defines modern renting.
            </p>
            <p>
              Imagine a world where your rental history is your passport. Where applying for a home is as simple as a single click, and where landlords can trust the people they welcome into their properties without invasive, manual vetting.
            </p>
            <p>
              This is not just about technology; it's about dignity. It's about restoring trust in a system that has lost it. It's about making housing accessible, fair, and transparent for everyone involved.
            </p>
            <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-3xl text-[var(--foreground)] mt-12 mb-4">
              Our Commitment
            </h2>
            <p>
              We are committed to privacy, security, and neutrality. We do not take sides; we facilitate truth. Our platform is built on the belief that data should empower, not exploit.
            </p>
            <p>
              Join us as we redesign the foundation of how we live. Welcome to the future of renting.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
