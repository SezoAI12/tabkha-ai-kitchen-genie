
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RTLContextType {
  isRTL: boolean;
  language: string;
  direction: string;
  toggleLanguage: () => void;
  setLanguage: (lang: string) => void;
  t: (english: string, arabic?: string, turkish?: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

interface RTLProviderProps {
  children: ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState('en');
  const isRTL = language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'en' ? 'ar' : 'en');
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  const t = (english: string, arabic?: string, turkish?: string) => {
    if (language === 'ar' && arabic) {
      return arabic;
    }
    if (language === 'tr' && turkish) {
      return turkish;
    }
    return english;
  };

  const value: RTLContextType = {
    isRTL,
    language,
    direction,
    toggleLanguage,
    setLanguage,
    t
  };

  return (
    <RTLContext.Provider value={value}>
      <div className={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};

export const useRTL = (): RTLContextType => {
  const context = useContext(RTLContext);
  if (!context) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
