import { motion } from "motion/react";
import { ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  background?: string;
  gradient?: string;
  className?: string;
  transitionDuration?: number;
  animateFromBottom?: boolean;
}

export function SectionTransition({ 
  children, 
  background = "transparent",
  gradient,
  className = "",
  transitionDuration = 1.2,
  animateFromBottom = false
}: SectionTransitionProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        y: animateFromBottom ? 40 : 0,
      }}
      whileInView={{ 
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: false, amount: 0.05 }}
      transition={{ 
        duration: transitionDuration, 
        ease: [0.22, 0.61, 0.36, 1], // Custom easing for smooth feel
        opacity: { duration: transitionDuration * 0.8 },
        y: { duration: transitionDuration }
      }}
      className={`relative w-full ${className}`}
      style={{
        background: gradient || background,
      }}
    >
      {/* Noise overlay for texture */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: false }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}