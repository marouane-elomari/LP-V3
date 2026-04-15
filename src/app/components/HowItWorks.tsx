import { motion } from "motion/react";
import { ArrowRight, Upload, FileSearch, CheckCircle, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col items-start pl-4 border-l border-[var(--border)] h-full justify-center w-full"
    >
      <p className="text-[32px] md:text-[48px] text-[var(--foreground)] leading-none" style={{ fontFamily: 'Instrument Serif, serif' }}>{value}</p>
      <p className="text-[var(--muted-foreground)] text-[10px] md:text-[12px] uppercase tracking-[1.2px] mt-2 font-semibold">{label}</p>
    </motion.div>
  );
}

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.desc'),
      icon: Upload,
      accent: "#B8A8FE"
    },
    {
      number: "02",
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.desc'),
      icon: Sparkles,
      accent: "#C9E4FF"
    },
    {
      number: "03",
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.desc'),
      icon: CheckCircle,
      accent: "#cf3c7e"
    }
  ];

  const stats = [
    { value: t('howItWorks.stat1.value'), label: t('howItWorks.stat1.label') },
    { value: t('howItWorks.stat2.value'), label: t('howItWorks.stat2.label') },
    { value: t('howItWorks.stat3.value'), label: t('howItWorks.stat3.label') },
    { value: t('howItWorks.stat4.value'), label: t('howItWorks.stat4.label') },
  ];

  return (
    <div id="how-it-works" className="w-full bg-transparent py-12 md:py-16 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-500 mb-4 md:mb-6 border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-[#cf3c7e]"></span>
              <span className="text-xs font-bold uppercase tracking-widest">{t('howItWorks.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#0a0a0a] mb-4 md:mb-6 leading-tight px-4" style={{ fontFamily: 'Instrument Serif, serif' }}>
              {t('howItWorks.title1')} <br className="hidden sm:block"/>
              <span className="italic text-[#cf3c7e]" style={{ fontFamily: 'Instrument Serif, serif' }}>{t('howItWorks.title2')}</span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto px-4">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative group"
              >
                {/* Step Marker */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center bg-white border border-gray-100 shadow-xl shadow-gray-100 mb-8 group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: 'white' }} 
                  >
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-opacity-10" style={{ backgroundColor: `${step.accent}20` }}>
                      <step.icon className="w-8 h-8" style={{ color: index === 2 ? '#cf3c7e' : '#0a0a0a' }} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4">
                    <h3 className="font-serif-display text-2xl text-[#0a0a0a] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow (Desktop) - Decorative only between items */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 translate-x-1/2 z-0">
                    
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-32"
        >
          {/* Staggered Editorial Layout */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-24 gap-x-8 lg:gap-x-16">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  className="relative"
                  style={{
                    marginTop: index % 2 === 1 ? '48px' : '0px', // Stagger every other stat
                  }}
                >
                  {/* Minimal vertical line accent */}
                  <div 
                    className="absolute -left-4 top-0 w-px h-16 opacity-20"
                    style={{
                      background: [
                        '#cf3c7e', // Pink
                        '#C9E4FF', // Sky Mist  
                        '#B8A8FE', // Lavender Haze
                        '#cf3c7e', // Pink
                      ][index % 4]
                    }}
                  />
                  
                  <div className="flex flex-col gap-3">
                    <div 
                      className="text-6xl lg:text-7xl text-black leading-none"
                      style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}
                    >
                      {stat.value}
                    </div>
                    <div 
                      className="text-[9px] uppercase tracking-[0.2em] text-gray-400"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}