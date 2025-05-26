
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RTLContextProps {
  isRTL: boolean;
  setRTL: (isRTL: boolean) => void;
  toggleRTL: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  direction: 'ltr' | 'rtl';
  t: (en: string, ar: string, tr?: string) => string;
}

interface TranslationDictionary {
  [key: string]: {
    en: string;
    ar: string;
    tr: string;
  };
}

// Enhanced translations that are used throughout the app
const commonTranslations: TranslationDictionary = {
  home: { 
    en: 'Home', 
    ar: 'الرئيسية',
    tr: 'Ana Sayfa'
  },
  settings: { 
    en: 'Settings', 
    ar: 'الإعدادات',
    tr: 'Ayarlar'
  },
  favorites: { 
    en: 'Favorites', 
    ar: 'المفضلة',
    tr: 'Favoriler'
  },
  search: { 
    en: 'Search', 
    ar: 'البحث',
    tr: 'Ara'
  },
  profile: { 
    en: 'Profile', 
    ar: 'الملف الشخصي',
    tr: 'Profil'
  },
  save: { 
    en: 'Save', 
    ar: 'حفظ',
    tr: 'Kaydet'
  },
  cancel: { 
    en: 'Cancel', 
    ar: 'إلغاء',
    tr: 'İptal'
  },
  delete: { 
    en: 'Delete', 
    ar: 'حذف',
    tr: 'Sil'
  },
  edit: { 
    en: 'Edit', 
    ar: 'تعديل',
    tr: 'Düzenle'
  },
  view: { 
    en: 'View', 
    ar: 'عرض',
    tr: 'Görüntüle'
  },
  add: { 
    en: 'Add', 
    ar: 'إضافة',
    tr: 'Ekle'
  },
  remove: { 
    en: 'Remove', 
    ar: 'إزالة',
    tr: 'Kaldır'
  },
  confirm: { 
    en: 'Confirm', 
    ar: 'تأكيد',
    tr: 'Onayla'
  },
  next: { 
    en: 'Next', 
    ar: 'التالي',
    tr: 'İleri'
  },
  previous: { 
    en: 'Previous', 
    ar: 'السابق',
    tr: 'Geri'
  },
  done: { 
    en: 'Done', 
    ar: 'تم',
    tr: 'Tamamlandı'
  },
  submit: { 
    en: 'Submit', 
    ar: 'إرسال',
    tr: 'Gönder'
  },
  loading: { 
    en: 'Loading...', 
    ar: 'جاري التحميل...',
    tr: 'Yükleniyor...'
  },
  scan: { 
    en: 'Scan', 
    ar: 'فحص',
    tr: 'Tara'
  },
  ingredients: { 
    en: 'Ingredients', 
    ar: 'المكونات',
    tr: 'Malzemeler'
  },
  nutritionalInfo: { 
    en: 'Nutritional Information', 
    ar: 'المعلومات الغذائية',
    tr: 'Beslenme Bilgisi'
  },
  recipes: { 
    en: 'Recipes', 
    ar: 'وصفات',
    tr: 'Tarifler'
  },
  cookTime: { 
    en: 'Cook Time', 
    ar: 'وقت الطهي',
    tr: 'Pişirme Süresi'
  },
  prepTime: { 
    en: 'Prep Time', 
    ar: 'وقت التحضير',
    tr: 'Hazırlık Süresi'
  },
  servings: { 
    en: 'Servings', 
    ar: 'الحصص',
    tr: 'Porsiyon'
  },
  difficulty: { 
    en: 'Difficulty', 
    ar: 'الصعوبة',
    tr: 'Zorluk'
  },
  calories: { 
    en: 'Calories', 
    ar: 'السعرات الحرارية',
    tr: 'Kalori'
  },
  menu: {
    en: 'Menu',
    ar: 'القائمة',
    tr: 'Menü'
  },
  language: {
    en: 'Language',
    ar: 'اللغة',
    tr: 'Dil'
  },
  notifications: {
    en: 'Notifications',
    ar: 'الإشعارات',
    tr: 'Bildirimler'
  },
  appearance: {
    en: 'Appearance',
    ar: 'المظهر',
    tr: 'Görünüm'
  },
  help: {
    en: 'Help & Support',
    ar: 'المساعدة والدعم',
    tr: 'Yardım ve Destek'
  },
  track: {
    en: 'Track',
    ar: 'التتبع',
    tr: 'Takip'
  },
  find: {
    en: 'Find',
    ar: 'البحث',
    tr: 'Bul'
  }
};

const RTLContext = createContext<RTLContextProps | undefined>(undefined);

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  // Get initial language from localStorage or default to English
  const [language, setLanguageState] = useState<string>(
    localStorage.getItem('preferredLanguage') || 'en'
  );
  
  // Arabic is RTL
  const [isRTL, setRTLState] = useState<boolean>(language === 'ar');

  useEffect(() => {
    // Apply RTL class to document when language changes
    if (isRTL) {
      document.documentElement.classList.add('rtl');
      document.documentElement.dir = 'rtl';
      document.body.style.textAlign = 'right';
    } else {
      document.documentElement.classList.remove('rtl');
      document.documentElement.dir = 'ltr';
      document.body.style.textAlign = 'left';
    }
    
    // Apply language attribute for screen readers
    document.documentElement.lang = language;
  }, [isRTL, language]);

  const setLanguage = (lang: string) => {
    try {
      localStorage.setItem('preferredLanguage', lang);
      setLanguageState(lang);
      const newIsRTL = lang === 'ar';
      setRTLState(newIsRTL);
      
      const languageNames = {
        en: 'English',
        ar: 'العربية',
        tr: 'Türkçe'
      };
      
      toast({
        title: newIsRTL ? "تم تغيير اللغة" : lang === 'tr' ? "Dil Değiştirildi" : "Language Changed",
        description: newIsRTL ? 
          "تم تغيير لغة التطبيق إلى العربية" : 
          lang === 'tr' ? 
            "Uygulama dili Türkçe olarak değiştirildi" :
            `The application language has been changed to ${languageNames[lang as keyof typeof languageNames] || lang}`
      });
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  const setRTL = (value: boolean) => {
    setRTLState(value);
  };

  const toggleRTL = () => {
    setRTL(!isRTL);
    setLanguage(isRTL ? 'en' : 'ar');
  };
  
  // Enhanced translation function that supports Turkish
  const t = (en: string, ar: string, tr?: string): string => {
    // First check if the text exists in our common translations
    for (const key in commonTranslations) {
      if (commonTranslations[key].en === en) {
        const translation = commonTranslations[key];
        return language === 'ar' ? translation.ar : 
               language === 'tr' ? translation.tr : 
               translation.en;
      }
    }
    
    // If not found in common translations, use the provided text
    return language === 'ar' ? ar : 
           language === 'tr' ? (tr || en) : 
           en;
  };

  return (
    <RTLContext.Provider value={{ 
      isRTL, 
      setRTL, 
      toggleRTL, 
      language, 
      setLanguage,
      direction: isRTL ? 'rtl' : 'ltr',
      t
    }}>
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = (): RTLContextProps => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within a RTLProvider');
  }
  return context;
};
