import React, { createContext, useContext, useState } from 'react';

interface RTLContextType {
  isRTL: boolean;
  toggleRTL: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  direction: 'ltr' | 'rtl';
  t: (key: string, arabicTranslation?: string) => string;
}

// Translation dictionary for common UI elements
const translations: Record<string, Record<string, string>> = {
  en: {
    'Profile': 'Profile',
    'Favorites': 'Favorites',
    'My Recipes': 'My Recipes',
    'Shopping List': 'Shopping List',
    'Loyalty Program': 'Loyalty Program',
    'Scan Dish': 'Scan Dish',
    'Body Information': 'Body Information',
    'Subscription': 'Subscription',
    'Settings': 'Settings',
    'Notifications': 'Notifications',
    'Language': 'Language',
    'Appearance': 'Appearance',
    'Connected Devices': 'Connected Devices',
    'Help & Support': 'Help & Support',
    'Admin Panel': 'Admin Panel',
    'Log Out': 'Log Out',
    'Menu': 'Menu',
    'settings.language.title': 'Language Settings',
    'settings.language.description': 'Select your preferred language.',
    'settings.language.current': 'Current Language',
    'settings.language.available': 'Available Languages',
    'settings.language.save': 'Save Changes',
    'settings.language.saved.success': 'Language preference saved!',
    'settings.language.saved.error': 'Failed to save language preference.',
    'language.en': 'English',
    'language.ar': 'العربية',
    'language.fr': 'Français',
  },
  ar: {
    'Profile': 'الملف الشخصي',
    'Favorites': 'المفضلة',
    'My Recipes': 'وصفاتي',
    'Shopping List': 'قائمة التسوق',
    'Loyalty Program': 'برنامج الولاء',
    'Scan Dish': 'مسح الطبق',
    'Body Information': 'معلومات الجسم',
    'Subscription': 'الاشتراك',
    'Settings': 'الإعدادات',
    'Notifications': 'الإشعارات',
    'Language': 'اللغة',
    'Appearance': 'المظهر',
    'Connected Devices': 'الأجهزة المتصلة',
    'Help & Support': 'المساعدة والدعم',
    'Admin Panel': 'لوحة الإدارة',
    'Log Out': 'تسجيل الخروج',
    'Menu': 'القائمة',
    'settings.language.title': 'إعدادات اللغة',
    'settings.language.description': 'اختر لغتك المفضلة.',
    'settings.language.current': 'اللغة الحالية',
    'settings.language.available': 'اللغات المتاحة',
    'settings.language.save': 'حفظ التغييرات',
    'settings.language.saved.success': 'تم حفظ تفضيل اللغة!',
    'settings.language.saved.error': 'فشل في حفظ تفضيل اللغة.',
    'language.en': 'English',
    'language.ar': 'العربية',
    'language.fr': 'Français',
  },
  fr: {
    'Profile': 'Profil',
    'Favorites': 'Favoris',
    'My Recipes': 'Mes Recettes',
    'Shopping List': 'Liste de Courses',
    'Loyalty Program': 'Programme de Fidélité',
    'Scan Dish': 'Scanner Plat',
    'Body Information': 'Informations Corporelles',
    'Subscription': 'Abonnement',
    'Settings': 'Paramètres',
    'Notifications': 'Notifications',
    'Language': 'Langue',
    'Appearance': 'Apparence',
    'Connected Devices': 'Appareils Connectés',
    'Help & Support': 'Aide et Support',
    'Admin Panel': 'Panneau Admin',
    'Log Out': 'Se Déconnecter',
    'Menu': 'Menu',
    'settings.language.title': 'Paramètres de Langue',
    'settings.language.description': 'Sélectionnez votre langue préférée.',
    'settings.language.current': 'Langue Actuelle',
    'settings.language.available': 'Langues Disponibles',
    'settings.language.save': 'Sauvegarder les Modifications',
    'settings.language.saved.success': 'Préférence de langue sauvegardée!',
    'settings.language.saved.error': 'Échec de la sauvegarde de la préférence de langue.',
    'language.en': 'English',
    'language.ar': 'العربية',
    'language.fr': 'Français',
  }
};

const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleRTL = () => {
    setIsRTL(!isRTL);
    setLanguage(isRTL ? 'en' : 'ar');
  };

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    setIsRTL(lang === 'ar');
  };

  const t = (key: string, arabicTranslation?: string) => {
    // If arabicTranslation is provided, use the old dual-language approach
    if (arabicTranslation !== undefined) {
      return language === 'ar' ? arabicTranslation : key;
    }
    
    // Otherwise, use the translation dictionary
    const currentTranslations = translations[language] || translations['en'];
    return currentTranslations[key] || key;
  };

  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <RTLContext.Provider value={{ 
      isRTL, 
      toggleRTL, 
      language, 
      setLanguage: handleSetLanguage, 
      direction, 
      t 
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
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
