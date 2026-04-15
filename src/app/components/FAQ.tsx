import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

function FAQItem({ number, question, answer }: { number: string; question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[var(--border)] py-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 md:gap-8 items-start flex-1">
                    <span className="font-mono text-xs md:text-sm tracking-widest pt-1 text-[var(--foreground)] shrink-0">{number}</span>
                    <h3 className="font-mono text-sm md:text-lg uppercase tracking-tight max-w-2xl text-[var(--foreground)] break-words">{question}</h3>
                </div>
                <motion.div 
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="size-6 border border-[var(--border)] rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm shrink-0"
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" className="text-[var(--foreground)]">
                        <path d="M5 1V9M1 5H9" strokeWidth="1" />
                    </svg>
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pl-8 md:pl-16 mt-4 text-[var(--muted-foreground)] font-sans max-w-2xl text-sm leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQ() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-transparent py-12 md:py-16 lg:py-32 px-4 md:px-8 lg:px-[120px] xl:px-[351px]">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] leading-[1.1] md:leading-[54px] mb-4 text-[var(--foreground)]">
              <span className="italic">{t('faq.heading')}</span>
            </h2>
            <p className="italic text-[18px] sm:text-[20px] md:text-[24px] lg:text-[30px] text-[var(--foreground)]" style={{ fontFamily: 'Instrument Serif, serif' }}>
              {t('faq.subtitle')}
            </p>
        </div>

        <div className="flex flex-col border-t border-[var(--border)] backdrop-blur-[2px]">
            <FAQItem 
                number="01" 
                question={t('faq.question1')}
                answer={t('faq.answer1')}
            />
            <FAQItem 
                number="02" 
                question={t('faq.question2')}
                answer={t('faq.answer2')}
            />
            <FAQItem 
                number="03" 
                question={t('faq.question3')}
                answer={t('faq.answer3')}
            />
            <FAQItem 
                number="04" 
                question={t('faq.question4')}
                answer={t('faq.answer4')}
            />
            <FAQItem 
                number="05" 
                question={t('faq.question5')}
                answer={t('faq.answer5')}
            />
            <FAQItem 
                number="06" 
                question={t('faq.question6')}
                answer={t('faq.answer6')}
            />
            <FAQItem 
                number="07" 
                question={t('faq.question7')}
                answer={t('faq.answer7')}
            />
            <FAQItem 
                number="08" 
                question={t('faq.question8')}
                answer={t('faq.answer8')}
            />
        </div>

        <div className="text-center mt-12 md:mt-16 text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
            {t('faq.moreQuestions')} <a href="https://www.cal.eu/luuzon/30min" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[var(--foreground)] hover:text-[var(--brand-coral)] transition-colors">{t('faq.contactUs')}</a>
        </div>
    </div>
  );
}