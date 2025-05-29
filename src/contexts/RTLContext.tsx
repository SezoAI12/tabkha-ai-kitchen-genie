
import React, { createContext, useContext, useState } from 'react';

interface RTLContextType {
  isRTL: boolean;
  toggleRTL: () => void;
  direction: 'ltr' | 'rtl';
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);

  const toggleRTL = () => {
    setIsRTL(!isRTL);
    document.documentElement.dir = !isRTL ? 'rtl' : 'ltr';
  };

  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <RTLContext.Provider value={{ isRTL, toggleRTL, direction }}>
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = (): RTLContextType => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
