
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

const NewHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MobileHeader />
      <PageContainer>
        <div className="space-y-6 pb-20">
          <QuickActionsSection />
          <TodayMealPlan />
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
