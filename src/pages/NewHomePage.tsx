
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ChevronRight, ChefHat, Sparkles, Heart, TrendingUp, Award, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useRTL } from '@/contexts/RTLContext';

interface QuickAction {
  title: string;
  titleAr: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  route: string;
  color: string;
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
  {
    title: 'AI Discovery',
    titleAr: 'الاكتشاف الذكي',
    description: 'Find recipes with AI',
    icon: Sparkles,
    route: '/ai-features',
    color: 'bg-gradient-to-br from-purple-500 to-indigo-600'
  },
  {
    title: 'Recipes',
    titleAr: 'وصفات',
    description: 'Browse all recipes',
    icon: ChefHat,
    route: '/recipes',
    color: 'bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal'
  },
  {
    title: 'Meal Plan',
    titleAr: 'خطة الوجبات',
    description: 'Plan your meals',
    icon: Clock,
    route: '/meal-plan',
    color: 'bg-gradient-to-br from-orange-500 to-red-500'
  },
  {
    title: 'Favorites',
    titleAr: 'المفضلة',
    description: 'Your saved recipes',
    icon: Heart,
    route: '/favorites',
    color: 'bg-gradient-to-br from-pink-500 to-rose-500'
  }
];

const featuredRecipes: FeaturedRecipe[] = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    titleAr: 'سلطة الكينوا المتوسطية',
    description: 'Healthy bowl with quinoa, vegetables, and tahini dressing',
    descriptionAr: 'وعاء صحي مع الكينوا والخضروات وصلصة الطحينة',
    time: 25,
    servings: 2,
    rating: 4.8,
    difficulty: 'Easy',
    category: 'Food',
    image: '/placeholder.svg',
    trending: true
  },
  {
    id: '2',
    title: 'Chocolate Avocado Mousse',
    titleAr: 'موس الشوكولاتة والأفوكادو',
    description: 'Creamy healthy dessert made with avocado and cocoa',
    descriptionAr: 'حلوى صحية كريمية مصنوعة من الأفوكادو والكاكاو',
    time: 15,
    servings: 4,
    rating: 4.6,
    difficulty: 'Easy',
    category: 'Desserts',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Green Detox Smoothie',
    titleAr: 'عصير التخلص من السموم الأخضر',
    description: 'Refreshing green smoothie packed with nutrients',
    descriptionAr: 'عصير أخضر منعش مليء بالعناصر الغذائية',
    time: 5,
    servings: 1,
    rating: 4.4,
    difficulty: 'Easy',
    category: 'Drinks',
    image: '/placeholder.svg'
  }
];

const mealCategories = [
  { name: 'Food', nameAr: 'طعام', icon: '🍽️', color: 'bg-orange-100 text-orange-800' },
  { name: 'Desserts', nameAr: 'حلويات', icon: '🍰', color: 'bg-pink-100 text-pink-800' },
  { name: 'Drinks', nameAr: 'مشروبات', icon: '🥤', color: 'bg-blue-100 text-blue-800' }
];

export default function NewHomePage() {
  const { t } = useRTL();

  return (
    <PageContainer>
      <div className="space-y-8 pb-24">
        {/* Enhanced Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-wasfah-bright-teal via-wasfah-deep-teal to-purple-600 p-8 rounded-3xl text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <ChefHat className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {t('Welcome to WasfahAI', 'مرحباً بك في واصفة AI')}
            </h1>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {t('Discover, create, and enjoy amazing recipes with the power of artificial intelligence', 
                 'اكتشف واصنع واستمتع بوصفات مذهلة بقوة الذكاء الاصطناعي')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/ai-features">
                <Button 
                  size="lg" 
                  className="bg-white text-wasfah-deep-teal hover:bg-gray-100 font-semibold shadow-lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t('Try AI Features', 'جرب ميزات الذكاء الاصطناعي')}
                </Button>
              </Link>
              <Link to="/recipes">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-wasfah-deep-teal font-semibold"
                >
                  <ChefHat className="mr-2 h-5 w-5" />
                  {t('Browse Recipes', 'تصفح الوصفات')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t('Quick Actions', 'إجراءات سريعة')}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.route}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 overflow-hidden">
                  <CardContent className="p-6 text-center relative">
                    <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <action.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {t(action.title, action.titleAr)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recipe Categories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t('Recipe Categories', 'فئات الوصفات')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mealCategories.map((category, index) => (
              <Link key={index} to={`/recipes?category=${category.name}`}>
                <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      {t(category.name, category.nameAr)}
                    </h3>
                    <Badge className={category.color}>
                      {t('Explore', 'استكشف')}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Features Highlight */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Sparkles className="mr-3 h-6 w-6 text-purple-600" />
                  {t('AI-Powered Cooking Experience', 'تجربة الطبخ بالذكاء الاصطناعي')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                  {t('Discover personalized recipes, get smart cooking tips, and enjoy features that adapt to your preferences.', 
                     'اكتشف وصفات شخصية واحصل على نصائح طبخ ذكية واستمتع بميزات تتكيف مع تفضيلاتك.')}
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 px-3 py-1">
                    <Award className="h-3 w-3 mr-1" />
                    {t('Smart Discovery', 'الاكتشاف الذكي')}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {t('Personalized Recommendations', 'توصيات شخصية')}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                    <Coffee className="h-3 w-3 mr-1" />
                    {t('Meal Time Planning', 'تخطيط أوقات الوجبات')}
                  </Badge>
                </div>
                <Link to="/ai-features">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
                    <Sparkles className="mr-2 h-5 w-5" />
                    {t('Explore AI Features', 'استكشف ميزات الذكاء الاصطناعي')}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl p-8 text-white text-center">
                  <ChefHat className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <div className="text-sm opacity-90">
                    {t('Powered by Advanced AI', 'مدعوم بالذكاء الاصطناعي المتقدم')}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Featured Recipes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('Featured Recipes', 'الوصفات المميزة')}
            </h2>
            <Link to="/recipes">
              <Button variant="ghost" size="sm" className="text-wasfah-bright-teal hover:text-wasfah-deep-teal">
                {t('View All', 'عرض الكل')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ChefHat className="h-20 w-20 text-white opacity-30" />
                  </div>
                  {recipe.trending && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {t('Trending', 'رائج')}
                    </Badge>
                  )}
                  <Badge className="absolute top-3 right-3 bg-white text-wasfah-deep-teal">
                    {recipe.difficulty}
                  </Badge>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {recipe.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-wasfah-bright-teal transition-colors">
                    {t(recipe.title, recipe.titleAr)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {t(recipe.description, recipe.descriptionAr)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
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
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full hover:bg-wasfah-bright-teal hover:text-white hover:border-wasfah-bright-teal transition-all"
                  >
                    {t('View Recipe', 'عرض الوصفة')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Community Section */}
        <Card className="bg-gradient-to-r from-wasfah-bright-teal/10 to-wasfah-deep-teal/10 border-wasfah-bright-teal/20">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <Heart className="h-16 w-16 mx-auto mb-6 text-wasfah-bright-teal" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('Join Our Cooking Community', 'انضم إلى مجتمع الطبخ')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                {t('Share your favorite recipes, discover new flavors, and connect with passionate home cooks from around the world', 
                   'شارك وصفاتك المفضلة واكتشف نكهات جديدة وتواصل مع طهاة البيوت المتحمسين من جميع أنحاء العالم')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/community">
                  <Button size="lg" className="bg-wasfah-bright-teal hover:bg-wasfah-deep-teal shadow-lg">
                    <Heart className="mr-2 h-5 w-5" />
                    {t('Explore Community', 'استكشف المجتمع')}
                  </Button>
                </Link>
                <Link to="/create-recipe">
                  <Button size="lg" variant="outline" className="border-wasfah-bright-teal text-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white">
                    <ChefHat className="mr-2 h-5 w-5" />
                    {t('Share Recipe', 'شارك وصفة')}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
