import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function OurPromise() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full flex justify-center py-12 md:py-20 relative z-10 bg-transparent px-4 md:px-0">
      <div className="flex flex-col gap-8 md:gap-[48px] w-full max-w-[584px]">
        {/* Paragraph 1 - Big Serif */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full"
        >
          <h2 className="leading-[1.25] md:leading-[45px] text-[var(--foreground)] text-[24px] sm:text-[28px] md:text-[36px] w-full font-normal">
            {t('promise.intro')}
          </h2>
        </motion.div>

        {/* Container 1 - Text blocks */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4 md:gap-[24px] w-full"
        >
          <p className="leading-[1.625] md:leading-[29.25px] text-[var(--muted-foreground)] text-[16px] md:text-[18px] w-full">
            {t('promise.market.broken')}
          </p>
          <p className="leading-[1.625] md:leading-[29.25px] text-[var(--muted-foreground)] text-[16px] md:text-[18px] w-full">
            {t('promise.bridge')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}