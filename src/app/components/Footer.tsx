import image_8d886dd08d3256a6ef465ae1a77cdd59a2ee835b from 'figma:asset/8d886dd08d3256a6ef465ae1a77cdd59a2ee835b.png'
import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Smile, Mail, Linkedin, Instagram } from "lucide-react";
import imgImageLuuzonLogo from "figma:asset/e63cb367c32f14aac3dc78f143344c930f915ff1.png";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <footer className="w-full px-4 md:px-8 pb-8 pt-0 font-sans">
      <div className="max-w-[1200px] mx-auto bg-black rounded-3xl px-6 md:px-[64px] py-8 md:py-[40px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
          
          {/* Left Column - Title & Language */}
          <div className="lg:col-span-1">
            <h2 
              className="text-white text-[28px] sm:text-[32px] md:text-[42px] lg:text-[48px] leading-[1.1] py-4 md:py-[25px]"
              style={{ fontFamily: 'Instrument Serif, serif' }}
            >
              {t('footer.title')}
            </h2>
            
            {/* Language Switcher */}
            <div className="flex gap-2 mt-4 md:mt-6">
              <button 
                onClick={() => setLanguage('en')}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border transition-all flex items-center justify-center text-xs sm:text-sm font-bold ${
                  language === 'en' 
                    ? 'border-gray-700 bg-gray-800 text-white' 
                    : 'border-gray-700 bg-transparent text-gray-600 hover:bg-gray-800 hover:text-white hover:border-gray-600'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('fr')}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border transition-all flex items-center justify-center text-xs sm:text-sm font-bold ${
                  language === 'fr' 
                    ? 'border-gray-700 bg-gray-800 text-white' 
                    : 'border-gray-700 bg-transparent text-gray-600 hover:bg-gray-800 hover:text-white hover:border-gray-600'
                }`}
                aria-label="Switch to French"
              >
                FR
              </button>
            </div>
          </div>

          {/* Middle Column - Now Empty */}
          <div className="hidden lg:block">
            {/* This space is left empty as requested */}
          </div>

          {/* Right Column - Support & Logo */}
          <div className="relative py-[5px] flex flex-col justify-between">
            <div>
              <h3 
                className="text-white text-sm font-bold mb-6"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {t('footer.support')}
              </h3>
              <div className="flex flex-col gap-3 mb-8">
                <Link to={`/${language}/manifesto`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.manifesto')}
                </Link>
                <a href="https://www.cal.eu/luuzon/30min" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.contact')}
                </a>
              </div>
            </div>

            {/* Logo relocated here */}
            <div className="flex lg:justify-end">
              <img
                src={image_8d886dd08d3256a6ef465ae1a77cdd59a2ee835b}
                alt="Luuzon Logo"
                loading="lazy"
                className="h-12 md:h-16 w-auto object-contain mx-[160px] my-[0px]"
              />
            </div>
          </div>
        </div>

        {/* Social Icons at Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-800">
          <div className="flex gap-6">
            <Link to="https://instagram.com/luuzon" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link to="https://twitter.com/luuzon" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
            <Link to="https://linkedin.com/company/luuzon" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-gray-600 text-xs">
            <Link to={`/${language}/privacy`} className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link to={`/${language}/legal`} className="hover:text-white transition-colors">{t('footer.legal')}</Link>
            <span style={{ fontFamily: 'DM Sans, sans-serif' }}>{t('footer.copyright')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
