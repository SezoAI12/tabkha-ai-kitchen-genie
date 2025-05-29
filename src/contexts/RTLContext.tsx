
import React, { createContext, useContext, useState } from 'react';

interface RTLContextType {
  isRTL: boolean;
  toggleRTL: () => void;
  t: (key: string, fallback?: string) => string;
  direction: 'ltr' | 'rtl';
  language: string;
  setLanguage: (lang: string) => void;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleRTL = () => {
    setIsRTL(!isRTL);
  };

  // Simple translation function - in real app this would fetch from API
  const t = (key: string, fallback?: string) => {
    // Mock translations - return fallback or key if no translation found
    return fallback || key;
  };

  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <RTLContext.Provider value={{ 
      isRTL, 
      toggleRTL, 
      t, 
      direction, 
      language, 
      setLanguage 
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
    throw new Error('useRTL must be used within a RTLProvider');
  }
  return context;
};
