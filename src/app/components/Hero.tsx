import { motion } from "motion/react";
import { Link } from "react-router-dom";
import svgPaths from "../../imports/svg-80n22t6tee";
import imgImageLuuzonLogo from "figma:asset/e63cb367c32f14aac3dc78f143344c930f915ff1.png";

function PrivateBetaPill() {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="absolute bg-white border-slate-200 border border-solid h-[28px] left-[50%] -translate-x-1/2 rounded-full top-[160px] px-4 flex items-center justify-center gap-2 z-20 shadow-sm"
    >
      <div className="bg-emerald-500 rounded-full size-[6px] animate-pulse" />
      <p className="font-sans text-[var(--muted-foreground)] text-[11px] tracking-[0.6px] uppercase font-semibold">Private Beta Live</p>
    </motion.div>
  );
}

function MainHeading() {
  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-[60%] w-full flex flex-col items-center justify-center z-10 pointer-events-none">
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <h1 className="font-['Instrument_Serif:Regular',sans-serif] text-[140px] leading-[0.8] text-center tracking-tight text-[var(--foreground)] drop-shadow-sm">
          Trust in rentals,
        </h1>
        <motion.span 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-['Instrument_Serif:Italic',sans-serif] italic text-[140px] leading-[0.8] text-center block text-[var(--brand-coral)]"
        >
          restored.
        </motion.span>
      </motion.div>
    </div>
  );
}

function SubHeading() {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="absolute left-[50%] -translate-x-1/2 top-[62%] w-[580px] z-20"
    >
      <p className="font-['Arial:Regular',sans-serif] leading-[32.5px] text-[var(--muted-foreground)] text-[20px] text-center w-full whitespace-pre-wrap backdrop-blur-[2px]">
        The institutional standard for lease verification. We connect verified agencies with honest tenants through an intelligent, neutral B2B2C ecosystem.
      </p>
    </motion.div>
  );
}

function CTAButton() {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay: 1 }}
      className="absolute bg-[var(--primary)] h-[56px] left-[50%] -translate-x-1/2 rounded-md shadow-lg top-[78%] w-[260px] flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-all duration-300 z-30 group border border-transparent hover:border-slate-600"
    >
      <p className="font-['Arial:Regular',sans-serif] text-[var(--brand-white)] text-[16px] tracking-[0.5px] uppercase font-bold group-hover:tracking-[1px] transition-all">Book a demo</p>
    </motion.div>
  );
}

function TopBar() {
  return (
    <div className="absolute top-[36px] w-full z-10 border-b border-[var(--border)] bg-[var(--brand-white)]/90 backdrop-blur-md shadow-sm">
      <div className="h-[80px] w-full flex items-center justify-center gap-10 bg-[#ffffff]">
        {/* Left Links */}
        <div className="flex items-center gap-8">
            <Link to="/manifesto" className="font-['Arial:Regular',sans-serif] text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors">Read Manifesto</Link>
            <a href="#" className="font-['Arial:Regular',sans-serif] text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors text-left">Product</a>
        </div>

        {/* Center Logo */}
        <div className="h-[32px] w-[120px] shrink-0 flex justify-center">
            <img alt="" className="h-full object-contain" src={imgImageLuuzonLogo} />
        </div>
        
        {/* Right Links */}
        <div className="flex items-center gap-8">
            <a href="#" className="font-['Arial:Regular',sans-serif] text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors">Why Now</a>
            <a href="#" className="font-['Arial:Regular',sans-serif] text-[var(--foreground)] text-[14px] hover:text-[var(--brand-coral)] transition-colors">How it works</a>
        </div>
      </div>
    </div>
  );
}

function FranceFlag() {
    return (
        <div className="absolute left-[21px] top-[11.87px] w-[19px] h-[11px] overflow-hidden">
             <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 13">
                <path d={svgPaths.p2bcda300} fill="#DB3A49" />
                <path d={svgPaths.p23888c80} fill="white" />
                <path d={svgPaths.p3dee3300} fill="white" />
                <path d={svgPaths.p2eb9dc80} fill="#2A66B7" />
             </svg>
        </div>
    )
}

function HeroHeader() {
    return (
      <div className="absolute h-[36px] left-0 top-0 w-full flex items-center justify-center gap-4 z-20 border-b border-slate-800 bg-[#000000]">
        <div className="flex w-4 h-3 overflow-hidden rounded-[1px] shadow-sm opacity-90">
          <div className="w-1/3 h-full bg-[#2A66B7]" />
          <div className="w-1/3 h-full bg-white" />
          <div className="w-1/3 h-full bg-[#DB3A49]" />
        </div>
        <p className="font-sans text-slate-300 text-[12px] font-medium">We are transforming the rental market.</p>
        <div className="bg-slate-800 border border-slate-700 px-3 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white cursor-pointer hover:bg-slate-700 transition-colors">
          Join Beta
        </div>
      </div>
    )
}

export function Hero() {
  return (
    <div className="relative w-full h-[850px] overflow-hidden bg-transparent">
      <HeroHeader />
      <TopBar />
      {/* Background provided globally */}
      <div className="relative w-[1363px] h-full mx-auto">
        <FranceFlag />
        <PrivateBetaPill />
        <MainHeading />
        <SubHeading />
        <CTAButton />
      </div>
    </div>
  );
}
