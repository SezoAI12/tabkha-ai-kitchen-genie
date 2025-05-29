
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RTLContextType {
  isRTL: boolean;
  setIsRTL: (value: boolean) => void;
  language: string;
  setLanguage: (value: string) => void;
  direction: 'ltr' | 'rtl';
  t: (key: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const useRTL = () => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};

interface RTLProviderProps {
  children: ReactNode;
}

// Simple translation function for demo purposes
const translations: Record<string, Record<string, string>> = {
  en: {
    'Quick Actions': 'Quick Actions',
    'Scan Ingredients': 'Scan Ingredients',
    'Find Recipes': 'Find Recipes',
    'Meal Planning': 'Meal Planning',
    'Health Tracking': 'Health Tracking',
    'Settings': 'Settings',
    'Profile': 'Profile',
    'Favorites': 'Favorites',
    'Recipes': 'Recipes',
    'Pantry': 'Pantry',
    'Shopping List': 'Shopping List',
    'Notifications': 'Notifications',
    'Language': 'Language',
    'Menu': 'Menu',
    'Home': 'Home',
    'Search': 'Search',
    'Create Recipe': 'Create Recipe',
    'Scan Dish': 'Scan Dish',
    'direction': 'ltr'
  },
  ar: {
    'Quick Actions': 'إجراءات سريعة',
    'Scan Ingredients': 'مسح المكونات',
    'Find Recipes': 'البحث عن الوصفات',
    'Meal Planning': 'تخطيط الوجبات',
    'Health Tracking': 'تتبع الصحة',
    'Settings': 'الإعدادات',
    'Profile': 'الملف الشخصي',
    'Favorites': 'المفضلة',
    'Recipes': 'الوصفات',
    'Pantry': 'المخزن',
    'Shopping List': 'قائمة التسوق',
    'Notifications': 'الإشعارات',
    'Language': 'اللغة',
    'Menu': 'القائمة',
    'Home': 'الرئيسية',
    'Search': 'البحث',
    'Create Recipe': 'إنشاء وصفة',
    'Scan Dish': 'مسح الطبق',
    'direction': 'rtl'
  }
};

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const direction = isRTL ? 'rtl' : 'ltr';

  const value = {
    isRTL,
    setIsRTL,
    language,
    setLanguage,
    direction,
    t,
  };

  return (
    <RTLContext.Provider value={value}>
      <div dir={direction} className={direction}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};
