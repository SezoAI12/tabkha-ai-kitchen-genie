
import React, { createContext, useContext, useState, useEffect } from 'react';

interface RTLContextType {
  isRTL: boolean;
  toggleRTL: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  direction: 'ltr' | 'rtl';
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
  children: React.ReactNode;
}

// Simple translation function - in a real app this would be more sophisticated
const translations: Record<string, Record<string, string>> = {
  en: {
    // Add common translations here
    'welcome': 'Welcome',
    'settings': 'Settings',
    'profile': 'Profile',
    'recipes': 'Recipes',
    'pantry': 'Pantry',
    'meal_plan': 'Meal Plan',
    'shopping_list': 'Shopping List',
    'favorites': 'Favorites',
    'search': 'Search',
    'health': 'Health',
    'community': 'Community',
  },
  ar: {
    // Arabic translations would go here
    'welcome': 'مرحبا',
    'settings': 'الإعدادات',
    'profile': 'الملف الشخصي',
    'recipes': 'الوصفات',
    'pantry': 'المخزن',
    'meal_plan': 'خطة الوجبات',
    'shopping_list': 'قائمة التسوق',
    'favorites': 'المفضلة',
    'search': 'البحث',
    'health': 'الصحة',
    'community': 'المجتمع',
  }
};

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Set RTL based on language
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    setIsRTL(rtlLanguages.includes(language));
    
    // Apply direction to document
    document.documentElement.dir = rtlLanguages.includes(language) ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleRTL = () => {
    setIsRTL(!isRTL);
    document.documentElement.dir = !isRTL ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const direction: 'ltr' | 'rtl' = isRTL ? 'rtl' : 'ltr';

  const value = {
    isRTL,
    toggleRTL,
    language,
    setLanguage,
    direction,
    t,
  };

  return (
    <RTLContext.Provider value={value}>
      {children}
    </RTLContext.Provider>
  );
};
