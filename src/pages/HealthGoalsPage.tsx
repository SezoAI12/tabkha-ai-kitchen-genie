
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Target, Trophy, Calendar, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';

interface HealthGoal {
  id: string;
  title: string;
  description: string;
  category: 'weight' | 'nutrition' | 'exercise' | 'sleep' | 'wellness';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: 'active' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high';
}

const HealthGoalsPage = () => {
  const { t } = useRTL();
  const { toast } = useToast();
  
  const [goals, setGoals] = useState<HealthGoal[]>([
    {
      id: '1',
      title: 'Lose Weight',
      description: 'Reach my target weight for better health',
      category: 'weight',
      targetValue: 70,
      currentValue: 75,
      unit: 'kg',
      deadline: '2024-06-01',
      status: 'active',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Daily Water Intake',
      description: 'Drink enough water daily for hydration',
      category: 'wellness',
      targetValue: 8,
      currentValue: 6,
      unit: 'glasses',
      deadline: '2024-12-31',
      status: 'active',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Weekly Exercise',
      description: 'Exercise regularly for fitness',
      category: 'exercise',
      targetValue: 5,
      currentValue: 5,
      unit: 'days/week',
      deadline: '2024-12-31',
      status: 'completed',
      priority: 'high'
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    targetValue: '',
    unit: '',
    deadline: '',
    priority: 'medium'
  });

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.category || !newGoal.targetValue) {
      toast({
        title: t('Error', 'خطأ'),
        description: t('Please fill in all required fields', 'يرجى ملء جميع الحقول المطلوبة'),
        variant: 'destructive'
      });
      return;
    }

    const goal: HealthGoal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category as HealthGoal['category'],
      targetValue: parseFloat(newGoal.targetValue),
      currentValue: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      status: 'active',
      priority: newGoal.priority as HealthGoal['priority']
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      category: '',
      targetValue: '',
      unit: '',
      deadline: '',
      priority: 'medium'
    });
    setShowAddGoal(false);

    toast({
      title: t('Goal Added', 'تم إضافة الهدف'),
      description: t('Your health goal has been created successfully', 'تم إنشاء هدفك الصحي بنجاح'),
    });
  };

  const updateGoalProgress = (goalId: string, newValue: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updated = { ...goal, currentValue: newValue };
        if (newValue >= goal.targetValue) {
          updated.status = 'completed';
        }
        return updated;
      }
      return goal;
    }));

    toast({
      title: t('Progress Updated', 'تم تحديث التقدم'),
      description: t('Your goal progress has been updated', 'تم تحديث تقدم هدفك'),
    });
  };

  const getProgressPercentage = (goal: HealthGoal) => {
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weight': return '⚖️';
      case 'nutrition': return '🥗';
      case 'exercise': return '🏃';
      case 'sleep': return '😴';
      case 'wellness': return '🧘';
      default: return '🎯';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <PageContainer
      header={{
        title: t('Health Goals', 'الأهداف الصحية'),
        showBackButton: true,
      }}
      className="bg-gradient-to-br from-wasfah-light-gray to-white min-h-screen"
    >
      <div className="space-y-6 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-wasfah-deep-teal">
            {t('Set & Track Your Health Goals', 'حدد وتتبع أهدافك الصحية')}
          </h2>
          <p className="text-gray-600">
            {t('Create personalized health objectives and monitor your progress', 'أنشئ أهداف صحية شخصية وراقب تقدمك')}
          </p>
        </div>

        {/* Goals Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-wasfah-bright-teal mx-auto mb-2" />
              <div className="text-2xl font-bold text-wasfah-deep-teal">
                {goals.filter(g => g.status === 'active').length}
              </div>
              <p className="text-sm text-gray-600">{t('Active Goals', 'الأهداف النشطة')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {goals.filter(g => g.status === 'completed').length}
              </div>
              <p className="text-sm text-gray-600">{t('Completed', 'مكتملة')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(goals.reduce((sum, goal) => sum + getProgressPercentage(goal), 0) / goals.length) || 0}%
              </div>
              <p className="text-sm text-gray-600">{t('Avg Progress', 'متوسط التقدم')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Goal Button */}
        <div className="text-center mb-6">
          <Button 
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('Add New Goal', 'إضافة هدف جديد')}
          </Button>
        </div>

        {/* Add Goal Form */}
        {showAddGoal && (
          <Card>
            <CardHeader>
              <CardTitle>{t('Create New Health Goal', 'إنشاء هدف صحي جديد')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goalTitle">{t('Goal Title', 'عنوان الهدف')} *</Label>
                  <Input
                    id="goalTitle"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    placeholder={t('e.g., Lose 5kg', 'مثال: فقدان 5 كيلو')}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('Category', 'الفئة')} *</Label>
                  <Select value={newGoal.category} onValueChange={(value) => setNewGoal({...newGoal, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Select category', 'اختر الفئة')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight">{t('Weight Management', 'إدارة الوزن')}</SelectItem>
                      <SelectItem value="nutrition">{t('Nutrition', 'التغذية')}</SelectItem>
                      <SelectItem value="exercise">{t('Exercise', 'التمارين')}</SelectItem>
                      <SelectItem value="sleep">{t('Sleep', 'النوم')}</SelectItem>
                      <SelectItem value="wellness">{t('General Wellness', 'الصحة العامة')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goalDescription">{t('Description', 'الوصف')}</Label>
                <Textarea
                  id="goalDescription"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  placeholder={t('Describe your goal...', 'اوصف هدفك...')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetValue">{t('Target Value', 'القيمة المستهدفة')} *</Label>
                  <Input
                    id="targetValue"
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({...newGoal, targetValue: e.target.value})}
                    placeholder="70"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">{t('Unit', 'الوحدة')}</Label>
                  <Input
                    id="unit"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                    placeholder={t('kg, days, hours', 'كجم، أيام، ساعات')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">{t('Deadline', 'الموعد النهائي')}</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t('Priority', 'الأولوية')}</Label>
                <Select value={newGoal.priority} onValueChange={(value) => setNewGoal({...newGoal, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">{t('High', 'عالية')}</SelectItem>
                    <SelectItem value="medium">{t('Medium', 'متوسطة')}</SelectItem>
                    <SelectItem value="low">{t('Low', 'منخفضة')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleAddGoal} className="bg-wasfah-bright-teal hover:bg-wasfah-teal">
                  {t('Create Goal', 'إنشاء الهدف')}
                </Button>
                <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                  {t('Cancel', 'إلغاء')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id} className={goal.status === 'completed' ? 'border-green-200 bg-green-50' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-2xl">{getCategoryIcon(goal.category)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{goal.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(goal.priority)}`}>
                          {t(goal.priority, goal.priority)}
                        </span>
                        {goal.status === 'completed' && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      
                      {goal.description && (
                        <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                      )}
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{t('Progress', 'التقدم')}</span>
                          <span className="font-medium">
                            {goal.currentValue} / {goal.targetValue} {goal.unit}
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${goal.status === 'completed' ? 'bg-green-500' : 'bg-wasfah-bright-teal'}`}
                            style={{ width: `${getProgressPercentage(goal)}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{Math.round(getProgressPercentage(goal))}% {t('complete', 'مكتمل')}</span>
                          {goal.deadline && (
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {goal.deadline}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {goal.status === 'active' && (
                        <div className="mt-4 flex items-center space-x-2">
                          <Input
                            type="number"
                            placeholder={t('Update progress', 'تحديث التقدم')}
                            className="w-32"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                const value = parseFloat((e.target as HTMLInputElement).value);
                                if (!isNaN(value)) {
                                  updateGoalProgress(goal.id, value);
                                  (e.target as HTMLInputElement).value = '';
                                }
                              }
                            }}
                          />
                          <span className="text-sm text-gray-500">{goal.unit}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {goals.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('No Health Goals Yet', 'لا توجد أهداف صحية بعد')}</h3>
              <p className="text-gray-600 mb-4">
                {t('Create your first health goal to start tracking your progress', 'أنشئ هدفك الصحي الأول لبدء تتبع تقدمك')}
              </p>
              <Button 
                onClick={() => setShowAddGoal(true)}
                className="bg-wasfah-bright-teal hover:bg-wasfah-teal text-white"
              >
                {t('Add Your First Goal', 'أضف هدفك الأول')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default HealthGoalsPage;
