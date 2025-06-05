
import { Routes, Route } from 'react-router-dom';
import AdminPage from '@/pages/AdminPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminUserTypes from '@/pages/admin/AdminUserTypes';
import AdminRecipes from '@/pages/admin/AdminRecipes';
import AdminAnalyticsPage from '@/pages/admin/AdminAnalyticsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import AdminSecurityPage from '@/pages/admin/AdminSecurityPage';
import AdminCommunicationsPage from '@/pages/admin/AdminCommunicationsPage';
import AdminRecipeApproval from '@/pages/admin/AdminRecipeApproval';
import AdminIngredients from '@/pages/admin/AdminIngredients';
import SupportTicketsPage from '@/pages/admin/SupportTicketsPage';
import AdminCommunityPage from '@/pages/admin/CommunityPage';
import AdminNotificationsPage from '@/pages/admin/NotificationsPage';
import AdvertisementPage from '@/pages/admin/AdvertisementPage';
import ContentLibraryPage from '@/pages/admin/ContentLibraryPage';
import TranslationsPage from '@/pages/admin/TranslationsPage';
import LanguagesPage from '@/pages/admin/LanguagesPage';
import SubscriptionsPage from '@/pages/admin/SubscriptionsPage';
import AdminImageControlPage from '@/pages/admin/AdminImageControlPage';
import AdminIntegrationsPage from '@/pages/admin/AdminIntegrationsPage';
import AdminIngredientImagesManager from '@/pages/admin/AdminIngredientImagesManager';
import AdminAccountingPage from '@/pages/admin/AdminAccountingPage';
import AdminRewardsPage from '@/pages/admin/AdminRewardsPage';
import AdminSystemPage from '@/pages/admin/AdminSystemPage';
import AdminMaintenancePage from '@/pages/admin/AdminMaintenancePage';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/" element={<AdminPage />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="user-types" element={<AdminUserTypes />} />
        <Route path="recipes" element={<AdminRecipes />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="security" element={<AdminSecurityPage />} />
        <Route path="communications" element={<AdminCommunicationsPage />} />
        <Route path="recipe-approval" element={<AdminRecipeApproval />} />
        <Route path="ingredients" element={<AdminIngredients />} />
        <Route path="support-tickets" element={<SupportTicketsPage />} />
        <Route path="community" element={<AdminCommunityPage />} />
        <Route path="notifications" element={<AdminNotificationsPage />} />
        <Route path="advertisement" element={<AdvertisementPage />} />
        <Route path="image-control" element={<AdminImageControlPage />} />
        <Route path="content-library" element={<ContentLibraryPage />} />
        <Route path="translations" element={<TranslationsPage />} />
        <Route path="languages" element={<LanguagesPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="integrations" element={<AdminIntegrationsPage />} />
        <Route path="ingredient-images" element={<AdminIngredientImagesManager />} />
        <Route path="accounting" element={<AdminAccountingPage />} />
        <Route path="rewards" element={<AdminRewardsPage />} />
        <Route path="system" element={<AdminSystemPage />} />
        <Route path="maintenance" element={<AdminMaintenancePage />} />
      </Route>
    </Routes>
  );
};
