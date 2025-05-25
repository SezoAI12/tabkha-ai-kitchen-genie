
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  { code: 'es', name: 'Español', flag: '🇪🇸', direction: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', direction: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', direction: 'ltr' },
];

export default function LanguageSettingsPage() {
  const { language, setLanguage } = useRTL();
  const { toast } = useToast();

  const handleSaveLanguage = () => {
    toast({
      title: 'Language Updated',
      description: `Your language has been set to ${languages.find(lang => lang.code === language)?.name}`,
    });
  };

  return (
    <PageContainer header={{ title: 'Language Settings', showBackButton: true }}>
      <div className="p-4 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Globe className="h-8 w-8 text-wasfah-bright-teal" />
              <div>
                <h2 className="text-2xl font-bold">Language Preferences</h2>
                <p className="text-gray-600">Select your preferred language for the app interface</p>
              </div>
            </div>

            <RadioGroup 
              value={language} 
              onValueChange={(value) => {
                setLanguage(value);
              }} 
              className="space-y-4"
            >
              {languages.map((lang) => (
                <div key={lang.code} className="flex items-center space-x-2 border p-4 rounded-lg hover:border-wasfah-bright-teal">
                  <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
                  <Label htmlFor={`lang-${lang.code}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </div>
                      {language === lang.code && (
                        <Check className="h-5 w-5 text-wasfah-bright-teal" />
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button 
              onClick={handleSaveLanguage} 
              className="w-full mt-6 bg-wasfah-bright-teal hover:bg-wasfah-teal"
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4">Language Information</h3>
            <p className="text-gray-600">
              The app interface will be displayed in your selected language. 
              Recipe content may vary based on availability in your chosen language. 
              To contribute translations, please contact our support team.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
