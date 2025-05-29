
import React, { createContext, useContext, useState } from 'react';

interface RTLContextType {
  isRTL: boolean;
  toggleRTL: () => void;
  language: string;
  setLanguage: (language: string) => void;
  direction: string;
  t: (englishKey: string, arabicTranslation?: string) => string;
}

const RTLContext = createContext<RTLContextType>({
  isRTL: false,
  toggleRTL: () => {},
  language: 'en',
  setLanguage: () => {},
  direction: 'ltr',
  t: (englishKey: string) => englishKey,
});

export const useRTL = () => useContext(RTLContext);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleRTL = () => {
    setIsRTL(!isRTL);
  };

  const direction = isRTL ? 'rtl' : 'ltr';
  
  // Translation function that supports both single key and English/Arabic pairs
  const t = (englishKey: string, arabicTranslation?: string) => {
    if (language === 'ar' && arabicTranslation) {
      return arabicTranslation;
    }
    return englishKey;
  };

  return (
    <RTLContext.Provider value={{ isRTL, toggleRTL, language, setLanguage, direction, t }}>
      <div dir={direction}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};
