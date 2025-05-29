
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface RTLContextType {
  language: string;
  direction: 'ltr' | 'rtl';
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

// Mock translations
const translations: Translations = {
  en: {
    home: 'Home',
    features: 'Features',
    recipes: 'Recipes',
    about: 'About',
    contact: 'Contact',
    getStarted: 'Get Started',
    scanDish: 'Scan Dish',
    quickActions: 'Quick Actions',
    settings: 'Settings',
    menu: 'Menu',
    search: 'Search',
    favorites: 'Favorites',
    shoppingList: 'Shopping List',
    mealPlan: 'Meal Plan',
    pantry: 'Pantry',
    health: 'Health',
    profile: 'Profile',
    language: 'Language',
    notifications: 'Notifications',
    privacy: 'Privacy',
    help: 'Help',
    logout: 'Logout',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    update: 'Update',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info'
  },
  ar: {
    home: 'الرئيسية',
    features: 'المميزات',
    recipes: 'الوصفات',
    about: 'حول',
    contact: 'اتصل',
    getStarted: 'ابدأ الآن',
    scanDish: 'مسح الطبق',
    quickActions: 'إجراءات سريعة',
    settings: 'الإعدادات',
    menu: 'القائمة',
    search: 'البحث',
    favorites: 'المفضلة',
    shoppingList: 'قائمة التسوق',
    mealPlan: 'خطة الوجبات',
    pantry: 'المخزن',
    health: 'الصحة',
    profile: 'الملف الشخصي',
    language: 'اللغة',
    notifications: 'الإشعارات',
    privacy: 'الخصوصية',
    help: 'المساعدة',
    logout: 'تسجيل الخروج',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    add: 'إضافة',
    remove: 'إزالة',
    update: 'تحديث',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    warning: 'تحذير',
    info: 'معلومات'
  },
  fr: {
    home: 'Accueil',
    features: 'Fonctionnalités',
    recipes: 'Recettes',
    about: 'À propos',
    contact: 'Contact',
    getStarted: 'Commencer',
    scanDish: 'Scanner le plat',
    quickActions: 'Actions rapides',
    settings: 'Paramètres',
    menu: 'Menu',
    search: 'Rechercher',
    favorites: 'Favoris',
    shoppingList: 'Liste de courses',
    mealPlan: 'Plan de repas',
    pantry: 'Garde-manger',
    health: 'Santé',
    profile: 'Profil',
    language: 'Langue',
    notifications: 'Notifications',
    privacy: 'Confidentialité',
    help: 'Aide',
    logout: 'Déconnexion',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    add: 'Ajouter',
    remove: 'Retirer',
    update: 'Mettre à jour',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    warning: 'Avertissement',
    info: 'Info'
  }
};

export const RTLProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <RTLContext.Provider value={{ language, direction, setLanguage, t }}>
      <div dir={direction}>
        {children}
      </div>
    </RTLContext.Provider>
  );
};

export const useRTL = (): RTLContextType => {
  const context = useContext(RTLContext);
  if (!context) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
