import { motion } from "motion/react";
import bloombergImg from "figma:asset/bfeae2bb031caf3cbf56c7c9119c39c883d70eda.png";
import bnpImg from "figma:asset/9b878b640854b28da2053f558376754c684a5d47.png";
import socGenImg from "figma:asset/3234de6500b48bb5ac6673a64b1fdd3954f38e70.png";
import chanelImg from "figma:asset/75c77145cd47deccd0e92bb0ae831b77552f0914.png";
import lorealImg from "figma:asset/89318317539df0fec5a560c32fb616e0c89cdea0.png";
import { useLanguage } from "../contexts/LanguageContext";

function CompanyLogo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className="flex items-center justify-center flex-shrink-0 px-8 md:px-12">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-8 w-auto object-contain opacity-40 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-300 ${className}`}
      />
    </div>
  );
}

export function Alumni() {
  const { t } = useLanguage();

  const logos = [
    { src: bloombergImg, alt: "Bloomberg" },
    { src: bnpImg, alt: "BNP Paribas" },
    { src: chanelImg, alt: "Chanel" },
    { src: lorealImg, alt: "L'Oreal" },
    { src: socGenImg, alt: "Societe Generale" },
  ];

  return (
    <section 
      id="alumni" 
      className="w-full bg-white py-12 md:py-16 lg:py-20 relative overflow-hidden"
      aria-label="Alumni section"
    >
      <div className="flex flex-col gap-6 md:gap-8 max-w-full w-full px-6 mx-auto">
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

        {/* Infinite scrolling logos container */}
        <div className="relative w-full overflow-hidden">
          <motion.div 
            className="flex items-center"
            animate={{
              x: [0, -1200],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <CompanyLogo 
                key={`logo-1-${index}`}
                src={logo.src} 
                alt={logo.alt} 
              />
            ))}
            {/* Duplicate set for infinite scroll */}
            {logos.map((logo, index) => (
              <CompanyLogo 
                key={`logo-2-${index}`}
                src={logo.src} 
                alt={logo.alt} 
              />
            ))}
            {/* Third set for seamless loop */}
            {logos.map((logo, index) => (
              <CompanyLogo 
                key={`logo-3-${index}`}
                src={logo.src} 
                alt={logo.alt} 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}