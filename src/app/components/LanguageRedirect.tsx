import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

/**
 * Component that redirects URLs without language prefix to the appropriate language version
 * Example: /test → /fr/test or /en/test (based on browser language)
 */
export function LanguageRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    
    // Determine which language to use (default to 'fr')
    let targetLang: 'fr' | 'en' = 'fr';
    
    if (browserLang.startsWith('en')) {
      targetLang = 'en';
    } else if (browserLang.startsWith('fr')) {
      targetLang = 'fr';
    }
    
    // Check if there's a saved language preference in localStorage
    const savedLang = localStorage.getItem('preferredLanguage') as 'fr' | 'en' | null;
    if (savedLang === 'fr' || savedLang === 'en') {
      targetLang = savedLang;
    }
    
    // Build the new URL with language prefix
    const currentPath = location.pathname;
    const search = location.search;
    const hash = location.hash;
    
    // Redirect to the language-prefixed version
    const newPath = `/${targetLang}${currentPath}${search}${hash}`;
    
    console.log(`Redirecting from ${currentPath} to ${newPath}`);
    navigate(newPath, { replace: true });
  }, [navigate, location]);

  // Show nothing while redirecting
  return null;
}
