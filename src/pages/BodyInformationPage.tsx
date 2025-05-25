
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Heart, Scale, Ruler, Calendar } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const bodyInformationSchema = z.object({
  weight: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Weight must be a positive number",
  }),
  height: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Height must be a positive number",
  }),
  targetWeight: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Target weight must be a positive number",
  }),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
  gender: z.enum(["male", "female", "other"]),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "veryActive"]),
});

type BodyInformationFormValues = z.infer<typeof bodyInformationSchema>;

export default function BodyInformationPage() {
  const { t } = useRTL();
  const { toast } = useToast();
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  
  const form = useForm<BodyInformationFormValues>({
    resolver: zodResolver(bodyInformationSchema),
    defaultValues: {
      weight: "",
      height: "",
      targetWeight: "",
      birthDate: "",
      gender: "male",
      activityLevel: "moderate",
    },
  });
  
  const calculateMetrics = (data: BodyInformationFormValues) => {
    const weight = Number(data.weight);
    const height = Number(data.height) / 100; // Convert cm to meters
    const age = calculateAge(new Date(data.birthDate));
    
    // Calculate BMI: weight (kg) / (height (m) * height (m))
    const calculatedBmi = weight / (height * height);
    setBmi(Math.round(calculatedBmi * 10) / 10);
    
    // Calculate BMR using Harris-Benedict Equation
    let calculatedBmr = 0;
    
    if (data.gender === "male") {
      calculatedBmr = 88.362 + (13.397 * weight) + (4.799 * Number(data.height)) - (5.677 * age);
    } else {
      calculatedBmr = 447.593 + (9.247 * weight) + (3.098 * Number(data.height)) - (4.330 * age);
    }
    
    // Apply activity factor
    const activityFactors = {
      sedentary: 1.2,      // Little or no exercise
      light: 1.375,        // Light exercise 1-3 days/week
      moderate: 1.55,      // Moderate exercise 3-5 days/week
      active: 1.725,       // Heavy exercise 6-7 days/week
      veryActive: 1.9,     // Very heavy exercise, physical job or training twice a day
    };
    
    calculatedBmr *= activityFactors[data.activityLevel];
    setBmr(Math.round(calculatedBmr));
  };
  
  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  const onSubmit = (data: BodyInformationFormValues) => {
    calculateMetrics(data);
    
    toast({
      title: t("Information Saved", "تم حفظ المعلومات"),
      description: t("Your body information has been updated", "تم تحديث معلومات جسمك"),
    });
  };
  
  const getBmiCategory = (bmiValue: number): string => {
    if (bmiValue < 18.5) return t("Underweight", "نقص الوزن");
    if (bmiValue < 25) return t("Normal weight", "وزن طبيعي");
    if (bmiValue < 30) return t("Overweight", "زيادة الوزن");
    return t("Obese", "سمنة");
  };
  
  const getBmiColor = (bmiValue: number): string => {
    if (bmiValue < 18.5) return "text-blue-500";
    if (bmiValue < 25) return "text-green-500";
    if (bmiValue < 30) return "text-yellow-500";
    return "text-red-500";
  };
  
  return (
    <PageContainer
      header={{
        title: t('Body Information', 'معلومات الجسم'),
        showBackButton: true,
      }}
    >
      <div className="space-y-6 pb-20">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>{t('Enter Your Body Metrics', 'أدخل قياسات جسمك')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Scale className="mr-2 h-4 w-4" />
                          {t('Current Weight (kg)', 'الوزن الحالي (كجم)')}
                        </FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="70" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Ruler className="mr-2 h-4 w-4" />
                          {t('Height (cm)', 'الطول (سم)')}
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="170" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="targetWeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('Target Weight (kg)', 'الوزن المستهدف (كجم)')}</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="65" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {t('Birth Date', 'تاريخ الميلاد')}
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('Gender', 'الجنس')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("Select gender", "اختر الجنس")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">{t("Male", "ذكر")}</SelectItem>
                            <SelectItem value="female">{t("Female", "أنثى")}</SelectItem>
                            <SelectItem value="other">{t("Other", "آخر")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="activityLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('Activity Level', 'مستوى النشاط')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("Select activity level", "اختر مستوى النشاط")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sedentary">{t("Sedentary (little or no exercise)", "خامل (قليل أو لا تمارين)")}</SelectItem>
                            <SelectItem value="light">{t("Light (exercise 1-3 times/week)", "خفيف (تمارين 1-3 مرات/أسبوع)")}</SelectItem>
                            <SelectItem value="moderate">{t("Moderate (exercise 3-5 times/week)", "معتدل (تمارين 3-5 مرات/أسبوع)")}</SelectItem>
                            <SelectItem value="active">{t("Active (daily exercise or intense 3-4 times/week)", "نشط (تمارين يومية أو مكثفة 3-4 مرات/أسبوع)")}</SelectItem>
                            <SelectItem value="veryActive">{t("Very Active (intense exercise 6-7 times/week)", "نشط جدًا (تمارين مكثفة 6-7 مرات/أسبوع)")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-wasfah-bright-teal hover:bg-wasfah-teal"
                >
                  {t('Save Information', 'حفظ المعلومات')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {(bmi !== null || bmr !== null) && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{t('Your Health Metrics', 'مؤشراتك الصحية')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bmi !== null && (
                  <div className="bg-wasfah-light-gray/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Scale className="mr-2 h-5 w-5 text-wasfah-bright-teal" />
                      <h3 className="font-medium">{t('Your BMI', 'مؤشر كتلة الجسم')}</h3>
                    </div>
                    <div className="flex items-baseline">
                      <span className={`text-3xl font-bold ${getBmiColor(bmi)}`}>{bmi}</span>
                      <span className="ml-2 text-gray-500">kg/m²</span>
                    </div>
                    <p className="mt-1 text-sm">{t('Category', 'التصنيف')}: 
                      <span className={`font-medium ml-1 ${getBmiColor(bmi)}`}>
                        {getBmiCategory(bmi)}
                      </span>
                    </p>
                  </div>
                )}
                
                {bmr !== null && (
                  <div className="bg-wasfah-light-gray/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Heart className="mr-2 h-5 w-5 text-wasfah-bright-teal" />
                      <h3 className="font-medium">{t('Daily Calorie Needs', 'الاحتياجات اليومية من السعرات')}</h3>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-wasfah-bright-teal">{bmr}</span>
                      <span className="ml-2 text-gray-500">kcal/day</span>
                    </div>
                    <p className="mt-1 text-sm">{t('Based on your activity level', 'بناء على مستوى نشاطك')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
