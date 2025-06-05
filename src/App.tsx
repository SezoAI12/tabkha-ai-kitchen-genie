import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { RTLProvider } from './contexts/RTLContext';
import { AuthProvider } from './contexts/AuthContext';
import { initializeAdminDemo, isAdminAuthenticated } from './lib/adminAuth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';
import AdminDashboard from './pages/admin/AdminDashboardPage';
import AdminUsers from './pages/admin/AdminUsersPage';
import AdminRecipes from './pages/admin/AdminRecipesPage';
import AdminIngredients from './pages/admin/AdminIngredientsPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminSecurityPage from './pages/admin/AdminSecurityPage';
import AdminIntegrationsPage from './pages/admin/AdminIntegrationsPage';
import AdminIntegrationsManager from './pages/admin/AdminIntegrationsManager';
import AdminUserTypesPage from './pages/admin/AdminUserTypesPage';
import AdminAccountingPage from './pages/admin/AdminAccountingPage';
import AdminSystemPage from './pages/admin/AdminSystemPage';
import AdminMaintenancePage from './pages/admin/AdminMaintenancePage';
import CommunityPage from './pages/CommunityPage';
import ContentLibraryPage from './pages/admin/ContentLibraryPage';
import TranslationsPage from './pages/admin/TranslationsPage';
import LanguagesPage from './pages/admin/LanguagesPage';
import ImageControlPage from './pages/admin/ImageControlPage';
import NotificationsPage from './pages/NotificationsPage';
import SubscriptionsPage from './pages/admin/SubscriptionsPage';
import AdvertisementPage from './pages/admin/AdvertisementPage';
import SupportTicketsPage from './pages/admin/SupportTicketsPage';
import AIFindByIngredientsPage from './pages/AIFindByIngredientsPage';
import ScanDishPage from './pages/ScanDishPage';
import GlobalCuisinePage from './pages/GlobalCuisinePage';
import MealPlanPage from './pages/MealPlanPage';
import HealthTrackingHomePage from './pages/HealthTrackingHomePage';
import PantryPage from './pages/PantryPage';
import FavoritesPage from './pages/FavoritesPage';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Initialize admin demo accounts
    initializeAdminDemo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    return isAdminAuthenticated() ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <ThemeProvider>
      <RTLProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/find-by-ingredients" element={<AIFindByIngredientsPage />} />
              <Route path="/scan-dish" element={<ScanDishPage />} />
              <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
              <Route path="/meal-plan" element={<MealPlanPage />} />
              <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
              <Route path="/pantry" element={<PantryPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="recipes" element={<AdminRecipes />} />
                <Route path="ingredients" element={<AdminIngredients />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="security" element={<AdminSecurityPage />} />
                <Route path="integrations" element={<AdminIntegrationsPage />} />
                <Route path="integrations-manager" element={<AdminIntegrationsManager />} />
                <Route path="user-types" element={<AdminUserTypesPage />} />
                <Route path="accounting" element={<AdminAccountingPage />} />
                <Route path="system" element={<AdminSystemPage />} />
                <Route path="maintenance" element={<AdminMaintenancePage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="content-library" element={<ContentLibraryPage />} />
                <Route path="translations" element={<TranslationsPage />} />
                <Route path="languages" element={<LanguagesPage />} />
                <Route path="images" element={<ImageControlPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="subscriptions" element={<SubscriptionsPage />} />
                <Route path="advertisements" element={<AdvertisementPage />} />
                <Route path="support-tickets" element={<SupportTicketsPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </RTLProvider>
    </ThemeProvider>
  );
};

export default App;
