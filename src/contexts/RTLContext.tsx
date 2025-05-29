
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RTLContextType {
  isRTL: boolean;
  language: string;
  direction: 'ltr' | 'rtl';
  setLanguage: (lang: string) => void;
  t: (key: string, defaultValue?: string) => string;
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
  const isRTL = language === 'ar' || language === 'he';
  const direction = isRTL ? 'rtl' : 'ltr';

  // Simple translation function - returns the key if no translation found
  const t = (key: string, defaultValue?: string) => {
    // This is a basic implementation - in a real app you'd load translations from files
    return defaultValue || key;
  };

  return (
    <RTLContext.Provider value={{ isRTL, language, direction, setLanguage, t }}>
      <div dir={direction} className={direction}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};
