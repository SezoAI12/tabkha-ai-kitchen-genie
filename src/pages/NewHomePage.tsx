
import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
import { mockMealPlan } from '@/data/mockData';
import { ChefHat, Heart, Users, Award, Calendar, Box, PlusCircle, Camera, Share2, Bot, CreditCard } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const NewHomePage = () => {
  const { t } = useRTL();

  // Grouped Quick Actions
  const quickActionsCookingPlanning = [
    { icon: <ChefHat className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("By Ingredients", "حسب المكونات"), path: "/ai-find-by-ingredients" },
    { icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("Global Cuisine", "المطبخ العالمي"), path: "/global-cuisine" },
    { icon: <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("Meal Plan", "خطة الوجبات"), path: "/meal-plan" },
    { icon: <Camera className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("Scan Dish", "مسح الطبق"), path: "/scan-dish" },
    { icon: <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("Create Recipe", "إنشاء وصفة"), path: "/create-recipe" },
    { icon: <Box className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("Pantry", "المخزن"), path: "/pantry" },
  ];

  const quickActionsCommunityRewards = [
    { icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("Health Tracking", "تتبع الصحة"), path: "/health-tracking-home" },
    { icon: <Award className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("Rewards", "المكافآت"), path: "/loyalty-program" },
    { icon: <Share2 className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("Shared Recipes", "الوصفات المشتركة"), path: "/shared-recipes" },
    { icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("Community", "المجتمع"), path: "/community" },
    { icon: <Bot className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("AI Features", "ميزات الذكاء الاصطناعي"), path: "/ai-features" },
    { icon: <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />, label: t("Subscription", "الاشتراك"), path: "/subscription" },
  ];

  return (
    <PageContainer
      header={{
        title: "WasfahAI",
        showBackButton: false
      }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-24 pt-2 sm:pt-4">
        <div className="px-3 sm:px-4">
          <SubscriptionBanner />
        </div>
        
        <div className="px-3 sm:px-4">
          <LoyaltyCard />
        </div>

        {/* Quick Actions Grouped */}
        <div className="px-3 sm:px-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t("Quick Actions", "الإجراءات السريعة")}
          </h2>
          
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
            {t("Cooking & Planning", "الطبخ والتخطيط")}
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {quickActionsCookingPlanning.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="flex flex-col items-center p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-center min-h-[80px] sm:min-h-[100px]"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-wasfah-bright-teal/10 rounded-full flex items-center justify-center mb-1 sm:mb-2 text-wasfah-bright-teal">
                  {action.icon}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 leading-tight text-center">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
          
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
            {t("Community & Rewards", "المجتمع والمكافآت")}
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {quickActionsCommunityRewards.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="flex flex-col items-center p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-center min-h-[80px] sm:min-h-[100px]"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mb-1 sm:mb-2 text-purple-600 dark:text-purple-300">
                  {action.icon}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 leading-tight text-center">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-3 sm:px-4">
          <TodayMealPlan mealPlan={mockMealPlan} />
        </div>
      </div>
    </PageContainer>
  );
};

export default NewHomePage;
