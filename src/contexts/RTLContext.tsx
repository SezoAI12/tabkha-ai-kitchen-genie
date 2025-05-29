
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RTLContextType {
  isRTL: boolean;
  setRTL: (value: boolean) => void;
  t: (key: string, fallback?: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

interface RTLProviderProps {
  children: ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);

  const setRTL = (value: boolean) => {
    setIsRTL(value);
    document.documentElement.dir = value ? 'rtl' : 'ltr';
  };

  const t = (key: string, fallback?: string) => {
    // Simple translation function - can be expanded later
    return fallback || key;
  };

  return (
    <RTLContext.Provider value={{ isRTL, setRTL, t }}>
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = () => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
