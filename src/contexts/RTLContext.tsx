
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RTLContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isRTL: boolean;
  direction: 'ltr' | 'rtl';
  t: (englishKey: string, arabicKey?: string) => string;
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
  const [language, setLanguage] = useState('en');
  const isRTL = language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  // Translation function that supports both English and Arabic
  const t = (englishKey: string, arabicKey?: string) => {
    if (language === 'ar' && arabicKey) {
      return arabicKey;
    }
    return englishKey;
  };

  return (
    <RTLContext.Provider value={{ language, setLanguage, isRTL, direction, t }}>
      <div dir={direction}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};
