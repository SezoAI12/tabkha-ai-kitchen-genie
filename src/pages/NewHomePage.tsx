
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ChevronRight, ChefHat, Heart, TrendingUp, Award, Coffee, Calendar, Camera, Plus, Activity, ShoppingCart, User, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useRTL } from '@/contexts/RTLContext';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';

interface QuickAction {
  title: string;
  titleAr: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  route: string;
  color: string;
  category: string;
}

interface FeaturedRecipe {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  time: number;
  servings: number;
  rating: number;
  difficulty: string;
  category: string;
  image: string;
  trending?: boolean;
}

const quickActions: QuickAction[] = [
  // Cooking & Planning
  {
    title: 'By Ingredients',
    titleAr: 'بالمكونات',
    description: 'Find recipes by ingredients',
    icon: ChefHat,
    route: '/find-by-ingredients',
    color: 'bg-wasfah-bright-teal',
    category: 'cooking'
  },
  {
    title: 'Global Cuisine',
    titleAr: 'المطبخ العالمي',
    description: 'Explore world cuisines',
    icon: Star,
    route: '/global-cuisine',
    color: 'bg-wasfah-bright-teal',
    category: 'cooking'
  },
  {
    title: 'Meal Plan',
    titleAr: 'خطة الوجبات',
    description: 'Plan your meals',
    icon: Calendar,
    route: '/meal-plan',
    color: 'bg-wasfah-bright-teal',
    category: 'cooking'
  },
  {
    title: 'Scan Dish',
    titleAr: 'مسح الطبق',
    description: 'Scan and identify dishes',
    icon: Camera,
    route: '/scan-dish',
    color: 'bg-wasfah-bright-teal',
    category: 'cooking'
  },
  {
    title: 'Create Recipe',
    titleAr: 'إنشاء وصفة',
    description: 'Create your own recipe',
    icon: Plus,
    route: '/create-recipe',
    color: 'bg-wasfah-bright-teal',
    category: 'cooking'
  },
  {
    title: 'Pantry',
    titleAr: 'المخزن',
    description: 'Manage your pantry',
    icon: ShoppingCart,
    route: '/pantry',
    color: 'bg-wasfah-bright-teal',
    category: 'cooking'
  },
  // Community & Rewards
  {
    title: 'Health Tracking',
    titleAr: 'تتبع الصحة',
    description: 'Track your health',
    icon: Heart,
    route: '/health-tracking-home',
    color: 'bg-purple-500',
    category: 'community'
  },
  {
    title: 'Rewards',
    titleAr: 'المكافآت',
    description: 'Earn rewards',
    icon: Award,
    route: '/loyalty',
    color: 'bg-purple-500',
    category: 'community'
  },
  {
    title: 'Shared Recipes',
    titleAr: 'الوصفات المشتركة',
    description: 'Share your recipes',
    icon: Share2,
    route: '/shared-recipes',
    color: 'bg-purple-500',
    category: 'community'
  },
  {
    title: 'Community',
    titleAr: 'المجتمع',
    description: 'Join the community',
    icon: Users,
    route: '/community',
    color: 'bg-purple-500',
    category: 'community'
  },
  {
    title: 'AI Chef',
    titleAr: 'الطاهي الذكي',
    description: 'AI cooking assistant',
    icon: ChefHat,
    route: '/ai-chef',
    color: 'bg-purple-500',
    category: 'community'
  },
  {
    title: 'Subscription',
    titleAr: 'الاشتراك',
    description: 'Manage subscription',
    icon: User,
    route: '/subscription',
    color: 'bg-purple-500',
    category: 'community'
  }
];

// Mock meal plan data
const mockMealPlan = {
  id: '1',
  date: new Date().toISOString().split('T')[0],
  meals: [
    {
      id: '1',
      type: 'breakfast',
      name: 'Avocado Toast',
      nameAr: 'توست الأفوكادو',
      calories: 280,
      time: '8:00 AM'
    },
    {
      id: '2',
      type: 'lunch',
      name: 'Mediterranean Salad',
      nameAr: 'سلطة متوسطية',
      calories: 350,
      time: '1:00 PM'
    }
  ]
};

export default function NewHomePage() {
  const { t } = useRTL();

  const cookingActions = quickActions.filter(action => action.category === 'cooking');
  const communityActions = quickActions.filter(action => action.category === 'community');

  return (
    <PageContainer>
      <div className="space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-wasfah-deep-teal">
            {t('WasfahAI', 'واصفة AI')}
          </h1>
          <Button variant="ghost" size="sm">
            <div className="w-6 h-6 rounded-full bg-gray-300"></div>
          </Button>
        </div>

        {/* Loyalty Card */}
        <LoyaltyCard />

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t('Quick Actions', 'إجراءات سريعة')}
          </h2>
          
          {/* Cooking & Planning Section */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">
              {t('Cooking & Planning', 'الطبخ والتخطيط')}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {cookingActions.map((action, index) => (
                <Link key={index} to={action.route}>
                  <Card className="p-3 text-center hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {t(action.title, action.titleAr)}
                      </h4>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Community & Rewards Section */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">
              {t('Community & Rewards', 'المجتمع والمكافآت')}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {communityActions.map((action, index) => (
                <Link key={index} to={action.route}>
                  <Card className="p-3 text-center hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {t(action.title, action.titleAr)}
                      </h4>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Meal Plan */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('Your meal plan today', 'خطة وجباتك اليوم')}
            </h2>
            <Link to="/meal-plan">
              <Button variant="ghost" size="sm" className="text-wasfah-bright-teal">
                {t('View Week', 'عرض الأسبوع')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <TodayMealPlan mealPlan={mockMealPlan} />
        </div>
      </div>
    </PageContainer>
  );
}
