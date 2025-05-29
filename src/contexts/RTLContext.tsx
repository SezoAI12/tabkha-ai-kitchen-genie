
import React, { createContext, useContext, useState } from 'react';

interface RTLContextType {
  isRTL: boolean;
  setIsRTL: (isRTL: boolean) => void;
  language: string;
  setLanguage: (language: string) => void;
  direction: 'ltr' | 'rtl';
  t: (english: string, arabic?: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const direction = isRTL ? 'rtl' : 'ltr';

  // Translation function - returns Arabic if RTL and Arabic text provided, otherwise English
  const t = (english: string, arabic?: string): string => {
    if (isRTL && arabic) {
      return arabic;
    }
    return english;
  };

  return (
    <RTLContext.Provider value={{ 
      isRTL, 
      setIsRTL, 
      language, 
      setLanguage, 
      direction,
      t 
    }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};

export const useRTL = () => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within a RTLProvider');
  }
  return context;
};
