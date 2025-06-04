
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar' | 'tr' | 'fr';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  availableLanguages: { code: Language; name: string; nativeName: string }[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'Home': 'Home',
    'Recipes': 'Recipes',
    'Search': 'Search',
    'Profile': 'Profile',
    'Settings': 'Settings',
    // Common
    'Loading': 'Loading...',
    'Error': 'Error',
    'Save': 'Save',
    'Cancel': 'Cancel',
    'Delete': 'Delete',
    'Edit': 'Edit'
  },
  ar: {
    // Navigation
    'Home': 'الرئيسية',
    'Recipes': 'الوصفات',
    'Search': 'البحث',
    'Profile': 'الملف الشخصي',
    'Settings': 'الإعدادات',
    // Common
    'Loading': 'جاري التحميل...',
    'Error': 'خطأ',
    'Save': 'حفظ',
    'Cancel': 'إلغاء',
    'Delete': 'حذف',
    'Edit': 'تعديل'
  },
  tr: {
    // Navigation
    'Home': 'Ana Sayfa',
    'Recipes': 'Tarifler',
    'Search': 'Ara',
    'Profile': 'Profil',
    'Settings': 'Ayarlar',
    // Common
    'Loading': 'Yükleniyor...',
    'Error': 'Hata',
    'Save': 'Kaydet',
    'Cancel': 'İptal',
    'Delete': 'Sil',
    'Edit': 'Düzenle'
  },
  fr: {
    // Navigation
    'Home': 'Accueil',
    'Recipes': 'Recettes',
    'Search': 'Recherche',
    'Profile': 'Profil',
    'Settings': 'Paramètres',
    // Common
    'Loading': 'Chargement...',
    'Error': 'Erreur',
    'Save': 'Enregistrer',
    'Cancel': 'Annuler',
    'Delete': 'Supprimer',
    'Edit': 'Modifier'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const availableLanguages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية' },
    { code: 'tr' as Language, name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'fr' as Language, name: 'French', nativeName: 'Français' }
  ];

  const isRTL = language === 'ar';

  const t = (key: string, fallback?: string) => {
    const translation = translations[language]?.[key as keyof typeof translations['en']];
    return translation || fallback || key;
  };

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t, 
        availableLanguages,
        isRTL
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
