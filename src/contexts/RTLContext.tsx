
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RTLContextType {
  isRTL: boolean;
  setIsRTL: (value: boolean) => void;
  language: string;
  setLanguage: (value: string) => void;
  direction: 'ltr' | 'rtl';
  t: (key: string, fallback?: string) => string;
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
    'Track Health': 'Track Health',
    'Swap Ingredients': 'Swap Ingredients',
    'Set Goals': 'Set Goals',
    'History': 'History',
    'Subscription': 'Subscription',
    'Favorites & Tools': 'Favorites & Tools',
    'AI Health Analysis': 'AI Health Analysis',
    'Current BMI': 'Current BMI',
    'Weight Goal Progress': 'Weight Goal Progress',
    'Starting': 'Starting',
    'Current': 'Current',
    'Target': 'Target',
    'Health Metrics Details': 'Health Metrics Details',
    'Height': 'Height',
    'Current Weight': 'Current Weight',
    'Target Weight': 'Target Weight',
    'Recommended Daily Calories': 'Recommended Daily Calories',
    'Underweight': 'Underweight',
    'Healthy': 'Healthy',
    'Overweight': 'Overweight',
    'Obese': 'Obese',
    'Daily Independence Challenges': 'Daily Independence Challenges',
    'completed': 'completed',
    'Complete these challenges to become less dependent on AI guidance': 'Complete these challenges to become less dependent on AI guidance',
    'All challenges completed! Great job!': 'All challenges completed! Great job!',
    'Challenge Completed!': 'Challenge Completed!',
    'Great job on completing this challenge!': 'Great job on completing this challenge!',
    'Challenge Unchecked': 'Challenge Unchecked',
    'Open Camera': 'Open Camera',
    'or': 'or',
    'Upload Image': 'Upload Image',
    'Analyzing...': 'Analyzing...',
    'Scan Another': 'Scan Another',
    'Camera Error': 'Camera Error',
    'Could not access your camera. Please check permissions.': 'Could not access your camera. Please check permissions.',
    'Capture Error': 'Capture Error',
    'Could not capture image from camera.': 'Could not capture image from camera.',
    'Invalid File': 'Invalid File',
    'Please upload an image file.': 'Please upload an image file.',
    'Dish Analyzed': 'Dish Analyzed',
    'Find': 'Find',
    'Scan': 'Scan',
    'Track': 'Track',
    'Calories': 'Calories',
    'Protein': 'Protein',
    'Carbs': 'Carbs',
    'Ingredients': 'Ingredients',
    'Add to Health Tracking': 'Add to Health Tracking',
    'Language Updated': 'Language Updated',
    'Language Preferences': 'Language Preferences',
    'Language Settings': 'Language Settings',
    'Language Information': 'Language Information',
    'Save Changes': 'Save Changes',
    'My Recipes': 'My Recipes',
    'Loyalty Program': 'Loyalty Program',
    'Body Information': 'Body Information',
    'Connected Devices': 'Connected Devices',
    'Help & Support': 'Help & Support',
    'Admin Panel': 'Admin Panel',
    'Appearance': 'Appearance',
    'Log Out': 'Log Out',
    'Your language has been set to English': 'Your language has been set to English',
    'Select your preferred language for the app interface': 'Select your preferred language for the app interface',
    'The app interface will be displayed in your selected language. Recipe content may vary based on availability in your chosen language.': 'The app interface will be displayed in your selected language. Recipe content may vary based on availability in your chosen language.'
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
    'Track Health': 'تتبع الصحة',
    'Swap Ingredients': 'تبديل المكونات',
    'Set Goals': 'تعيين الأهداف',
    'History': 'السجل',
    'Subscription': 'الاشتراك',
    'Favorites & Tools': 'المفضلة والأدوات',
    'AI Health Analysis': 'تحليل الصحة بالذكاء الاصطناعي',
    'Current BMI': 'مؤشر كتلة الجسم الحالي',
    'Weight Goal Progress': 'تقدم هدف الوزن',
    'Starting': 'البداية',
    'Current': 'الحالي',
    'Target': 'الهدف',
    'Health Metrics Details': 'تفاصيل مقاييس الصحة',
    'Height': 'الطول',
    'Current Weight': 'الوزن الحالي',
    'Target Weight': 'الوزن المستهدف',
    'Recommended Daily Calories': 'السعرات الحرارية اليومية الموصى بها',
    'Underweight': 'نقص الوزن',
    'Healthy': 'صحي',
    'Overweight': 'زيادة الوزن',
    'Obese': 'سمنة',
    'Daily Independence Challenges': 'تحديات الاستقلالية اليومية',
    'completed': 'مكتمل',
    'Complete these challenges to become less dependent on AI guidance': 'أكمل هذه التحديات لتصبح أقل اعتمادًا على توجيهات الذكاء الاصطناعي',
    'All challenges completed! Great job!': 'تم إكمال جميع التحديات! عمل رائع!',
    'Challenge Completed!': 'تم إكمال التحدي!',
    'Great job on completing this challenge!': 'عمل رائع في إكمال هذا التحدي!',
    'Challenge Unchecked': 'تم إلغاء التحدي',
    'Open Camera': 'فتح الكاميرا',
    'or': 'أو',
    'Upload Image': 'تحميل صورة',
    'Analyzing...': 'جاري التحليل...',
    'Scan Another': 'مسح آخر',
    'Camera Error': 'خطأ في الكاميرا',
    'Could not access your camera. Please check permissions.': 'تعذر الوصول إلى الكاميرا الخاصة بك. يرجى التحقق من الأذونات.',
    'Capture Error': 'خطأ في التقاط الصورة',
    'Could not capture image from camera.': 'تعذر التقاط الصورة من الكاميرا.',
    'Invalid File': 'ملف غير صالح',
    'Please upload an image file.': 'يرجى تحميل ملف صورة.',
    'Dish Analyzed': 'تم تحليل الطبق',
    'Find': 'البحث',
    'Scan': 'المسح',
    'Track': 'التتبع',
    'Calories': 'سعرات حرارية',
    'Protein': 'بروتين',
    'Carbs': 'كربوهيدرات',
    'Ingredients': 'المكونات',
    'Add to Health Tracking': 'أضف إلى تتبع الصحة',
    'Language Updated': 'تم تحديث اللغة',
    'Language Preferences': 'تفضيلات اللغة',
    'Language Settings': 'إعدادات اللغة',
    'Language Information': 'معلومات اللغة',
    'Save Changes': 'حفظ التغييرات',
    'My Recipes': 'وصفاتي',
    'Loyalty Program': 'برنامج الولاء',
    'Body Information': 'معلومات الجسم',
    'Connected Devices': 'الأجهزة المتصلة',
    'Help & Support': 'المساعدة والدعم',
    'Admin Panel': 'لوحة الإدارة',
    'Appearance': 'المظهر',
    'Log Out': 'تسجيل الخروج',
    'Your language has been set to العربية': 'تم تعيين لغتك إلى العربية',
    'Select your preferred language for the app interface': 'اختر لغتك المفضلة لواجهة التطبيق',
    'The app interface will be displayed in your selected language. Recipe content may vary based on availability in your chosen language.': 'ستُعرض واجهة التطبيق باللغة التي اخترتها. قد يختلف محتوى الوصفات بناءً على توفرها باللغة التي اخترتها.'
  }
};

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const t = (key: string, fallback?: string): string => {
    return translations[language]?.[key] || fallback || key;
  };

  const direction: 'ltr' | 'rtl' = isRTL ? 'rtl' : 'ltr';

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
