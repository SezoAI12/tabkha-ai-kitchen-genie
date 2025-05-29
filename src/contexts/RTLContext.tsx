
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RTLContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isRTL: boolean;
  t: (key: string) => string;
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

  // Simple translation function - in a real app this would be more sophisticated
  const t = (key: string) => {
    // For now, just return the key - translation logic would go here
    return key;
  };

  return (
    <RTLContext.Provider value={{ language, setLanguage, isRTL, t }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};
