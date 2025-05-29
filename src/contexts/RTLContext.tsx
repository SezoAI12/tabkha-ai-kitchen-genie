
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RTLContextType {
  language: string;
  setLanguage: (lang: string) => void;
  direction: 'ltr' | 'rtl';
  isRTL: boolean;
  setRTL: (value: boolean) => void;
  t: (englishText: string, arabicText?: string, turkishText?: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

interface RTLProviderProps {
  children: ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const setRTL = (value: boolean) => {
    const newLang = value ? 'ar' : 'en';
    setLanguage(newLang);
  };

  const t = (englishText: string, arabicText: string = '', turkishText: string = '') => {
    switch (language) {
      case 'ar':
        return arabicText || englishText;
      case 'tr':
        return turkishText || englishText;
      default:
        return englishText;
    }
  };

  return (
    <RTLContext.Provider value={{ language, setLanguage, direction, isRTL, setRTL, t }}>
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = () => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
