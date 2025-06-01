import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ChevronRight, ChefHat, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useRTL } from '@/contexts/RTLContext';

interface QuickAction {
  title: string;
  titleAr: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  route: string;
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
}

const quickActions: QuickAction[] = [
  {
    title: 'Recipes',
    titleAr: 'وصفات',
    description: 'Explore thousands of delicious recipes',
    icon: ChefHat,
    route: '/recipes'
  },
  {
    title: 'Meal Plan',
    titleAr: 'خطة الوجبات',
    description: 'Plan your meals for the week',
    icon: Clock,
    route: '/meal-plan'
  },
  {
    title: 'Pantry',
    titleAr: 'المخزن',
    description: 'Manage your pantry items',
    icon: Users,
    route: '/pantry'
  },
  {
    title: 'Favorites',
    titleAr: 'المفضلة',
    description: 'View your favorite recipes',
    icon: Star,
    route: '/favorites'
  }
];

const featuredRecipes: FeaturedRecipe[] = [
  {
    id: '1',
    title: 'Spaghetti Bolognese',
    titleAr: 'معكرونة بولونيز',
    description: 'Classic Italian pasta dish with a rich meat sauce',
    descriptionAr: 'طبق معكرونة إيطالي كلاسيكي مع صلصة لحم غنية',
    time: 45,
    servings: 4,
    rating: 4.5,
    difficulty: 'Medium'
  },
  {
    id: '2',
    title: 'Chicken Stir Fry',
    titleAr: 'دجاج مقلي',
    description: 'Quick and easy stir fry with chicken and vegetables',
    descriptionAr: 'سريع وسهل مع الدجاج والخضروات',
    time: 30,
    servings: 2,
    rating: 4.2,
    difficulty: 'Easy'
  }
];

export default function NewHomePage() {
  const { t } = useRTL();

  return (
    <PageContainer>
      <div className="space-y-6 pb-24">
        {/* Header Section */}
        <div className="text-center bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-8 rounded-2xl text-white">
          <h1 className="text-3xl font-bold mb-2">
            {t('Welcome to WasfahAI', 'مرحباً بك في واصفة AI')}
          </h1>
          <p className="text-lg opacity-90 mb-4">
            {t('Your intelligent cooking companion', 'رفيقك الذكي في الطبخ')}
          </p>
          <Link to="/ai-features">
            <Button 
              size="lg" 
              className="bg-white text-wasfah-deep-teal hover:bg-gray-100 font-semibold"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {t('Explore AI Features', 'استكشف ميزات الذكاء الاصطناعي')}
            </Button>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.route}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                    {t(action.title, action.titleAr)}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* AI Features Highlight */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                  {t('AI-Powered Cooking', 'الطبخ بالذكاء الاصطناعي')}
                </h2>
                <p className="text-gray-600 mb-4">
                  {t('Discover recipes, get cooking tips, and receive personalized recommendations with our advanced AI features.', 
                     'اكتشف الوصفات واحصل على نصائح الطبخ وتوصيات شخصية مع ميزات الذكاء الاصطناعي المتقدمة.')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {t('Recipe Discovery', 'اكتشاف الوصفات')}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {t('Voice Assistant', 'المساعد الصوتي')}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {t('Smart Adaptation', 'التكيف الذكي')}
                  </Badge>
                </div>
              </div>
              <Link to="/ai-features" className="ml-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  {t('Try Now', 'جربها الآن')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Featured Recipes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('Featured Recipes', 'الوصفات المميزة')}
            </h2>
            <Link to="/recipes">
              <Button variant="ghost" size="sm">
                {t('View All', 'عرض الكل')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ChefHat className="h-16 w-16 text-white opacity-50" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-white text-wasfah-deep-teal">
                    {recipe.difficulty}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t(recipe.title, recipe.titleAr)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t(recipe.description, recipe.descriptionAr)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{recipe.time} {t('min', 'دقيقة')}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{recipe.servings} {t('servings', 'حصص')}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                      <span>{recipe.rating}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3 hover:bg-wasfah-bright-teal hover:text-white"
                  >
                    {t('View Recipe', 'عرض الوصفة')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-wasfah-bright-teal" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('Join Our Community', 'انضم إلى مجتمعنا')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('Share recipes, get tips, and connect with fellow food lovers', 
                 'شارك الوصفات واحصل على النصائح وتواصل مع محبي الطعام')}
            </p>
            <Link to="/community">
              <Button className="bg-wasfah-bright-teal hover:bg-wasfah-deep-teal">
                {t('Explore Community', 'استكشف المجتمع')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
