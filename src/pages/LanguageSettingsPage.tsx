
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

const LanguageSettingsPage = () => {
  const { toast } = useToast();
  const { language, setLanguage, t } = useRTL();

  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleSaveLanguage = async () => {
    console.log('Saving language preference:', selectedLanguage);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // Update the global language state
      setLanguage(selectedLanguage);

      toast({
        title: t('settings.language.saved.success'),
      });
    } catch (error) {
      console.error("Failed to save language:", error);
      toast({
        title: t('settings.language.saved.error'),
        variant: "destructive",
      });
    }
  };

  const availableLanguages = [
    { code: 'en', name: t('language.en') },
    { code: 'ar', name: t('language.ar') },
    { code: 'fr', name: t('language.fr') },
  ];

  return (
    <PageContainer
      header={{
        title: t('settings.language.title'),
        showBackButton: true,
      }}
    >
      <div className="space-y-6 p-4">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">{t('settings.language.available')}</h3>
            <RadioGroup value={selectedLanguage} onValueChange={handleLanguageChange}>
              {availableLanguages.map((lang) => (
                <div key={lang.code} className="flex items-center space-x-2">
                  <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
                  <Label htmlFor={`lang-${lang.code}`}>{lang.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Button onClick={handleSaveLanguage} className="w-full">
          {t('settings.language.save')}
        </Button>
      </div>
    </PageContainer>
  );
};

export default LanguageSettingsPage;
