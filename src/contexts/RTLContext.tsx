
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RTLContextType {
  isRTL: boolean;
  language: string;
  toggleLanguage: () => void;
  setLanguage: (lang: string) => void;
  t: (english: string, arabic?: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

interface RTLProviderProps {
  children: ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState('en');
  const isRTL = language === 'ar';

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'en' ? 'ar' : 'en');
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  const t = (english: string, arabic?: string) => {
    if (language === 'ar' && arabic) {
      return arabic;
    }
    return english;
  };

  const value: RTLContextType = {
    isRTL,
    language,
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
