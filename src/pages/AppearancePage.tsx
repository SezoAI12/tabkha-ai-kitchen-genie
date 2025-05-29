// src/pages/AppearancePage.tsx
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun, Palette, Type, Eye, Monitor, Check, Sparkles } from 'lucide-react'; // Added Sparkles icon
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext'; // Assuming useRTL provides translation 't'

// Helper function to convert HSL string to object
const parseHsl = (hsl: string) => {
  const [h, s, l] = hsl.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0];
  return { h, s, l };
};

// Define comprehensive color schemes using HSL values
// These should ideally align with your global CSS variables
const colorSchemes = [
  {
    id: 'default',
    name: 'WasfahAI Default',
    colors: {
      // Light Mode Defaults (adjust these to match your globals.css)
      '--background': '0 0% 100%',
      '--foreground': '222.2 84% 4.9%',
      '--card': '0 0% 100%',
      '--card-foreground': '222.2 84% 4.9%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '222.2 84% 4.9%',
      '--primary': '200 98% 39%', // Example HSL for wasfah-bright-teal
      '--primary-foreground': '0 0% 100%',
      '--secondary': '160 84% 29%', // Example HSL for wasfah-teal
      '--secondary-foreground': '0 0% 100%',
      '--muted': '210 40% 96.1%',
      '--muted-foreground': '215.4 16.3% 46.9%',
      '--accent': '210 40% 96.1%',
      '--accent-foreground': '222.2 84% 4.9%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '214.3 31.8% 91.4%',
      '--input': '214.3 31.8% 91.4%',
      '--ring': '222.2 84% 4.9%',
      '--radius': '0.5rem',

      // Dark Mode Defaults (adjust these to match your globals.css)
      '--dark-background': '222.2 84% 4.9%',
      '--dark-foreground': '210 40% 96.1%',
      '--dark-card': '222.2 84% 4.9%',
      '--dark-card-foreground': '210 40% 96.1%',
      '--dark-popover': '222.2 84% 4.9%',
      '--dark-popover-foreground': '210 40% 96.1%',
      '--dark-primary': '200 98% 59%', // Lighter teal for dark mode
      '--dark-primary-foreground': '222.2 84% 4.9%',
      '--dark-secondary': '160 84% 49%', // Lighter teal for dark mode
      '--dark-secondary-foreground': '222.2 84% 4.9%',
      '--dark-muted': '217.2 32.6% 17.5%',
      '--dark-muted-foreground': '215 20.2% 65.1%',
      '--dark-accent': '217.2 32.6% 17.5%',
      '--dark-accent-foreground': '210 40% 96.1%',
      '--dark-destructive': '0 62.8% 30.6%',
      '--dark-destructive-foreground': '210 40% 96.1%',
      '--dark-border': '217.2 32.6% 17.5%',
      '--dark-input': '217.2 32.6% 17.5%',
      '--dark-ring': '212.7 26.8% 83.9%',
    }
  },
  {
    id: 'warm',
    name: 'Warm Sunset',
    colors: {
      // Light Mode
      '--primary': '38 92% 50%', // Amber
      '--primary-foreground': '0 0% 100%',
      '--secondary': '0 84% 60%', // Red
      '--secondary-foreground': '0 0% 100%',
      // Dark Mode
      '--dark-primary': '38 92% 70%', // Lighter Amber
      '--dark-primary-foreground': '222.2 84% 4.9%',
      '--dark-secondary': '0 84% 70%', // Lighter Red
      '--dark-secondary-foreground': '222.2 84% 4.9%',
      // Inherit other colors from default or define specifically
    }
  },
  {
    id: 'cool',
    name: 'Cool Ocean',
    colors: {
      // Light Mode
      '--primary': '250 80% 60%', // Purple
      '--primary-foreground': '0 0% 100%',
      '--secondary': '190 80% 40%', // Cyan
      '--secondary-foreground': '0 0% 100%',
      // Dark Mode
      '--dark-primary': '250 80% 70%', // Lighter Purple
      '--dark-primary-foreground': '222.2 84% 4.9%',
      '--dark-secondary': '190 80% 50%', // Lighter Cyan
      '--dark-secondary-foreground': '222.2 84% 4.9%',
      // Inherit other colors from default or define specifically
    }
  },
  {
    id: 'nature',
    name: 'Fresh Nature',
    colors: {
      // Light Mode
      '--primary': '150 60% 40%', // Green
      '--primary-foreground': '0 0% 100%',
      '--secondary': '80 70% 50%', // Lime Green
      '--secondary-foreground': '0 0% 0%', // Black foreground for bright green
      // Dark Mode
      '--dark-primary': '150 60% 50%', // Lighter Green
      '--dark-primary-foreground': '222.2 84% 4.9%',
      '--dark-secondary': '80 70% 60%', // Lighter Lime Green
      '--dark-secondary-foreground': '222.2 84% 4.9%',
      // Inherit other colors from default or define specifically
    }
  }
];

// Keys for localStorage
const LS_THEME = 'wasfah_theme';
const LS_FONT_SIZE = 'wasfah_font_size';
const LS_COLOR_SCHEME = 'wasfah_color_scheme';
const LS_REDUCED_MOTION = 'wasfah_reduced_motion';
const LS_HIGH_CONTRAST = 'wasfah_high_contrast';

export default function AppearancePage() {
  const { t } = useRTL(); // Assuming t is available
  const { toast } = useToast();

  // State initialization with localStorage defaults
  const [theme, setTheme] = useState(() => localStorage.getItem(LS_THEME) || 'system');
  const [fontSize, setFontSize] = useState<number[]>(() => {
    const savedSize = localStorage.getItem(LS_FONT_SIZE);
    return savedSize ? [parseInt(savedSize, 10)] : [16];
  });
  const [colorScheme, setColorScheme] = useState(() => localStorage.getItem(LS_COLOR_SCHEME) || 'default');
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem(LS_REDUCED_MOTION) === 'true');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem(LS_HIGH_CONTRAST) === 'true');
  const [darkMode, setDarkMode] = useState(false); // Internal state for actual dark mode class

  // --- Effects to apply settings on mount and state changes ---

  // Effect for Theme (Dark/Light/System)
  useEffect(() => {
    const applyTheme = (currentTheme: string) => {
      const isDark = currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDarkMode(isDark); // Update internal darkMode state

      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem(LS_THEME, currentTheme);
    };

    applyTheme(theme); // Apply initial theme

    // Listen for system theme changes if theme is 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemThemeListener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    mediaQuery.addEventListener('change', systemThemeListener);

    return () => {
      mediaQuery.removeEventListener('change', systemThemeListener);
    };
  }, [theme]); // Re-run effect if theme state changes

  // Effect for Font Size
  useEffect(() => {
    const size = fontSize[0];
    document.documentElement.style.fontSize = `${size}px`;
    localStorage.setItem(LS_FONT_SIZE, size.toString());
  }, [fontSize]); // Re-run effect if fontSize state changes

  // Effect for Color Scheme
  useEffect(() => {
    const scheme = colorSchemes.find(s => s.id === colorScheme);
    if (scheme) {
      // Apply color scheme variables
      for (const [variable, hslValue] of Object.entries(scheme.colors)) {
         document.documentElement.style.setProperty(variable, hslValue);
      }
      // Remove variables from previous scheme if they are not in the new one (optional but good practice)
      // This is complex if schemes only override a subset. A simpler approach is to ensure default scheme sets all,
      // and other schemes only set overrides.
    }
     localStorage.setItem(LS_COLOR_SCHEME, colorScheme);
  }, [colorScheme]); // Re-run effect if colorScheme state changes

  // Effect for Reduced Motion
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('motion-reduce');
    } else {
      document.documentElement.classList.remove('motion-reduce');
    }
    localStorage.setItem(LS_REDUCED_MOTION, String(reducedMotion));
  }, [reducedMotion]); // Re-run effect if reducedMotion state changes

   // Effect for High Contrast
   useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem(LS_HIGH_CONTRAST, String(highContrast));
  }, [highContrast]); // Re-run effect if highContrast state changes


  // --- Handlers ---

  const handleThemeChange = (value: string) => {
    setTheme(value);
    toast({
      title: t("Theme Updated", "تم تحديث السمة"),
      description: t(`Theme changed to ${value}`, `تم تغيير السمة إلى ${value}`),
    });
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    // Effect hook handles applying and saving
    toast({
      title: t("Font Size Updated", "تم تحديث حجم الخط"),
      description: t(`Font size set to ${value[0]}px`, `تم تعيين حجم الخط إلى ${value[0]} بكسل`),
    });
  };

  const handleColorSchemeChange = (schemeId: string) => {
    setColorScheme(schemeId);
    // Effect hook handles applying and saving
    const scheme = colorSchemes.find(s => s.id === schemeId);
    if (scheme) {
      toast({
        title: t("Color Scheme Updated", "تم تحديث نظام الألوان"),
        description: t(`Applied ${scheme.name} color scheme`, `تم تطبيق نظام الألوان ${scheme.name}`),
      });
    }
  };

  const handleReducedMotionChange = (checked: boolean) => {
    setReducedMotion(checked);
    // Effect hook handles applying and saving
    toast({
      title: t("Reduced Motion Updated", "تم تحديث تقليل الحركة"),
      description: checked ? t("Animations minimized", "تم تقليل الرسوم المتحركة") : t("Animations enabled", "تم تمكين الرسوم المتحركة"),
    });
  };

   const handleHighContrastChange = (checked: boolean) => {
    setHighContrast(checked);
    // Effect hook handles applying and saving
    toast({
      title: t("High Contrast Updated", "تم تحديث التباين العالي"),
      description: checked ? t("High contrast enabled", "تم تمكين التباين العالي") : t("High contrast disabled", "تم تعطيل التباين العالي"),
    });
  };


  const previewText = t("The quick brown fox jumps over the lazy dog. This is a preview of how your text will look with the current settings.", "الثعلب البني السريع يقفز فوق الكلب الكسول. هذه معاينة لكيفية ظهور النص الخاص بك بالإعدادات الحالية.");

  return (
    <PageContainer header={{ title: t('Appearance', 'المظهر'), showBackButton: true }}>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('Appearance', 'المظهر')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('Customize how WasfahAI looks and feels', 'تخصيص شكل ومظهر وصفة الذكاء الاصطناعي')}</p>
        </div>

        {/* Theme Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 rtl:space-x-reverse">
              <Palette size={20} />
              {t('Theme', 'السمة')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('light')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Sun size={24} />
                <span>{t('Light', 'فاتح')}</span>
                {theme === 'light' && <Check size={16} className="text-green-500" />}
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('dark')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Moon size={24} />
                <span>{t('Dark', 'داكن')}</span>
                {theme === 'dark' && <Check size={16} className="text-green-500" />}
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('system')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Monitor size={24} />
                <span>{t('System', 'النظام')}</span>
                {theme === 'system' && <Check size={16} className="text-green-500" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Color Scheme */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 rtl:space-x-reverse">
              <Sparkles size={20} /> {/* Using Sparkles for Color Scheme */}
              {t('Color Scheme', 'نظام الألوان')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {colorSchemes.map((scheme) => (
                <Button
                  key={scheme.id}
                  variant={colorScheme === scheme.id ? 'default' : 'outline'}
                  onClick={() => handleColorSchemeChange(scheme.id)}
                  className="flex items-center justify-between p-4 h-auto w-full"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="flex gap-1 rtl:space-x-reverse"> {/* Gap for color circles */}
                      {/* Display primary and secondary colors */}
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                        style={{ backgroundColor: `hsl(${scheme.colors['--primary']})` }}
                      />
                       <div
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                        style={{ backgroundColor: `hsl(${scheme.colors['--secondary']})` }}
                      />
                       {/* Optional: Add more color previews */}
                       {/* <div
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                        style={{ backgroundColor: `hsl(${scheme.colors['--background']})` }}
                      />
                       <div
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                        style={{ backgroundColor: `hsl(${scheme.colors['--foreground']})` }}
                      /> */}
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{t(scheme.name, scheme.name)}</span> {/* Translate scheme name if needed */}
                  </div>
                  {colorScheme === scheme.id && (
                    <Check size={20} className="text-green-500" />
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Font Size */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 rtl:space-x-reverse">
              <Type size={20} />
              {t('Font Size', 'حجم الخط')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Slider
                value={fontSize}
                onValueChange={handleFontSizeChange}
                max={24}
                min={12}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>12px</span>
                <span className="font-medium">{fontSize[0]}px</span>
                <span>24px</span>
              </div>
              <div className="p-4 border rounded-lg">
                <p style={{ fontSize: `${fontSize[0]}px` }}>{previewText}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 rtl:space-x-reverse">
              <Eye size={20} />
              {t('Accessibility', 'إمكانية الوصول')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('Reduce Motion', 'تقليل الحركة')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Minimize animations and transitions', 'تقليل الرسوم المتحركة والانتقالات')}
                </p>
              </div>
              <Switch
                checked={reducedMotion}
                onCheckedChange={handleReducedMotionChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('High Contrast', 'تباين عالي')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Increase contrast for better visibility', 'زيادة التباين لرؤية أفضل')}
                </p>
              </div>
              <Switch
                checked={highContrast}
                onCheckedChange={handleHighContrastChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
