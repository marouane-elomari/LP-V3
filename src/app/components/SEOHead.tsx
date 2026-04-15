import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import faviconImage from 'figma:asset/3cddebbdbd734a089e218a992c0a4c8653cac1dc.png';

interface SEOHeadProps {
  titleKey: string;
  descriptionKey: string;
  canonicalPath?: string;
  imageUrl?: string;
  type?: 'website' | 'article';
  keywords?: string;
}

export function SEOHead({ 
  titleKey, 
  descriptionKey, 
  canonicalPath = '',
  imageUrl = 'https://luuzon.com/og-image.png',
  type = 'website',
  keywords
}: SEOHeadProps) {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    if (!t) return;

    const title = t(titleKey);
    const description = t(descriptionKey);
    const url = `https://luuzon.com/${language}${canonicalPath}`;
    
    // Set document title
    document.title = title;
    
    // Set or update meta tags
    const setMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}=\"${name}\"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    
    // Set favicon
    const setFavicon = () => {
      // Remove existing favicons
      const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
      existingFavicons.forEach(favicon => favicon.remove());
      
      // Add new favicon
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.href = faviconImage;
      document.head.appendChild(favicon);
      
      // Add apple touch icon
      const appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      appleTouchIcon.href = faviconImage;
      document.head.appendChild(appleTouchIcon);
    };
    
    setFavicon();

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords || t('seo.keywords'));
    setMetaTag('author', 'Luuzon');
    setMetaTag('robots', 'index, follow');
    
    // Language and locale
    setMetaTag('language', language === 'fr' ? 'French' : 'English');
    document.documentElement.lang = language;
    
    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', url, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:image', imageUrl, true);
    setMetaTag('og:locale', language === 'fr' ? 'fr_FR' : 'en_US', true);
    setMetaTag('og:site_name', 'Luuzon', true);
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', imageUrl);
    
    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    
    // Alternate language links
    let alternateFr = document.querySelector('link[hreflang="fr"]') as HTMLLinkElement;
    let alternateEn = document.querySelector('link[hreflang="en"]') as HTMLLinkElement;
    let alternateDefault = document.querySelector('link[hreflang="x-default"]') as HTMLLinkElement;
    
    if (!alternateFr) {
      alternateFr = document.createElement('link');
      alternateFr.rel = 'alternate';
      alternateFr.hreflang = 'fr';
      document.head.appendChild(alternateFr);
    }
    alternateFr.href = `https://luuzon.com/fr${canonicalPath}`;
    
    if (!alternateEn) {
      alternateEn = document.createElement('link');
      alternateEn.rel = 'alternate';
      alternateEn.hreflang = 'en';
      document.head.appendChild(alternateEn);
    }
    alternateEn.href = `https://luuzon.com/en${canonicalPath}`;
    
    if (!alternateDefault) {
      alternateDefault = document.createElement('link');
      alternateDefault.rel = 'alternate';
      alternateDefault.hreflang = 'x-default';
      document.head.appendChild(alternateDefault);
    }
    alternateDefault.href = `https://luuzon.com/fr${canonicalPath}`;
    
    // Sitemap link
    let sitemap = document.querySelector('link[type="application/xml"][rel="sitemap"]') as HTMLLinkElement;
    if (!sitemap) {
      sitemap = document.createElement('link');
      sitemap.rel = 'sitemap';
      sitemap.type = 'application/xml';
      sitemap.title = 'Sitemap';
      document.head.appendChild(sitemap);
    }
    sitemap.href = 'https://luuzon.com/sitemap.xml';
    
  }, [t, titleKey, descriptionKey, language, canonicalPath, imageUrl, type, keywords]);

  return null;
}