
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RTLContextType {
  isRTL: boolean;
  setIsRTL: (isRTL: boolean) => void;
  language: string;
  setLanguage: (language: string) => void;
  direction: string;
  t: (englishText: string, arabicText?: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const useRTL = () => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within a RTLProvider');
  }
  return context;
};

interface RTLProviderProps {
  children: ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const direction = isRTL ? 'rtl' : 'ltr';

  const t = (englishText: string, arabicText?: string) => {
    return isRTL && arabicText ? arabicText : englishText;
  };

  return (
    <RTLContext.Provider value={{ isRTL, setIsRTL, language, setLanguage, direction, t }}>
      <div dir={direction} className={direction}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};
