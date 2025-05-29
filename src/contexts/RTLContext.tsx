
import React, { createContext, useContext, useState } from 'react';

interface RTLContextType {
  isRTL: boolean;
  toggleRTL: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  direction: 'ltr' | 'rtl';
  t: (english: string, arabic: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleRTL = () => {
    setIsRTL(!isRTL);
    setLanguage(isRTL ? 'en' : 'ar');
  };

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    setIsRTL(lang === 'ar');
  };

  const t = (english: string, arabic: string) => {
    return language === 'ar' ? arabic : english;
  };

  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <RTLContext.Provider value={{ 
      isRTL, 
      toggleRTL, 
      language, 
      setLanguage: handleSetLanguage, 
      direction, 
      t 
    }}>
      <div dir={direction}>
        {children}
      </div>
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
