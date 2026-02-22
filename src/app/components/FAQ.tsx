import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function FAQItem({ number, question, answer }: { number: string; question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[var(--border)] py-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-start justify-between">
                <div className="flex gap-8 items-start">
                    <span className="font-mono text-sm tracking-widest pt-1 text-[var(--foreground)]">{number}</span>
                    <h3 className="font-mono text-lg uppercase tracking-tight max-w-2xl text-[var(--foreground)]">{question}</h3>
                </div>
                <motion.div 
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="size-6 border border-[var(--border)] rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm"
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
                        <p className="pl-16 mt-4 text-[var(--muted-foreground)] font-sans max-w-2xl text-sm leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQ() {
  return (
    <div className="bg-transparent py-32 px-[351px]">
        <div className="text-center mb-16">
            <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-[60px] leading-[54px] mb-4 text-[var(--foreground)]">Frequently Asked<br/>Questions</h2>
            <p className="font-['Instrument_Serif:Italic',sans-serif] italic text-[30px] text-[var(--foreground)]">For Agencies & Tenants</p>
        </div>

        <div className="flex flex-col border-t border-[var(--border)] backdrop-blur-[2px]">
            <FAQItem 
                number="01" 
                question="How does Luuzon protect my personal data?" 
                answer="We use bank-grade encryption (AES-256) and strictly adhere to GDPR. Your data is encrypted at rest and in transit. Crucially, agencies only see your verified status unless you explicitly grant full access." 
            />
            <FAQItem 
                number="02" 
                question="What happens if there is a data breach?" 
                answer="Our decentralized architecture ensures that even in the unlikely event of a breach, attackers would only find fragmented, encrypted shards that are useless without your private key." 
            />
            <FAQItem 
                number="03" 
                question="How much does Luuzon cost for agencies?" 
                answer="We offer flexible pricing tiers starting with a free usage tier. Enterprise plans include API access and bulk verification discounts." 
            />
            <FAQItem 
                number="04" 
                question="Is Luuzon free for tenants?" 
                answer="Yes! Tenants can create a Verified Passport for free. We believe proving your trustworthiness shouldn't cost you money." 
            />
            <FAQItem 
                number="05" 
                question="How does the AI verification process work?" 
                answer="Our proprietary AI analyzes document metadata, cross-references income with bank statements, and checks global fraud databases instantly." 
            />
            <FAQItem 
                number="06" 
                question="How long does verification take?" 
                answer="Typically under 30 seconds. In rare complex cases, a manual review might take up to 2 hours." 
            />
            <FAQItem 
                number="07" 
                question="What if the AI flags my documents incorrectly?" 
                answer="You can request a manual review immediately. Our human compliance team will re-evaluate your documents within 24 hours." 
            />
            <FAQItem 
                number="08" 
                question="Can agencies see my full documents?" 
                answer="By default, no. They see a 'Verified' status. You can choose to share the actual files if required for the final lease signing." 
            />
        </div>

        <div className="text-center mt-16 font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
            More questions? <a href="#" className="underline font-bold text-[var(--foreground)] hover:text-[var(--brand-coral)] transition-colors">Contact A FOUNDER</a>
        </div>
    </div>
  );
}
