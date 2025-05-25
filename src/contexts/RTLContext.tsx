import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RTLContextProps {
  isRTL: boolean;
  setRTL: (isRTL: boolean) => void;
  toggleRTL: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  direction: 'ltr' | 'rtl';
  t: (en: string, ar: string) => string;
}

interface TranslationDictionary {
  [key: string]: {
    en: string;
    ar: string;
  };
}

// Common translations that are used throughout the app
const commonTranslations: TranslationDictionary = {
  home: { 
    en: 'Home', 
    ar: 'الرئيسية' 
  },
  settings: { 
    en: 'Settings', 
    ar: 'الإعدادات' 
  },
  favorites: { 
    en: 'Favorites', 
    ar: 'المفضلة' 
  },
  search: { 
    en: 'Search', 
    ar: 'البحث' 
  },
  profile: { 
    en: 'Profile', 
    ar: 'الملف الشخصي' 
  },
  save: { 
    en: 'Save', 
    ar: 'حفظ' 
  },
  cancel: { 
    en: 'Cancel', 
    ar: 'إلغاء' 
  },
  delete: { 
    en: 'Delete', 
    ar: 'حذف' 
  },
  edit: { 
    en: 'Edit', 
    ar: 'تعديل' 
  },
  view: { 
    en: 'View', 
    ar: 'عرض' 
  },
  add: { 
    en: 'Add', 
    ar: 'إضافة' 
  },
  remove: { 
    en: 'Remove', 
    ar: 'إزالة' 
  },
  confirm: { 
    en: 'Confirm', 
    ar: 'تأكيد' 
  },
  next: { 
    en: 'Next', 
    ar: 'التالي' 
  },
  previous: { 
    en: 'Previous', 
    ar: 'السابق' 
  },
  done: { 
    en: 'Done', 
    ar: 'تم' 
  },
  submit: { 
    en: 'Submit', 
    ar: 'إرسال' 
  },
  loading: { 
    en: 'Loading...', 
    ar: 'جاري التحميل...' 
  },
  scan: { 
    en: 'Scan', 
    ar: 'فحص' 
  },
  ingredients: { 
    en: 'Ingredients', 
    ar: 'المكونات' 
  },
  nutritionalInfo: { 
    en: 'Nutritional Information', 
    ar: 'المعلومات الغذائية' 
  },
  recipes: { 
    en: 'Recipes', 
    ar: 'وصفات' 
  },
  cookTime: { 
    en: 'Cook Time', 
    ar: 'وقت الطهي' 
  },
  prepTime: { 
    en: 'Prep Time', 
    ar: 'وقت التحضير' 
  },
  servings: { 
    en: 'Servings', 
    ar: 'الحصص' 
  },
  difficulty: { 
    en: 'Difficulty', 
    ar: 'الصعوبة' 
  },
  calories: { 
    en: 'Calories', 
    ar: 'السعرات الحرارية' 
  },
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
      
      toast({
        title: newIsRTL ? "تم تغيير اللغة" : "Language Changed",
        description: newIsRTL ? 
          "تم تغيير لغة التطبيق إلى العربية" : 
          `The application language has been changed to ${lang === 'en' ? 'English' : lang}`
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
  
  // Translation function that returns the appropriate string based on current language
  const t = (en: string, ar: string): string => {
    // First check if the text exists in our common translations
    for (const key in commonTranslations) {
      if (commonTranslations[key].en === en) {
        return language === 'ar' ? commonTranslations[key].ar : en;
      }
    }
    
    // If not found in common translations, use the provided ar text or en text
    return language === 'ar' ? ar : en;
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
