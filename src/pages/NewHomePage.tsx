
import React, { useState } from 'react';
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
import { mockRecipes, mockPantryItems, mockMealPlans, categories } from '@/data/mockData';

const NewHomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter recipes based on selected category
  const filteredRecipes = selectedCategory === 'All' 
    ? mockRecipes.slice(0, 4) 
    : mockRecipes.filter(recipe => 
        recipe.categories.includes(selectedCategory)
      ).slice(0, 4);

  // Get expiring items (items expiring in the next 3 days)
  const today = new Date();
  const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
  
  const expiringItems = mockPantryItems.filter(item => {
    if (!item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    return expiryDate <= threeDaysFromNow;
  });

  // Get today's meal plan
  const todayMealPlan = mockMealPlans.find(plan => 
    plan.date === today.toISOString().split('T')[0]
  ) || mockMealPlans[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MobileHeader />
      <PageContainer>
        <div className="space-y-6 pb-20">
          <QuickActionsSection />
          <TodayMealPlan mealPlan={todayMealPlan} />
          <RecommendedRecipes 
            recipes={filteredRecipes}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <DailyIndependenceChallenges />
          <ExpiringIngredients expiringItems={expiringItems} />
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
