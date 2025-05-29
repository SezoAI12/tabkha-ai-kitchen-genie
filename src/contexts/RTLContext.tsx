
import React, { createContext, useContext, useState } from 'react';

interface RTLContextType {
  isRTL: boolean;
  toggleRTL: () => void;
}

const RTLContext = createContext<RTLContextType>({
  isRTL: false,
  toggleRTL: () => {},
});

export const useRTL = () => useContext(RTLContext);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);

  const toggleRTL = () => {
    setIsRTL(!isRTL);
  };

  return (
    <RTLContext.Provider value={{ isRTL, toggleRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};
