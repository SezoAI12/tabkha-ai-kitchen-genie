
import React, { createContext, useContext, useState } from 'react';

interface RTLContextType {
  isRTL: boolean;
  t: (key: string, options?: any) => string;
  language?: string;
  setLanguage?: (lang: string) => void;
  direction?: 'ltr' | 'rtl';
}

const RTLContext = createContext<RTLContextType>({
  isRTL: false,
  t: (key: string) => key,
});

export const useRTL = () => useContext(RTLContext);

// Simple translation hook
export const useTranslation = () => {
  return {
    t: (key: string, options?: any) => key, // Simple fallback - returns the key as translation
  };
};

interface RTLProviderProps {
  children: React.ReactNode;
  isRTL?: boolean;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ 
  children, 
  isRTL = false 
}) => {
  const [language, setLanguage] = useState('en');
  
  const t = (key: string, options?: any) => key; // Simple translation function

  return (
    <RTLContext.Provider value={{ 
      isRTL, 
      t, 
      language, 
      setLanguage, 
      direction: isRTL ? 'rtl' : 'ltr' 
    }}>
      {children}
    </RTLContext.Provider>
  );
};

export default RTLContext;
