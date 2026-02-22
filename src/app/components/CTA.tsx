import { motion } from "motion/react";
import imgSymbolPurpleColor1 from "figma:asset/40b85271a3507ab611a930f7f99f064c51332982.png";

export function CTA() {
  return (
    <div className="bg-transparent py-12 flex justify-center">
        <div className="w-[1152px] h-[238px] bg-gradient-to-br from-[var(--brand-sky)]/30 to-[var(--brand-lavender)]/30 border border-[var(--brand-white)] rounded-3xl relative overflow-hidden flex items-center justify-between px-16 shadow-sm backdrop-blur-sm">
            
            <div className="relative z-10">
                <h2 className="text-[var(--foreground)] text-3xl font-['Arial'] mb-4">Would you like to talk to us?</h2>
                <p className="text-[var(--muted-foreground)] text-lg max-w-lg">We are moving fast, and your feedback is super important. Feel free to schedule a chat =)</p>
            </div>

            <motion.a 
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 bg-[var(--brand-coral)] border border-[var(--brand-coral)]/20 rounded-full h-[66px] px-2 flex items-center gap-4 pr-6 cursor-pointer shadow-lg shadow-[var(--brand-coral)]/20"
            >
                <div className="size-12 bg-white/20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <img src={imgSymbolPurpleColor1} className="size-9 object-cover" alt="" />
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">Schedule a chat</span>
                    <span className="text-white/80 text-xs">with one of our founders</span>
                </div>
                <div className="size-10 bg-white/20 rounded-full border border-white/20 flex items-center justify-center ml-4 backdrop-blur-sm">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white">
                        <path d="M3.3 8H12.7M10 5L13 8L10 11" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </motion.a>
        </div>
    </div>
  );
}
