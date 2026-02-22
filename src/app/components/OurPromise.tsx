import { motion } from "motion/react";
import bloombergImg from "figma:asset/bfeae2bb031caf3cbf56c7c9119c39c883d70eda.png";
import bnpImg from "figma:asset/9b878b640854b28da2053f558376754c684a5d47.png";
import socGenImg from "figma:asset/3234de6500b48bb5ac6673a64b1fdd3954f38e70.png";
import chanelImg from "figma:asset/75c77145cd47deccd0e92bb0ae831b77552f0914.png";
import lorealImg from "figma:asset/89318317539df0fec5a560c32fb616e0c89cdea0.png";

function CompanyLogo({ src, alt, delay, className = "" }: { src: string; alt: string; delay: number; className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-center px-4"
    >
      <img 
        src={src} 
        alt={alt} 
        className={`h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 ${className}`}
      />
    </motion.div>
  );
}

export function OurPromise() {
  return (
    <div className="w-full flex justify-center py-20 relative z-10 bg-transparent">
      <div className="flex flex-col gap-[48px] w-[583.995px]">
        {/* Paragraph 1 - Big Serif */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full"
        >
          <p className="font-['Instrument_Serif:Regular',sans-serif] leading-[45px] text-[var(--foreground)] text-[36px] w-[562px]">
            In a time when every lease feels like a gamble, when agencies drown in paperwork and tenants fear for their deposits, we have lost the trust that makes a home.
          </p>
        </motion.div>

        {/* Container 1 - Text blocks */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-[24px] w-full"
        >
          <p className="font-['Arial:Regular',sans-serif] leading-[29.25px] text-[var(--muted-foreground)] text-[18px] w-[543px]">
            The market is broken. Agencies are overwhelmed by manual checks and fraud risks. Honest tenants struggle with opaque processes.
          </p>
          <p className="font-['Arial:Regular',sans-serif] leading-[29.25px] text-[var(--muted-foreground)] text-[18px] w-[542px]">
            Luuzon is the bridge. An intelligent CRM for professionals, and a verified passport for tenants.
          </p>
        </motion.div>

        {/* Container 2 - Social Proof */}
        <div className="flex flex-col gap-[32px] w-full pt-[32.901px] relative">
          <div aria-hidden="true" className="absolute border-[var(--border)] border-solid border-t-[0.906px] inset-0 pointer-events-none top-0" />
          
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
          >
            <p className="font-['Arial:Bold',sans-serif] text-[var(--muted-foreground)] text-[14px] tracking-[1.4px] uppercase text-center w-full">
              Built by alumni of:
            </p>
          </motion.div>

          <div className="flex flex-nowrap justify-between items-center w-[180%] -ml-[40%] opacity-80 hover:opacity-100 transition-opacity duration-500">
            <CompanyLogo 
              src={bloombergImg} 
              alt="Bloomberg" 
              delay={0.1} 
              className="h-10"
            />
            <CompanyLogo 
              src={bnpImg} 
              alt="BNP Paribas" 
              delay={0.2}
              className="h-12" 
            />
            <CompanyLogo 
              src={chanelImg} 
              alt="Chanel" 
              delay={0.3} 
            />
            <CompanyLogo 
              src={lorealImg} 
              alt="L'Oreal" 
              delay={0.4} 
            />
            <CompanyLogo 
              src={socGenImg} 
              alt="Societe Generale" 
              delay={0.5} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
