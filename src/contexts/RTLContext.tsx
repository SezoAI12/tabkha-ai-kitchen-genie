
import React, { createContext, useContext } from 'react';

interface RTLContextType {
  isRTL: boolean;
  t: (key: string) => string;
}

const RTLContext = createContext<RTLContextType>({
  isRTL: false,
  t: (key: string) => key,
});

export const useRTL = () => useContext(RTLContext);

// Simple translation hook
export const useTranslation = () => {
  return {
    t: (key: string) => key, // Simple fallback - returns the key as translation
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
  const t = (key: string) => key; // Simple translation function

  return (
    <RTLContext.Provider value={{ isRTL, t }}>
      {children}
    </RTLContext.Provider>
  );
};

export default RTLContext;
