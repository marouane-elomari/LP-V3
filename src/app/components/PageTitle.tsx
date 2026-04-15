import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PageTitleProps {
  titleKey: string;
}

export function PageTitle({ titleKey }: PageTitleProps) {
  const { t } = useLanguage();
  
  useEffect(() => {
    if (t) {
      document.title = t(titleKey);
    }
  }, [t, titleKey]);

  return null;
}