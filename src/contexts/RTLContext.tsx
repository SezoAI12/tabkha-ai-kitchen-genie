
import React, { createContext, useContext, useState } from 'react';

interface RTLContextType {
  isRTL: boolean;
  toggleRTL: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const RTLContext = createContext<RTLContextType>({
  isRTL: false,
  toggleRTL: () => {},
  language: 'en',
  setLanguage: () => {},
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

  return (
    <RTLContext.Provider value={{ isRTL, toggleRTL, language, setLanguage: handleSetLanguage }}>
      <div className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};
