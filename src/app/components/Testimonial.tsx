import { motion } from "motion/react";

export function Testimonial() {
  return (
    <div className="w-full bg-transparent py-32 flex justify-center relative overflow-hidden">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-[848px] relative z-10"
        >
            <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-[36px] text-[var(--foreground)] leading-[45px]">
                "The rental market lacked a single source of truth.<br/>
                <span className="text-[var(--muted-foreground)]">Now, it has Luuzon."</span>
            </h2>
            
            <div className="w-16 h-1 bg-[var(--brand-coral)] mx-auto my-8" />
            
            <p className="font-['Arial:Regular',sans-serif] text-[var(--muted-foreground)] text-[14px] uppercase tracking-[1.4px]">Restoring Trust Through Data</p>
        </motion.div>
    </div>
  );
}
