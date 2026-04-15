import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import FraudDetection from "./FraudDetection";

export function OurPromise() {
  const { t } = useLanguage();

  return (
    <section 
      id="our-promise" 
      className="w-full pt-16 md:pt-20 lg:pt-24 pb-0 relative overflow-hidden"
      aria-labelledby="our-promise-title"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #cf3c7e 0%, transparent 70%)",
            top: "10%",
            left: "-20%",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(circle, #B8A8FE 0%, transparent 70%)",
            bottom: "10%",
            right: "-10%",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, #C9E4FF 0%, transparent 70%)",
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Section 1: The Problem */}
      <div className="w-full flex justify-center relative z-10 bg-white px-4 md:px-[0px] py-[40px] md:py-[56px] lg:py-[72px] mx-[0px] my-8 md:my-12 lg:my-16">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-[48px] w-full max-w-[720px] p-[0px]">
          {/* Big title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full"
          >
            <h2 className="leading-[1.25] md:leading-[45px] text-[var(--foreground)] w-full font-normal text-[32px] sm:text-[40px] md:text-[48px] text-center">
              {t('problem.title')}
            </h2>
          </motion.div>

          {/* Text blocks */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 md:gap-[24px] w-full"
          >
            <p className="leading-[1.625] md:leading-[29.25px] text-[var(--muted-foreground)] text-[16px] md:text-[18px] w-full text-center">
              {t('problem.text1')}
            </p>
            <p className="leading-[1.625] md:leading-[29.25px] text-[var(--muted-foreground)] text-[16px] md:text-[18px] w-full text-center">
              {t('problem.text2')}
            </p>
            <p className="leading-[1.625] md:leading-[29.25px] text-[var(--muted-foreground)] text-[16px] md:text-[18px] w-full text-center">
              {t('problem.text3')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Fraud Detection Demo - Inserted between the two sections */}
      <div className="relative z-10">
        <FraudDetection />
      </div>

      {/* Section 2: The Solution */}
      <div className="w-full flex justify-center py-8 md:py-12 lg:py-20 pb-8 md:pb-12 lg:pb-16 relative z-10 bg-white px-4 md:px-0">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-[48px] w-full max-w-[720px]">
          {/* Big title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full"
          >
            <h2 className="leading-[1.25] md:leading-[45px] text-[var(--foreground)] w-full font-normal text-center text-[32px] sm:text-[40px] md:text-[48px]">
              {t('solution.title')}
            </h2>
          </motion.div>

          {/* Text blocks */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 md:gap-[24px] w-full"
          >
            <p className="leading-[1.625] md:leading-[29.25px] text-[var(--muted-foreground)] text-[16px] md:text-[18px] w-full text-center">
              {t('solution.text1')}
            </p>
            <p className="leading-[1.625] md:leading-[29.25px] text-[var(--muted-foreground)] text-[16px] md:text-[18px] w-full text-center">
              {t('solution.text2')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}