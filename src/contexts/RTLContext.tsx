
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RTLContextType {
  isRTL: boolean;
  toggleRTL: () => void;
  direction: 'ltr' | 'rtl';
  language: string;
  setLanguage: (lang: string) => void;
  t: (englishText: string, arabicText?: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

interface RTLProviderProps {
  children: ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleRTL = () => {
    setIsRTL(prev => !prev);
    document.documentElement.dir = isRTL ? 'ltr' : 'rtl';
  };

  const direction: 'ltr' | 'rtl' = isRTL ? 'rtl' : 'ltr';

  const t = (englishText: string, arabicText?: string) => {
    if (language === 'ar' && arabicText) {
      return arabicText;
    }
    return englishText;
  };

  const value = {
    isRTL,
    toggleRTL,
    direction,
    language,
    setLanguage: (lang: string) => {
      setLanguage(lang);
      setIsRTL(lang === 'ar');
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    },
    t,
  };

  return (
    <RTLContext.Provider value={value}>
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = (): RTLContextType => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
