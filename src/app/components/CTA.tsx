import { motion } from "motion/react";
import imgSymbolPurpleColor1 from "figma:asset/40b85271a3507ab611a930f7f99f064c51332982.png";

export function CTA() {
  return (
    <div className="bg-transparent py-8 md:py-12 flex justify-center px-4">
        <div className="w-full max-w-[1152px] min-h-[200px] md:h-[238px] bg-gradient-to-br from-[var(--brand-sky)]/30 to-[var(--brand-lavender)]/30 border border-[var(--brand-white)] rounded-2xl md:rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 md:px-12 lg:px-16 gap-6 md:gap-8 shadow-sm backdrop-blur-sm">
            
            <div className="relative z-10 text-center md:text-left">
                <h2 className="text-[var(--foreground)] text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4">Would you like to talk to us?</h2>
                <p className="text-[var(--muted-foreground)] text-sm md:text-base lg:text-lg max-w-lg">We are moving fast, and your feedback is super important. Feel free to schedule a chat =)</p>
            </div>

            <motion.a 
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 bg-[var(--brand-coral)] border border-[var(--brand-coral)]/20 rounded-full h-[56px] md:h-[66px] px-2 flex items-center gap-3 md:gap-4 pr-4 md:pr-6 cursor-pointer shadow-lg shadow-[var(--brand-coral)]/20 flex-shrink-0"
            >
                <div className="size-10 md:size-12 bg-white/20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <img src={imgSymbolPurpleColor1} loading="lazy" className="size-7 md:size-9 object-cover" alt="" />
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-bold text-xs md:text-sm">Schedule a chat</span>
                    <span className="text-white/80 text-[10px] md:text-xs">with one of our founders</span>
                </div>
                <div className="size-8 md:size-10 bg-white/20 rounded-full border border-white/20 flex items-center justify-center ml-2 md:ml-4 backdrop-blur-sm">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" className="md:w-4 md:h-4">
                        <path d="M3.3 8H12.7M10 5L13 8L10 11" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </motion.a>
        </div>
    </div>
  );
}