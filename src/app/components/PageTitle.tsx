import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PageTitleProps {
  titleKey: string;
}

export function PageTitle({ titleKey }: PageTitleProps) {
  const context = useLanguage();
  
  useEffect(() => {
    if (context?.t) {
      document.title = context.t(titleKey);
    }
  }, [context, titleKey]);

  return null;
}