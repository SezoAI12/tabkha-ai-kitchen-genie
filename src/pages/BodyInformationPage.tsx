import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Heart, Scale, Ruler, Calendar } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import ProgressBar from '@/components/ProgressBar';

// Design tokens
const inputClass = 'border border-token-border rounded-md p-2 focus:border-token-accent';
const errorClass = 'text-token-error text-sm mt-1';
const sectionBg = 'bg-token-bg-secondary p-4 rounded-lg';

// Validation schema
const schema = z.object({
 weight: z.number().positive({ message: 'Must be > 0' }),
 height: z.number().positive({ message: 'Must be > 0' }),
 targetWeight: z.number().positive({ message: 'Must be > 0' }),
 birthDate: z.string().refine(d => !isNaN(Date.parse(d)), { message: 'Invalid date' }),
 gender: z.enum(['male','female','other']),
 activityLevel: z.enum(['sedentary','light','moderate','active','veryActive']),
});

type FormData = z.infer<typeof schema>;

// Reusable input field component
const TextField: React.FC<{ name: keyof FormData; label: React.ReactNode; type?: string }> = ({ name, label, type = 'text' }) => {
 const { register, formState: { errors } } = useFormContext<FormData>();
 return (
    <div>
      <label className="block font-medium">{label}</label>
      <input
        type={type}
        step={type === 'number' ? '0.1' : undefined}
        className={`${inputClass} w-full`} // Added w-full for full width
        {...register(name, { valueAsNumber: type === 'number' })}
      />
      {errors[name] && <p className={errorClass}>{errors[name]?.message as string}</p>}
    </div>
 );
};

// Reusable select field component
const SelectField: React.FC<{ name: keyof FormData; label: React.ReactNode; options: { value: string; label: string }[] }> = ({ name, label, options }) => {
 const { register, formState: { errors } } = useFormContext<FormData>();
 return (
    <div>
      <label className="block font-medium">{label}</label>
      <select {...register(name)} className={`${inputClass} w-full`}> {/* Added w-full for full width */}
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      {errors[name] && <p className={errorClass}>{errors[name]?.message as string}</p>}
    </div>
 );
};

// Metric Card Component
const MetricCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
 <div className="flex items-center p-4 bg-white rounded-lg shadow">
    <div className="mr-3 text-token-accent">{icon}</div>
    <div>
      <p className="font-medium">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
 </div>
);

export default function BodyInformationPage() {
 const { t } = useRTL();
 const { toast } = useToast();
 const [bmi, setBmi] = useState<number | null>(null);
 const [bmr, setBmr] = useState<number | null>(null);
 const [eta, setEta] = useState<string>('');

 const methods = useForm<FormData>({
 resolver: zodResolver(schema),
 defaultValues: { weight: NaN, height: NaN, targetWeight: NaN, birthDate: '', gender: 'male', activityLevel: 'moderate' }
 });

 const { handleSubmit, watch } = methods;
 const watchValues = watch(['weight','targetWeight']);

 useEffect(() => {
 const [w,t] = watchValues;
 if (w && t && !isNaN(w) && !isNaN(t)) {
 // Calculate progress: if current weight is greater than target, progress is based on difference
 // if target weight is greater than current, progress is also based on difference (weight gain scenario)
 const totalDifference = Math.abs(methods.getValues('weight') - methods.getValues('targetWeight'));
 const currentDifference = Math.abs(w - methods.getValues('targetWeight'));
 
 let progress = 0;
 if (totalDifference > 0) {
    progress = ((totalDifference - currentDifference) / totalDifference) * 100;
 }
 methods.setValue('progress', progress); // Assuming 'progress' can be set in form data or used directly


 // estimate at 0.5 kg/week
 const weeks = Math.abs(w - t) / 0.5;
 setEta(`${Math.ceil(weeks)} week${weeks > 1 || weeks === 0 ? 's' : ''}`);
 } else {
    setEta(t('N/A')); // Set to N/A if weights are not valid numbers
 }
 }, [watchValues, methods, t]);

 const onSubmit = (data: FormData) => {
 const weight = data.weight;
 const heightM = data.height / 100;
 const age = calculateAge(new Date(data.birthDate));
 const calcBmi = weight / (heightM * heightM);
 setBmi(Number(calcBmi.toFixed(1)));

 let val = data.gender === 'male'
 ? 88.362 + (13.397 * weight) + (4.799 * data.height) - (5.677 * age)
 : 447.593 + (9.247 * weight) + (3.098 * data.height) - (4.33 * age);
 const factors = { sedentary:1.2, light:1.375, moderate:1.55, active:1.725, veryActive:1.9 };
 setBmr(Math.round(val * factors[data.activityLevel]));

 toast({ title: t('Saved'), description: t('Your info updated') });
 };

 return (
 <PageContainer header={{ title: t('Body Information'), showBackButton: true }}>
    <div className="space-y-6 pb-20">
      <Card>
        <CardHeader><CardTitle>{t('Enter Your Body Metrics')}</CardTitle></CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField name="weight" label={<><Scale className="inline-block mr-1"/> {t('Current Weight (kg)')}</>} type="number" />
              <TextField name="height" label={<><Ruler className="inline-block mr-1"/> {t('Height (cm)')}</>} type="number" />
              <TextField name="targetWeight" label={<><Heart className="inline-block mr-1"/> {t('Target Weight (kg)')}</>} type="number" />
              <TextField name="birthDate" label={<><Calendar className="inline-block mr-1"/> {t('Birth Date')}</>} type="date" />
              <SelectField name="gender" label={t('Gender')} options={[{value:'male',label:t('Male')},{value:'female',label:t('Female')},{value:'other',label:t('Other')}]}/>
              <SelectField name="activityLevel" label={t('Activity Level')} options={[
                {value:'sedentary',label:t('Sedentary')},
                {value:'light',label:t('Light')},
                {value:'moderate',label:t('Moderate')},
                {value:'active',label:t('Active')},
                {value:'veryActive',label:t('Very Active')}
              ]}/>
              <div className="md:col-span-2">
                <ProgressBar value={(watchValues[0] && watchValues[1] && !isNaN(watchValues[0]) && !isNaN(watchValues[1])) ? ( (Math.abs(methods.getValues('weight') - methods.getValues('targetWeight')) - Math.abs(watchValues[0] - methods.getValues('targetWeight'))) / Math.abs(methods.getValues('weight') - methods.getValues('targetWeight')) * 100 ) : 0} label={t('Progress to target')} />
                <p className="mt-2 text-sm">{t('Estimated time to reach target')}: {eta}</p>
              </div>
              <Button type="submit" className="md:col-span-2 bg-token-accent hover:bg-token-accent-dark w-full">
                {t('Save')} <ArrowRight className="ml-2"/>
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      {(bmi || bmr) && (
        <Card className={sectionBg}>
          <CardHeader><CardTitle>{t('Your Health Metrics')}</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bmi && <MetricCard icon={<Scale/>} label={t('BMI')} value={`${bmi} kg/m²`} />}
              {bmr && <MetricCard icon={<Heart/>} label={t('Daily Calories')} value={`${bmr} kcal/day`} />}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
 </PageContainer>
 );
}

function calculateAge(d: Date) {
 const diff = new Date().getTime() - d.getTime();
 return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // Corrected to use 365.25 for a more accurate year calculation
}
