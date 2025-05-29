
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RTLContextType {
  isRTL: boolean;
  toggleRTL: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  t: (englishText: string, arabicText?: string) => string;
  direction: 'ltr' | 'rtl';
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const useRTL = () => {
  const context = useContext(RTLContext);
  if (!context) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};

interface RTLProviderProps {
  children: ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleRTL = () => {
    setIsRTL(!isRTL);
  };

  const t = (englishText: string, arabicText?: string) => {
    if (isRTL && arabicText) {
      return arabicText;
    }
    return englishText;
  };

  const direction: 'ltr' | 'rtl' = isRTL ? 'rtl' : 'ltr';

  React.useEffect(() => {
    if (isRTL) {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [isRTL]);

  const value = {
    isRTL,
    toggleRTL,
    language,
    setLanguage,
    t,
    direction,
  };

  return (
    <RTLContext.Provider value={value}>
      {children}
    </RTLContext.Provider>
  );
};
