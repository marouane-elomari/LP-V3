import React from "react";

// Texture de bruit haute résolution (static, no animation)
const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`;

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#F8FBFF]">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .orb-pink {
            animation: orbPink 20s ease-in-out infinite;
          }
          .orb-blue {
            animation: orbBlue 25s ease-in-out infinite;
          }
          .orb-white {
            animation: orbWhite 15s ease-in-out infinite;
          }
        }

        @keyframes orbPink {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.1); }
          66%       { transform: translate(-10px, 20px) scale(0.9); }
        }
        @keyframes orbBlue {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-40px, 30px) scale(1.05); }
          66%       { transform: translate(20px, -30px) scale(0.95); }
        }
        @keyframes orbWhite {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50%       { transform: scale(1.2); opacity: 0.6; }
        }

        /* Disable orb animations on mobile to save GPU */
        @media (max-width: 768px) {
          .orb-pink, .orb-blue, .orb-white {
            animation: none !important;
          }
        }
      `}</style>

      {/* Orb Rose — Haut Gauche */}
      <div
        className="orb-pink absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] rounded-full"
        style={{
          backgroundColor: "#F4A6C4",
          opacity: 0.4,
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />

      {/* Orb Bleu — Bas Droite */}
      <div
        className="orb-blue absolute bottom-[-15%] right-[-5%] w-[70vw] h-[70vw] max-w-[900px] rounded-full"
        style={{
          backgroundColor: "#4A90E2",
          opacity: 0.35,
          filter: "blur(90px)",
          willChange: "transform",
        }}
      />

      {/* Orb Blanc Central */}
      <div
        className="orb-white absolute top-[30%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-white"
        style={{
          opacity: 0.4,
          filter: "blur(70px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Overlay de Bruit (static, no animation) */}
      <div
        className="absolute inset-0 z-10 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: noiseBg,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-100/20 z-0 pointer-events-none" />
    </div>
  );
}
