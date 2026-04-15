import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function Testimonial() {
  const { t } = useLanguage();
  
  return (
    <div id="why-now" className="w-full bg-white border-t border-b border-[var(--border)] pt-4 pb-8 md:pt-6 md:pb-12 lg:pt-8 lg:pb-16 flex justify-center relative overflow-hidden">
      <div className="max-w-[680px] px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p 
            className="text-[var(--foreground)] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.2] md:leading-[58px] mb-8 md:mb-12 text-center"
            style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'normal' }}
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
          <div className="space-y-4 md:space-y-6">
            {t('testimonial.subtext').split('\n\n').map((paragraph, index) => (
              <p 
                key={index}
                className="text-[var(--muted-foreground)] leading-[1.6] md:leading-[34px] text-[18px] text-center"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}