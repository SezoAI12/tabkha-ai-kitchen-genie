
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scale, TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';

interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  notes?: string;
}

const WeightManagementPage = () => {
  const { t } = useRTL();
  const { toast } = useToast();
  
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [muscleMass, setMuscleMass] = useState('');
  const [notes, setNotes] = useState('');
  
  const [weightHistory] = useState<WeightEntry[]>([
    {
      id: '1',
      date: '2024-01-01',
      weight: 75.5,
      bodyFat: 18.2,
      muscleMass: 32.1,
      notes: 'Starting weight'
    },
    {
      id: '2',
      date: '2024-01-15',
      weight: 74.8,
      bodyFat: 17.9,
      muscleMass: 32.3,
      notes: 'Good progress'
    }
  ]);

  const handleAddEntry = () => {
    if (!currentWeight) {
      toast({
        title: t('Error', 'خطأ'),
        description: t('Please enter your current weight', 'يرجى إدخال وزنك الحالي'),
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: t('Weight Entry Added', 'تم إضافة إدخال الوزن'),
      description: t('Your weight has been recorded successfully', 'تم تسجيل وزنك بنجاح'),
    });

    // Reset form
    setCurrentWeight('');
    setBodyFat('');
    setMuscleMass('');
    setNotes('');
  };

  const getWeightTrend = () => {
    if (weightHistory.length < 2) return null;
    const latest = weightHistory[weightHistory.length - 1].weight;
    const previous = weightHistory[weightHistory.length - 2].weight;
    const change = latest - previous;
    
    return {
      change: Math.abs(change),
      isIncrease: change > 0,
      isDecrease: change < 0
    };
  };

  const trend = getWeightTrend();

  return (
    <PageContainer
      header={{
        title: t('Weight Management', 'إدارة الوزن'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-wasfah-deep-teal">
            {t('Track Your Progress', 'تتبع تقدمك')}
          </h2>
          <p className="text-gray-600">
            {t('Monitor your weight and body composition changes', 'راقب تغيرات وزنك وتركيب جسمك')}
          </p>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Scale className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-2" />
              <div className="text-2xl font-bold text-wasfah-deep-teal">
                {weightHistory[weightHistory.length - 1]?.weight || '--'} kg
              </div>
              <p className="text-sm text-gray-600">{t('Current Weight', 'الوزن الحالي')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {targetWeight || '--'} kg
              </div>
              <p className="text-sm text-gray-600">{t('Target Weight', 'الوزن المستهدف')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              {trend && (
                <>
                  {trend.isIncrease ? (
                    <TrendingUp className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  ) : trend.isDecrease ? (
                    <TrendingDown className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  ) : (
                    <Scale className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                  )}
                  <div className={`text-2xl font-bold ${trend.isIncrease ? 'text-red-600' : 'text-green-600'}`}>
                    {trend.isIncrease ? '+' : '-'}{trend.change.toFixed(1)} kg
                  </div>
                  <p className="text-sm text-gray-600">{t('Recent Change', 'التغيير الأخير')}</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add New Entry */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-wasfah-bright-teal" />
              <span>{t('Add Weight Entry', 'إضافة إدخال الوزن')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentWeight">
                  {t('Current Weight (kg)', 'الوزن الحالي (كجم)')}
                </Label>
                <Input
                  id="currentWeight"
                  type="number"
                  step="0.1"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  placeholder="75.5"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetWeight">
                  {t('Target Weight (kg)', 'الوزن المستهدف (كجم)')}
                </Label>
                <Input
                  id="targetWeight"
                  type="number"
                  step="0.1"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  placeholder="70.0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bodyFat">
                  {t('Body Fat % (optional)', 'نسبة الدهون % (اختياري)')}
                </Label>
                <Input
                  id="bodyFat"
                  type="number"
                  step="0.1"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  placeholder="18.5"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="muscleMass">
                  {t('Muscle Mass kg (optional)', 'كتلة العضلات كجم (اختياري)')}
                </Label>
                <Input
                  id="muscleMass"
                  type="number"
                  step="0.1"
                  value={muscleMass}
                  onChange={(e) => setMuscleMass(e.target.value)}
                  placeholder="32.0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">
                {t('Notes (optional)', 'ملاحظات (اختياري)')}
              </Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('How are you feeling today?', 'كيف تشعر اليوم؟')}
              />
            </div>

            <Button 
              onClick={handleAddEntry}
              className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
            >
              {t('Add Entry', 'إضافة إدخال')}
            </Button>
          </CardContent>
        </Card>

        {/* Weight History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-wasfah-bright-teal" />
              <span>{t('Weight History', 'تاريخ الوزن')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weightHistory.slice().reverse().map((entry) => (
                <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">{entry.weight} kg</div>
                    <div className="text-sm text-gray-600">{entry.date}</div>
                    {entry.notes && (
                      <div className="text-sm text-gray-500 italic">{entry.notes}</div>
                    )}
                  </div>
                  <div className="text-right text-sm">
                    {entry.bodyFat && <div>{t('Body Fat:', 'دهون الجسم:')} {entry.bodyFat}%</div>}
                    {entry.muscleMass && <div>{t('Muscle:', 'العضلات:')} {entry.muscleMass} kg</div>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default WeightManagementPage;
