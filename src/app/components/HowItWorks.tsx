import { motion } from "motion/react";
import svgPaths from "../../imports/svg-80n22t6tee";

function StatItem({ value, label, subtext, delay }: { value: string; label: string; subtext?: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col items-start pl-4 border-l border-[var(--border)] h-full justify-center w-full"
    >
      <p className="font-['Instrument_Serif:Regular',sans-serif] text-[48px] text-[var(--foreground)] leading-none">{value}</p>
      <p className="font-['Arial:Bold',sans-serif] text-[var(--muted-foreground)] text-[12px] uppercase tracking-[1.2px] mt-2">{label}</p>
    </motion.div>
  );
}

function StepCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="w-[389px] relative pt-12"
        >
            <div className="absolute top-0 left-[146px] bg-white rounded-full p-6 shadow-xl border border-[var(--border)] z-10">
                {icon}
            </div>
            <div className="pt-16 px-4">
                <h3 className="font-['Instrument_Serif:Regular',sans-serif] text-[24px] text-center mb-4 text-[var(--foreground)]">{title}</h3>
                <p className="text-center text-[var(--muted-foreground)] text-sm leading-relaxed">{description}</p>
            </div>
        </motion.div>
    )
}

function ConnectingLine() {
    return (
        <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-[48px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent origin-left"
        />
    )
}

export function HowItWorks() {
  return (
    <div className="w-full bg-transparent py-32 relative">
        <div className="max-w-[1365px] mx-auto px-[71px]">
            {/* Header */}
            <div className="text-center mb-24">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[60px] leading-[75px]"
                >
                    <span className="font-['Instrument_Serif:Regular',sans-serif] text-[var(--foreground)]">From application to approval </span>
                    <span className="font-['Instrument_Serif:Italic',sans-serif] italic text-[var(--brand-coral)]">in seconds.</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-[var(--muted-foreground)] text-[18px] max-w-[510px] mx-auto"
                >
                    Automate the heavy lifting. We handle the data, verification, and scoring so you can focus on the decision.
                </motion.p>
            </div>

            {/* Stats Bar */}
            <div className="bg-white/80 backdrop-blur-sm border-y border-[var(--border)] py-12 mb-32 rounded-xl">
                <div className="grid grid-cols-4 gap-8">
                    {[
                        { value: "< 30s", label: "Analysis Time", delay: 0.1 },
                        { value: "99.7%", label: "Fraud Detection", delay: 0.2 },
                        { value: "90%", label: "Time Saved", delay: 0.3 },
                        { value: "0", label: "Manual PDF Reading", delay: 0.4 }
                    ].map((stat, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: stat.delay }}
                            className="flex flex-col items-center justify-center w-full border-l border-[var(--border)]"
                        >
                            <p className="font-['Instrument_Serif:Regular',sans-serif] text-[48px] text-[var(--foreground)] leading-none text-center">{stat.value}</p>
                            <p className="font-['Arial:Bold',sans-serif] text-[var(--muted-foreground)] text-[12px] uppercase tracking-[1.2px] mt-2 text-center">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Steps Flow */}
            <div className="relative">
                <ConnectingLine />
                
                <div className="flex justify-between relative">
                    <StepCard 
                        icon={
                            <div className="size-8 flex items-center justify-center bg-[var(--brand-sky)]/20 rounded-full">
                                <svg className="size-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M16 4V20" strokeLinecap="round" className="text-[var(--foreground)]"/><path d={svgPaths.p6ba600} className="fill-[var(--foreground)]"/><path d={svgPaths.p11fc9000} className="fill-[var(--foreground)]"/>
                                </svg>
                            </div>
                        }
                        title="Tenant Applies"
                        description="Tenants submit their complete dossier through our secure portal or your existing listing channels. All documents are automatically organized and encrypted."
                        delay={0.2}
                    />
                    
                    {/* Arrow 1 */}
                    <div className="absolute left-[33%] top-12 opacity-30">
                        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 0L20 10L10 20" stroke="var(--foreground)" fill="none"/></svg>
                    </div>

                    <StepCard 
                        icon={
                            <div className="size-8 flex items-center justify-center bg-[var(--brand-lavender)]/20 rounded-full">
                                <svg className="size-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M16 26.6V29.3" className="stroke-[var(--foreground)]"/><path d="M16 2.6V5.3" className="stroke-[var(--foreground)]"/><path d={svgPaths.p377df000} className="fill-[var(--foreground)]"/>
                                </svg>
                            </div>
                        }
                        title="AI Analyzes & Scores"
                        description="Our AI engine instantly scans every document for fraud indicators, validates income claims, and generates a comprehensive solvency and trust score within seconds."
                        delay={0.4}
                    />

                    {/* Arrow 2 */}
                    <div className="absolute left-[66%] top-12 opacity-30">
                        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 0L20 10L10 20" stroke="var(--foreground)" fill="none"/></svg>
                    </div>

                    <StepCard 
                        icon={
                            <div className="size-8 flex items-center justify-center bg-[var(--brand-coral)]/10 rounded-full">
                                <svg className="size-8" viewBox="0 0 32 32" fill="none" stroke="var(--brand-coral)" strokeWidth="2">
                                    <path d={svgPaths.p35171e00} className="fill-[var(--brand-coral)]"/><path d={svgPaths.p3c193900} className="fill-[var(--brand-coral)]"/>
                                </svg>
                            </div>
                        }
                        title="You Decide with Confidence"
                        description="Review the AI-generated report, see flagged risks at a glance, and approve or reject applications with data-backed certainty. Then close the deal with integrated e-signature."
                        delay={0.6}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
