import { motion } from "motion/react";
import bloombergImg from "figma:asset/bfeae2bb031caf3cbf56c7c9119c39c883d70eda.png";
import bnpImg from "figma:asset/9b878b640854b28da2053f558376754c684a5d47.png";
import socGenImg from "figma:asset/3234de6500b48bb5ac6673a64b1fdd3954f38e70.png";
import chanelImg from "figma:asset/75c77145cd47deccd0e92bb0ae831b77552f0914.png";
import lorealImg from "figma:asset/89318317539df0fec5a560c32fb616e0c89cdea0.png";
import { useLanguage } from "../contexts/LanguageContext";

function CompanyLogo({ src, alt, delay, className = "" }: { src: string; alt: string; delay: number; className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-center"
    >
      <img 
        src={src} 
        alt={alt} 
        className={`h-8 w-auto object-contain opacity-40 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-300 ${className}`}
      />
    </motion.div>
  );
}

export function Alumni() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full flex justify-center py-16 relative z-10 border-t border-[var(--border)]">
      <div className="flex flex-col gap-8 max-w-4xl w-full px-6">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <p 
            className="text-gray-600 text-xs tracking-widest uppercase text-center"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {t('alumni.title')}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
          <CompanyLogo 
            src={bloombergImg} 
            alt="Bloomberg" 
            delay={0.1} 
          />
          <CompanyLogo 
            src={bnpImg} 
            alt="BNP Paribas" 
            delay={0.15}
          />
          <CompanyLogo 
            src={chanelImg} 
            alt="Chanel" 
            delay={0.2} 
          />
          <CompanyLogo 
            src={lorealImg} 
            alt="L'Oreal" 
            delay={0.25} 
          />
          <CompanyLogo 
            src={socGenImg} 
            alt="Societe Generale" 
            delay={0.3} 
          />
        </div>
      </div>
    </div>
  );
}