
import React, { createContext, useContext, useState } from 'react';

interface RTLContextType {
  isRTL: boolean;
  toggleRTL: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  t: (enText: string, arText?: string) => string;
  direction: 'ltr' | 'rtl';
}

const RTLContext = createContext<RTLContextType>({
  isRTL: false,
  toggleRTL: () => {},
  language: 'en',
  setLanguage: () => {},
  t: (enText: string) => enText,
  direction: 'ltr',
});

export const useRTL = () => useContext(RTLContext);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleRTL = () => {
    setIsRTL(!isRTL);
  };

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    setIsRTL(lang === 'ar');
  };

  const t = (enText: string, arText?: string) => {
    if (language === 'ar' && arText) {
      return arText;
    }
    return enText;
  };

  const direction: 'ltr' | 'rtl' = isRTL ? 'rtl' : 'ltr';

  return (
    <RTLContext.Provider value={{ 
      isRTL, 
      toggleRTL, 
      language, 
      setLanguage: handleSetLanguage, 
      t,
      direction 
    }}>
      <div className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};
