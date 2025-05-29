
import React, { useState } from 'react';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRTL } from '@/contexts/RTLContext';

export interface ScanDishResult {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
}

interface ScanDishComponentProps {
  onScanResult: (result: ScanDishResult) => void;
}

export const ScanDishComponent: React.FC<ScanDishComponentProps> = ({ onScanResult }) => {
  const { toast } = useToast();
  const { t } = useRTL();
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate AI scanning process
    setTimeout(() => {
      const mockResult: ScanDishResult = {
        id: Date.now().toString(),
        name: t('Grilled Chicken Salad', 'سلطة الدجاج المشوي'),
        calories: 320,
        protein: 28,
        carbs: 12,
        fat: 18,
        ingredients: [
          t('Grilled chicken breast', 'صدر دجاج مشوي'),
          t('Mixed greens', 'خضار مشكلة'),
          t('Cherry tomatoes', 'طماطم كرزية'),
          t('Cucumber', 'خيار'),
          t('Olive oil', 'زيت زيتون'),
          t('Lemon juice', 'عصير ليمون')
        ]
      };
      
      setIsScanning(false);
      onScanResult(mockResult);
      
      toast({
        title: t('Dish Scanned Successfully', 'تم مسح الطبق بنجاح'),
        description: t('Nutritional information has been analyzed.', 'تم تحليل المعلومات الغذائية.'),
      });
    }, 2000);
  };

  const handleUpload = () => {
    toast({
      title: t('Upload Feature', 'ميزة التحميل'),
      description: t('Image upload will be implemented soon.', 'سيتم تنفيذ تحميل الصور قريباً.'),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-wasfah-deep-teal dark:text-wasfah-bright-teal">
          <Camera className="h-5 w-5 mr-2 rtl:ml-2" />
          {t('Dish Scanner', 'ماسح الطبق')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
            {isScanning ? (
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-wasfah-bright-teal mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-300">{t('Analyzing dish...', 'جاري تحليل الطبق...')}</p>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">{t('Point camera at your dish', 'وجه الكاميرا نحو طبقك')}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handleScan}
            disabled={isScanning}
            className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
          >
            {isScanning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 rtl:ml-2 animate-spin" />
                {t('Scanning...', 'جاري المسح...')}
              </>
            ) : (
              <>
                <Camera className="h-4 w-4 mr-2 rtl:ml-2" />
                {t('Scan Dish', 'مسح الطبق')}
              </>
            )}
          </Button>

          <Button 
            variant="outline" 
            onClick={handleUpload}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2 rtl:ml-2" />
            {t('Upload Photo', 'تحميل صورة')}
          </Button>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {t('AI will analyze your dish and provide nutritional information', 'سيقوم الذكاء الاصطناعي بتحليل طبقك وتقديم المعلومات الغذائية')}
        </div>
      </CardContent>
    </Card>
  );
};
