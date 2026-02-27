import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function Testimonial() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full bg-white border-t border-b border-[var(--border)] py-24 flex justify-center relative overflow-hidden">
      <div className="max-w-[680px] px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p 
            className="text-[var(--foreground)] text-[48px] leading-[58px] mb-12"
            style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}
          >
            {t('testimonial.quote')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        >
          <p 
            className="text-[var(--muted-foreground)] text-[22px] leading-[34px]"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('testimonial.subtext')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}