import React, { useMemo, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NutritionGoals } from '@/components/nutrition/NutritionGoals';
import { NutritionProgressChart } from '@/components/nutrition/NutritionProgressChart';
import { NutritionSummary } from '@/components/nutrition/NutritionSummary';
import { NutritionEntryForm } from '@/components/nutrition/NutritionEntryForm';
import { NutritionTip } from '@/components/nutrition/NutritionTip';
import { Activity, Scale, CalendarDays, ArrowLeftRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DailyIndependenceChallenges } from '@/components/health/DailyIndependenceChallenges';
import { BMICalculator } from '@/components/health/BMICalculator';
import { useRTL } from '@/contexts/RTLContext';
import { useUserHealth } from './useUserHealth';

const IngredientSwapCard = ({ swap, t }) => (
  <Card className="border border-gray-200 dark:border-gray-700">
    <CardContent className="p-4">
      <h4 className="font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal flex items-center mb-3">
        <Tag className="h-4 w-4 mr-2" />
        {t('Instead of', 'بدلاً من')} <span className="text-wasfah-bright-teal ml-1">{swap.original}</span>, {t('try', 'جرب')}:
      </h4>
      <div className="space-y-3">
        {swap.alternatives.map((alt, altIdx) => (
          <div key={altIdx} className="bg-wasfah-light-gray dark:bg-gray-800 p-3 rounded-md">
            <div className="flex justify-between">
              <h5 className="font-medium">{alt.name}</h5>
              <span className="text-xs bg-wasfah-bright-teal text-white px-2 py-0.5 rounded-full">{alt.ratio}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alt.benefits}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const ActionButton = ({ to, children, variant = "default", icon }) => (
  <Link to={to}>
    <Button className={`w-full ${variant === "outline" ? "border-wasfah-bright-teal text-wasfah-bright-teal" : "bg-wasfah-bright-teal hover:bg-wasfah-teal"}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  </Link>
);

export default function HealthTrackingHomePage() {
  const { t } = useRTL();
  const {
    isHealthGoalsOpen,
    setIsHealthGoalsOpen,
    userWeight,
    userHeight,
    userTargetWeight,
  } = useUserHealth();

  const handleApplyTip = (tip) => console.log('Applied tip:', tip);
  const handleNutritionSubmit = (data) => console.log('Nutrition data submitted:', data);

  const ingredientSwaps = useMemo(() => ([
    {
      original: 'Butter',
      alternatives: [
        { name: 'Olive Oil', benefits: 'Heart-healthy fats, less saturated fat', ratio: '3/4 cup for 1 cup butter' },
        { name: 'Greek Yogurt', benefits: 'Lower fat, higher protein', ratio: '1/2 cup for 1 cup butter' },
        { name: 'Applesauce', benefits: 'No fat, adds moisture', ratio: '1 cup for 1 cup butter' },
      ],
    },
    {
      original: 'Sugar',
      alternatives: [
        { name: 'Honey', benefits: 'Natural sweetener, contains antioxidants', ratio: '3/4 cup for 1 cup sugar' },
        { name: 'Maple Syrup', benefits: 'Contains minerals, lower glycemic index', ratio: '3/4 cup for 1 cup sugar' },
        { name: 'Stevia', benefits: 'Zero calories, natural sweetener', ratio: '1 tsp for 1 cup sugar' },
      ],
    },
    {
      original: 'White Flour',
      alternatives: [
        { name: 'Almond Flour', benefits: 'Low carb, high protein, gluten-free', ratio: '1:1 replacement' },
        { name: 'Coconut Flour', benefits: 'High fiber, low carb', ratio: '1/4 cup for 1 cup flour' },
        { name: 'Whole Wheat Flour', benefits: 'More fiber and nutrients', ratio: '1:1 replacement' },
      ],
    },
  ]), []);

  const mockNutritionData = useMemo(() => ([
    { date: 'Mon', calories: 1800, protein: 85, carbs: 210, fat: 55 },
    { date: 'Tue', calories: 2100, protein: 95, carbs: 240, fat: 60 },
    { date: 'Wed', calories: 1950, protein: 90, carbs: 225, fat: 58 },
    { date: 'Thu', calories: 2000, protein: 92, carbs: 230, fat: 59 },
    { date: 'Fri', calories: 1900, protein: 88, carbs: 220, fat: 57 },
    { date: 'Sat', calories: 2200, protein: 100, carbs: 250, fat: 62 },
    { date: 'Sun', calories: 1850, protein: 86, carbs: 215, fat: 56 },
  ]), []);

  const recentMeals = useMemo(() => ([
    { id: 1, type: t('Breakfast', 'إفطار'), time: t('Yesterday, 8:30 AM', 'الأمس، 8:30 صباحًا'), calories: 450, macros: { protein: 25, carbs: 45, fat: 15 } },
    { id: 2, type: t('Lunch', 'غداء'), time: t('Yesterday, 1:00 PM', 'الأمس، 1:00 مساءً'), calories: 600, macros: { protein: 35, carbs: 60, fat: 20 } },
    { id: 3, type: t('Dinner', 'عشاء'), time: t('Yesterday, 7:00 PM', 'الأمس، 7:00 مساءً'), calories: 500, macros: { protein: 30, carbs: 50, fat: 18 } },
  ]), [t]);

  return (
    <PageContainer header={{ title: t('Health & Tracking', 'الصحة والتتبع'), showBackButton: true }}>
      <div className="space-y-6 pb-20">
        <NutritionTip
          tip={t(
            "Based on your recent activity and diet patterns, I recommend increasing protein intake by 15g daily while reducing carbs slightly to help reach your weight goal of 65kg.",
            "بناءً على أنماط نشاطك ونظامك الغذائي الأخيرة، أوصي بزيادة تناول البروتين بمقدار 15 جرام يوميًا مع تقليل الكربوهيدرات قليلاً للمساعدة في الوصول إلى هدفك في الوزن وهو 65 كجم."
          )}
          source="Wasfah AI"
          onApply={handleApplyTip}
          type="ai"
        />

        <BMICalculator
          userWeight={userWeight}
          userHeight={userHeight}
          userTargetWeight={userTargetWeight}
          initialWeight={75}
          isHealthGoalsOpen={isHealthGoalsOpen}
          setIsHealthGoalsOpen={setIsHealthGoalsOpen}
        />

        <DailyIndependenceChallenges />

        <Tabs defaultValue="track">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="track" aria-label={t('Track', 'تتبع')}>
              <Activity className="h-4 w-4 mr-1" />
              {t('Track', 'تتبع')}
            </TabsTrigger>
            <TabsTrigger value="goals" aria-label={t('Goals', 'الأهداف')}>
              <Scale className="h-4 w-4 mr-1" />
              {t('Goals', 'الأهداف')}
            </TabsTrigger>
            <TabsTrigger value="swaps" aria-label={t('Swaps', 'البدائل')}>
              <ArrowLeftRight className="h-4 w-4 mr-1" />
              {t('Swaps', 'البدائل')}
            </TabsTrigger>
            <TabsTrigger value="history" aria-label={t('History', 'السجل')}>
              <CalendarDays className="h-4 w-4 mr-1" />
              {t('History', 'السجل')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="track" className="space-y-4 mt-4">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardContent className="pt-6">
                <NutritionSummary
                  calories={{ consumed: 1450, target: 2000 }}
                  protein={{ consumed: 75, target: 120 }}
                  carbs={{ consumed: 180, target: 240 }}
                  fat={{ consumed: 48, target: 65 }}
                />
              </CardContent>
            </Card>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal">
                {t("Add Today's Nutrition", "أضف التغذية اليوم")}
              </h3>
              <NutritionEntryForm onSubmit={handleNutritionSubmit} />
            </div>

            <div className="flex flex-col gap-2">
              <ActionButton to="/health-tracking" icon={<Activity className="mr-2 h-4 w-4" />}>
                {t('Detailed Tracking', 'التتبع التفصيلي')}
              </ActionButton>
              <ActionButton to="/body-information" variant="outline">
                {t('Body Information', 'معلومات الجسم')}
              </ActionButton>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4 mt-4">
            <Card><CardContent className="pt-6"><NutritionGoals /></CardContent></Card>
            <ActionButton to="/nutrition-goals">
              {t('Update Nutrition Goals', 'تحديث أهداف التغذية')}
            </ActionButton>
            <ActionButton to="/dietary-preferences" variant="outline">
              {t('Manage Dietary Preferences', 'إدارة التفضيلات الغذائية')}
            </ActionButton>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal">
              {t('Healthier Ingredient Alternatives', 'بدائل المكونات الصحية')}
            </h3>
            <div className="space-y-4">
              {ingredientSwaps.map((swap, index) => (
                <IngredientSwapCard key={index} swap={swap} t={t} />
              ))}
            </div>
            <ActionButton to="/ingredient-swap" icon={<ArrowLeftRight className="mr-2 h-4 w-4" />}>
              {t('View All Ingredient Swaps', 'عرض جميع بدائل المكونات')}
            </ActionButton>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal mb-2">
                  {t('Weekly Progress', 'التقدم الأسبوعي')}
                </h3>
                {mockNutritionData.length > 0 ? (
                  <NutritionProgressChart data={mockNutritionData} type="weekly" />
                ) : (
                  <p className="text-sm text-gray-500">{t('No data available', 'لا توجد بيانات متاحة')}</p>
                )}
              </CardContent>
            </Card>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-wasfah-deep-teal dark:text-wasfah-bright-teal">
                {t('Recent Meals', 'الوجبات الأخيرة')}
              </h3>
              {recentMeals.map((meal) => (
                <Card key={meal.id} className="border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{meal.type}</p>
                      <p className="text-xs text-gray-500">{meal.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-wasfah-bright-teal">{meal.calories} kcal</p>
                      <p className="text-xs text-gray-500">P: {meal.macros.protein}g | C: {meal.macros.carbs}g | F: {meal.macros.fat}g</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ActionButton to="/health-tracking">
              {t('View Complete History', 'عرض السجل الكامل')}
            </ActionButton>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
