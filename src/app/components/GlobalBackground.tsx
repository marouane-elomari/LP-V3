import React from 'react';
import { motion } from 'motion/react';

// High-resolution noise texture
// Increased baseFrequency for finer "8k" grain
// Using a larger pattern size to reduce repetition artifacts
const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`;

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
      {/* 
        High-Res Organic Background
        Adjusted for "Dezoomed" look (smaller orbs, more negative space)
        Clearer Colors: Adjusted opacities and sizes to reduce muddy overlap
      */}

      {/* Lavender Orb - Top Left */}
      <motion.div
        className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full blur-[100px] mix-blend-multiply"
        style={{ backgroundColor: '#B8A8FE', opacity: 0.6 }} // Increased opacity for clarity
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Coral Orb - Top Right */}
      <motion.div
        className="absolute top-[-10%] right-[-15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[90px] mix-blend-multiply"
        style={{ backgroundColor: '#FE9170', opacity: 0.55 }} // Clearer color
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sky Orb - Bottom Left */}
      <motion.div
        className="absolute bottom-[-20%] left-[-5%] w-[60vw] h-[50vw] max-w-[900px] max-h-[700px] rounded-full blur-[100px] mix-blend-multiply"
        style={{ backgroundColor: '#C9E4FF', opacity: 0.6 }} // Increased opacity
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.7, 0.6],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 
        Ultra-High Res Noise Overlay 
        Opacity at 12% for a crisp, visible but not overwhelming grain
      */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.12]"
        style={{ backgroundImage: noiseBg, backgroundSize: '400px 400px' }} 
      />
      
      {/* 
        Vignette / Softening Overlay
        Helps focus the eye and cleans up the edges for that "Studio" feel 
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/40 z-0 mix-blend-normal pointer-events-none" />
    </div>
  );
}
