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
  transitionDuration = 0.6,
  animateFromBottom = false
}: SectionTransitionProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: animateFromBottom ? 30 : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: transitionDuration,
        ease: [0.22, 0.61, 0.36, 1],
        opacity: { duration: transitionDuration * 0.8 },
        y: { duration: transitionDuration }
      }}
      className={`relative w-full ${className}`}
      style={{
        background: gradient || background,
      }}
    >
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
