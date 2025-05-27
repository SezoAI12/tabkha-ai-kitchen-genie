
import React from 'react';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { MobileNavbar } from '@/components/layout/MobileNavbar';
import { PageContainer } from '@/components/layout/PageContainer';
import { QuickActionsSection } from '@/components/home/QuickActionsSection';
import { TodayMealPlan } from '@/components/home/TodayMealPlan';
import { RecommendedRecipes } from '@/components/home/RecommendedRecipes';
import { ExpiringIngredients } from '@/components/home/ExpiringIngredients';
import { LoyaltyCard } from '@/components/home/LoyaltyCard';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
import { DailyIndependenceChallenges } from '@/components/health/DailyIndependenceChallenges';
import { AdminLink } from '@/components/admin/AdminLink';
import { MealPlan } from '@/types';

const NewHomePage = () => {
  // Mock meal plan data
  const mockMealPlan: MealPlan = {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    meals: [
      {
        id: 'breakfast-1',
        type: 'breakfast',
        recipe: {
          id: 'recipe-1',
          title: 'Avocado Toast',
          description: 'Healthy breakfast with avocado',
          image: '/placeholder.svg',
          prepTime: 10,
          cookTime: 5,
          servings: 1,
          difficulty: 'Easy',
          calories: 320,
          rating: 4.5,
          ratingCount: 128,
          ingredients: [],
          instructions: [],
          categories: ['Breakfast', 'Healthy'],
          tags: ['quick', 'nutritious'],
          isFavorite: false
        }
      },
      {
        id: 'lunch-1',
        type: 'lunch',
        recipe: {
          id: 'recipe-2',
          title: 'Quinoa Salad',
          description: 'Fresh and nutritious salad',
          image: '/placeholder.svg',
          prepTime: 15,
          cookTime: 0,
          servings: 2,
          difficulty: 'Easy',
          calories: 450,
          rating: 4.7,
          ratingCount: 89,
          ingredients: [],
          instructions: [],
          categories: ['Lunch', 'Vegetarian'],
          tags: ['salad', 'healthy'],
          isFavorite: true
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MobileHeader />
      <PageContainer>
        <div className="space-y-6 pb-20">
          <QuickActionsSection />
          <TodayMealPlan mealPlan={mockMealPlan} />
          <RecommendedRecipes />
          <DailyIndependenceChallenges />
          <ExpiringIngredients />
          <LoyaltyCard />
          <SubscriptionBanner />
        </div>
      </PageContainer>
      <MobileNavbar />
      <AdminLink />
    </div>
  );
};

export default NewHomePage;
