import { motion } from "motion/react";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useLanguage } from "../contexts/LanguageContext";
import { SEOHead } from "./SEOHead";
import { PageTitle } from "./PageTitle";

export function Manifesto() {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-transparent min-h-screen w-full flex flex-col">
      <SEOHead 
        titleKey="page.title.manifesto" 
        descriptionKey="page.description.manifesto"
        canonicalPath="/manifesto"
        type="article"
      />
      <div className="relative">
        <Navbar />
      </div>
      
      <main className="flex-grow w-full max-w-[800px] mx-auto px-4 md:px-6 py-8 sm:py-12 md:py-20 relative z-10" style={{ marginTop: "100px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-transparent p-5 sm:p-6 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8 sm:mb-12 md:mb-16 pb-6 md:pb-8 border-b border-black flex flex-col sm:flex-row justify-between items-start gap-4 bg-[#fff9f900]">
            <div>
              <div className="text-[9px] uppercase tracking-widest mb-3 sm:mb-4 text-[#000000]" style={{ fontFamily: 'monospace' }}>
                {t('manifesto2026.publicManifesto')}
              </div>
              <h1 className="italic leading-tight text-[var(--foreground)] text-[#0f172a] text-left text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px]" style={{ fontFamily: 'Instrument Serif, serif' }}>{t('manifesto2026.title1')}<br /><span style={{ color: "#cf3c7e", fontFamily: 'Instrument Serif, serif' }}>
  {t('manifesto2026.title2')}
</span></h1>
            </div>
            <div className="text-[9px] uppercase tracking-widest text-right text-[#000000]" style={{ fontFamily: 'monospace' }}>
              {t('manifesto2026.year')}
            </div>
          </div>

          {/* Intro */}
          <div className="text-base sm:text-lg md:text-xl leading-relaxed mb-12 md:mb-16">
            <p>{t('manifesto2026.intro')}</p>
          </div>

          <hr className="border-none h-[1px] bg-black my-10 md:my-14 rounded-[5px]" />

          {/* Blog Content */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            
            {/* Section I — The Broken System */}
            <article>
              <div className="text-[9px] uppercase tracking-widest mb-3 text-[#000000]" style={{ fontFamily: 'monospace' }}>
                {t('manifesto2026.section1.number')}
              </div>
              <h2 className="italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--foreground)] mb-4 md:mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
                {t('manifesto2026.section1.title1')}<br />
                <span style={{ color: "#cf3c7e", fontFamily: 'Instrument Serif, serif' }}>{t('manifesto2026.section1.title2')}</span>
              </h2>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>{t('manifesto2026.section1.p1')}</p>
                <p>{t('manifesto2026.section1.p2')}</p>
                <div className="border-l-[3px] border-[var(--foreground)] pl-7 py-1 my-8 text-lg sm:text-xl md:text-2xl italic text-[var(--foreground)]">
                  {t('manifesto2026.section1.pull')}
                </div>
                <p>{t('manifesto2026.section1.p3')}</p>
              </div>
            </article>

            <hr className="border-none h-[1px] bg-black my-10 md:my-14 rounded-[5px]" />

            {/* Section II — The Historical Shift */}
            <article>
              <div className="text-[9px] uppercase tracking-widest text-black-400 mb-3" style={{ fontFamily: 'monospace' }}>
                {t('manifesto2026.section2.number')}
              </div>
              <h2 className="italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--foreground)] mb-4 md:mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
                {t('manifesto2026.section2.title1')}<br />
                <span style={{ color: "#cf3c7e", fontFamily: 'Instrument Serif, serif' }}>{t('manifesto2026.section2.title2')}</span>
              </h2>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>{t('manifesto2026.section2.p1')}</p>
                <p>{t('manifesto2026.section2.p2')}</p>
                <p>{t('manifesto2026.section2.p3')}</p>
                <p>{t('manifesto2026.section2.p4')}</p>
              </div>
            </article>

            <hr className="border-none h-[1px] bg-black my-10 md:my-14 rounded-[5px]" />

            {/* Section III — What We Built */}
            <article>
              <div className="text-[9px] uppercase tracking-widest mb-3 text-[#000000]" style={{ fontFamily: 'monospace' }}>
                {t('manifesto2026.section3.number')}
              </div>
              <h2 className="italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--foreground)] mb-4 md:mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
                {t('manifesto2026.section3.title1')}<br />
                <span style={{ color: "#cf3c7e", fontFamily: 'Instrument Serif, serif' }}>{t('manifesto2026.section3.title2')}</span>
              </h2>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>{t('manifesto2026.section3.p1')}</p>
                
                {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 my-8 md:my-12 bg-[#ffffff8f] border border-gray-200 rounded-[5px] overflow-hidden shadow-sm">
                    {/* KPI 1 */}
                    <div className="flex flex-col items-center justify-center p-8 text-center sm:border-r border-gray-200">
                      <div className="text-3xl md:text-4xl font-bold mb-2 text-[#000000]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section3.stat1')}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section3.stat1Label')}
                      </div>
                    </div>
                  
                    {/* KPI 2 */}
                    <div className="flex flex-col items-center justify-center p-8 text-center sm:border-r border-gray-200">
                      <div className="text-3xl md:text-4xl font-bold mb-2 text-[#000000]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section3.stat2')}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section3.stat2Label')}
                      </div>
                    </div>
                  
                    {/* KPI 3 */}
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="text-3xl md:text-4xl font-bold mb-2 text-[#000000]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section3.stat3')}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section3.stat3Label')}
                      </div>
                    </div>
                  </div>

                <p>{t('manifesto2026.section3.p2')}</p>
              </div>
            </article>

            <hr className="border-none h-[1px] bg-black my-10 md:my-14 rounded-[5px]" />

            {/* Section IV — What This Means for You */}
            <article>
              <div className="text-[9px] uppercase tracking-widest mb-3 text-[#000000]" style={{ fontFamily: 'monospace' }}>
                {t('manifesto2026.section4.number')}
              </div>
              <h2 className="italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--foreground)] mb-4 md:mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
                {t('manifesto2026.section4.title1')}<br />
                <span style={{ color: "#cf3c7e", fontFamily: 'Instrument Serif, serif' }}>{t('manifesto2026.section4.title2')}</span>
              </h2>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>{t('manifesto2026.section4.p1')}</p>
                
                {/* Declaration Block */}
                <div className="bg-[var(--foreground)] text-white p-5 md:p-11 my-8 md:my-12 space-y-3 text-base md:text-lg leading-relaxed rounded-[5px]">
                  <p>{t('manifesto2026.section4.declaration1')}</p>
                  <p>{t('manifesto2026.section4.declaration2')}</p>
                  <p>{t('manifesto2026.section4.declaration3')}</p>
                  <p>{t('manifesto2026.section4.declaration4')}</p>
                  <p className="mb-0">{t('manifesto2026.section4.declaration5')}</p>
                </div>

                <p>{t('manifesto2026.section4.p2')}</p>
              </div>
            </article>

            <hr className="border-none h-[1px] bg-black my-10 md:my-14 rounded-[5px]" />

            {/* Section V — Where This Goes */}
            <article>
              <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: 'monospace' }}>
                {t('manifesto2026.section5.number')}
              </div>
              <h2 className="italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--foreground)] mb-4 md:mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
                {t('manifesto2026.section5.title1')}<br />
                <span style={{ color: "#cf3c7e", fontFamily: 'Instrument Serif, serif' }}>{t('manifesto2026.section5.title2')}</span>
              </h2>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>{t('manifesto2026.section5.p1')}</p>
                
                {/* Phase List */}
                <div className="grid gap-4 my-6 md:my-8 bg-[#ffffff8f] border border-gray-200 rounded-[5px] overflow-hidden shadow-sm p-2">
                  {/* Phase 01 */}
                  <div className="bg-transparent p-5 md:p-6 grid grid-cols-[40px_1fr] gap-4 border-b border-gray-100 last:border-b-0">
                    <div className="pt-1 text-[14px] text-[#000000]" style={{ fontFamily: '"DM Sans", sans-serif' }}>01</div>
                    <div>
                      <div className="font-bold text-sm mb-1 text-black" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section5.phase1Title')}
                      </div>
                      <p className="text-xs text-gray-500 m-0 leading-relaxed" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section5.phase1Desc')}
                      </p>
                    </div>
                  </div>
                
                  {/* Phase 02 */}
                  <div className="bg-transparent p-5 md:p-6 grid grid-cols-[40px_1fr] gap-4 border-b border-gray-100 last:border-b-0">
                    <div className="pt-1 text-[14px] text-[#000000]" style={{ fontFamily: '"DM Sans", sans-serif' }}>02</div>
                    <div>
                      <div className="font-bold text-sm mb-1 text-black" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section5.phase2Title')}
                      </div>
                      <p className="text-xs text-gray-500 m-0 leading-relaxed" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section5.phase2Desc')}
                      </p>
                    </div>
                  </div>
                
                  {/* Phase 03 */}
                  <div className="bg-transparent p-5 md:p-6 grid grid-cols-[40px_1fr] gap-4 border-b border-gray-100 last:border-b-0">
                    <div className="text-[11px] text-gray-400 pt-1" style={{ fontFamily: '"DM Sans", sans-serif' }}>03</div>
                    <div>
                      <div className="font-bold text-sm mb-1 text-black" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section5.phase3Title')}
                      </div>
                      <p className="text-xs text-gray-500 m-0 leading-relaxed" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section5.phase3Desc')}
                      </p>
                    </div>
                  </div>
                
                  {/* Phase 04 */}
                  <div className="bg-transparent p-5 md:p-6 grid grid-cols-[40px_1fr] gap-4">
                    <div className="text-[11px] text-gray-400 pt-1" style={{ fontFamily: '"DM Sans", sans-serif' }}>04</div>
                    <div>
                      <div className="font-bold text-sm mb-1 text-black" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section5.phase4Title')}
                      </div>
                      <p className="text-xs text-gray-500 m-0 leading-relaxed" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {t('manifesto2026.section5.phase4Desc')}
                      </p>
                    </div>
                  </div>
                </div>

                <p>{t('manifesto2026.section5.p2')}</p>
                
                <div className="border-l-[3px] border-[var(--foreground)] pl-7 py-1 my-8 text-lg sm:text-xl md:text-2xl italic text-[var(--foreground)]">
                  {t('manifesto2026.section5.pull')}
                </div>
              </div>
            </article>

          </div>

          {/* Closing Statement */}
          <div className="mt-12 sm:mt-16 md:mt-20 pt-8 md:pt-10 border-t border-gray-200">
            <h2 className="italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[var(--foreground)] mb-6 md:mb-7" style={{ fontFamily: 'Instrument Serif, serif' }}>
              {t('manifesto2026.closing.title1')}<br />
              <span style={{ color: "#cf3c7e", fontFamily: 'Instrument Serif, serif' }}>{t('manifesto2026.closing.title2')}</span>
            </h2>
            <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4 mb-8">
              <p>{t('manifesto2026.closing.p1')}</p>
              <p>{t('manifesto2026.closing.p2')}</p>
            </div>
            <div className="flex justify-center">
              <a
                href="https://www.cal.eu/luuzon/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[var(--foreground)] text-white px-7 py-4 font-semibold text-sm tracking-wide cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {t('manifesto2026.closing.cta')}
              </a>
            </div>
            <div className="mt-16 md:mt-20 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'monospace' }}>
              <span className="text-[#181a1e] text-[#16181b] text-[#0b0b0b] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000]">{t('manifesto2026.footer.site')}</span>
              <span>{t('manifesto2026.footer.tagline')}</span>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}