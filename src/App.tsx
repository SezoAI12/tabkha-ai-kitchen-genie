
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import { RTLProvider } from './contexts/RTLContext';
import SplashScreen from './pages/SplashScreen';
import NewHomePage from './pages/NewHomePage';
import AuthPage from './pages/AuthPage';
import MenuPage from './pages/MenuPage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CreateRecipePage from './pages/CreateRecipePage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import MealPlanPage from './pages/MealPlanPage';
import PantryPage from './pages/PantryPage';
import ShoppingListPage from './pages/ShoppingListPage';
import NotificationsPage from './pages/NotificationsPage';
import MainSettingsPage from './pages/MainSettingsPage';
import LanguageSettingsPage from './pages/LanguageSettingsPage';
import AppearancePage from './pages/AppearancePage';
import PrivacyPage from './pages/PrivacyPage';
import HelpPage from './pages/HelpPage';
import ConnectedDevicesPage from './pages/ConnectedDevicesPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import ScanIngredientsPage from './pages/ScanIngredientsPage';
import ScanDishPage from './pages/ScanDishPage';
import FindByIngredientsPage from './pages/FindByIngredientsPage';
import IngredientSwapPage from './pages/IngredientSwapPage';
import GlobalCuisinePage from './pages/GlobalCuisinePage';
import CommunityPage from './pages/CommunityPage';
import SharedRecipesPage from './pages/SharedRecipesPage';
import SharedRecipesTrackingPage from './pages/SharedRecipesTrackingPage';
import HealthInformationPage from './pages/HealthInformationPage';
import BodyInformationPage from './pages/BodyInformationPage';
import DietaryPreferencesPage from './pages/DietaryPreferencesPage';
import NutritionGoalsPage from './pages/NutritionGoalsPage';
import HealthTrackingHomePage from './pages/HealthTrackingHomePage';
import HealthTrackingPage from './pages/HealthTrackingPage';
import LoyaltyProgramPage from './pages/LoyaltyProgramPage';
import NotFound from './pages/NotFound';

// Admin imports
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminRecipes from './pages/admin/AdminRecipes';
import AdminContentLibrary from './pages/admin/AdminContentLibrary';
import AdminIngredientImagesManager from './pages/admin/AdminIngredientImagesManager';
import AdminTranslationsManager from './pages/admin/AdminTranslationsManager';
import AdminStringManager from './pages/admin/AdminStringManager';
import AdminRewardsManager from './pages/admin/AdminRewardsManager';
import AdminLanguageManager from './pages/admin/AdminLanguageManager';
import AdminSubscriptionManager from './pages/admin/AdminSubscriptionManager';
import AdminUserTypesManager from './pages/admin/AdminUserTypesManager';
import AdminAccountingManager from './pages/admin/AdminAccountingManager';
import AdminIntegrationsManager from './pages/admin/AdminIntegrationsManager';
import AdminSystemMonitoring from './pages/admin/AdminSystemMonitoring';
import AdminAuthGuard from './components/admin/AdminAuthGuard';
import SuperAdminGuard from './components/admin/SuperAdminGuard';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RTLProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Main app routes */}
              <Route path="/" element={<SplashScreen />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/home" element={<NewHomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              <Route path="/create-recipe" element={<CreateRecipePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
              <Route path="/meal-plan" element={<MealPlanPage />} />
              <Route path="/pantry" element={<PantryPage />} />
              <Route path="/shopping-list" element={<ShoppingListPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<MainSettingsPage />} />
              <Route path="/settings/language" element={<LanguageSettingsPage />} />
              <Route path="/settings/appearance" element={<AppearancePage />} />
              <Route path="/settings/privacy" element={<PrivacyPage />} />
              <Route path="/settings/help" element={<HelpPage />} />
              <Route path="/settings/connected-devices" element={<ConnectedDevicesPage />} />
              <Route path="/settings/payment-methods" element={<PaymentMethodsPage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/scan-ingredients" element={<ScanIngredientsPage />} />
              <Route path="/scan-dish" element={<ScanDishPage />} />
              <Route path="/find-by-ingredients" element={<FindByIngredientsPage />} />
              <Route path="/ingredient-swap" element={<IngredientSwapPage />} />
              <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/shared-recipes" element={<SharedRecipesPage />} />
              <Route path="/shared-recipes-tracking" element={<SharedRecipesTrackingPage />} />
              <Route path="/health-information" element={<HealthInformationPage />} />
              <Route path="/body-information" element={<BodyInformationPage />} />
              <Route path="/dietary-preferences" element={<DietaryPreferencesPage />} />
              <Route path="/nutrition-goals" element={<NutritionGoalsPage />} />
              <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
              <Route path="/health-tracking" element={<HealthTrackingPage />} />
              <Route path="/loyalty" element={<LoyaltyProgramPage />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={
                <AdminAuthGuard>
                  <AdminPage />
                </AdminAuthGuard>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="recipes" element={<AdminRecipes />} />
                <Route path="ingredients" element={<AdminContentLibrary />} />
                <Route path="ingredient-images" element={<AdminIngredientImagesManager />} />
                <Route path="translations" element={<AdminTranslationsManager />} />
                <Route path="strings" element={<AdminStringManager />} />
                <Route path="rewards" element={<AdminRewardsManager />} />
                <Route path="languages" element={<AdminLanguageManager />} />
                <Route path="subscriptions" element={<AdminSubscriptionManager />} />
                <Route path="analytics" element={<div>Analytics Page</div>} />
                <Route path="communications" element={<div>Communications Page</div>} />
                
                {/* Super Admin only routes */}
                <Route path="user-types" element={
                  <SuperAdminGuard>
                    <AdminUserTypesManager />
                  </SuperAdminGuard>
                } />
                <Route path="accounting" element={
                  <SuperAdminGuard>
                    <AdminAccountingManager />
                  </SuperAdminGuard>
                } />
                <Route path="integrations" element={
                  <SuperAdminGuard>
                    <AdminIntegrationsManager />
                  </SuperAdminGuard>
                } />
                <Route path="system" element={
                  <SuperAdminGuard>
                    <AdminSystemMonitoring />
                  </SuperAdminGuard>
                } />
                <Route path="security" element={
                  <SuperAdminGuard>
                    <div>Security Page</div>
                  </SuperAdminGuard>
                } />
                <Route path="maintenance" element={
                  <SuperAdminGuard>
                    <div>Maintenance Page</div>
                  </SuperAdminGuard>
                } />
                <Route path="settings" element={
                  <SuperAdminGuard>
                    <div>Settings Page</div>
                  </SuperAdminGuard>
                } />
              </Route>
              
              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </RTLProvider>
    </QueryClientProvider>
  );
}

export default App;
