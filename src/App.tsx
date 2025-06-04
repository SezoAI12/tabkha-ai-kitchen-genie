
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RTLProvider } from '@/contexts/RTLContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import BottomToolbar from '@/components/layout/BottomToolbar';
import SplashScreen from './pages/SplashScreen';
import AuthPage from './pages/AuthPage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CreateRecipePage from './pages/CreateRecipePage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import DietaryPreferencesPage from './pages/DietaryPreferencesPage';
import FavoritesPage from './pages/FavoritesPage';
import MealPlanPage from './pages/MealPlanPage';
import SearchPage from './pages/SearchPage';
import ScanDishPage from './pages/ScanDishPage';
import ScanIngredientsPage from './pages/ScanIngredientsPage';
import FindByIngredientsPage from './pages/FindByIngredientsPage';
import AIFindByIngredientsPage from './pages/AIFindByIngredientsPage';
import PantryPage from './pages/PantryPage';
import ShoppingListPage from './pages/ShoppingListPage';
import AiChefPage from './pages/AiChefPage';
import ServicesPage from './pages/ServicesPage';
import HelpPage from './pages/HelpPage';
import MainSettingsPage from './pages/MainSettingsPage';
import LanguageSettingsPage from './pages/LanguageSettingsPage';
import AppearancePage from './pages/AppearancePage';
import NotificationsPage from './pages/NotificationsPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFound from './pages/NotFound';
import BodyInformationPage from './pages/BodyInformationPage';
import HealthInformationPage from './pages/HealthInformationPage';
import NutritionGoalsPage from './pages/NutritionGoalsPage';
import MenuPage from './pages/MenuPage';
import GlobalCuisinePage from './pages/GlobalCuisinePage';
import CommunityPage from './pages/CommunityPage';
import ConnectedDevicesPage from './pages/ConnectedDevicesPage';
import LoyaltyProgramPage from './pages/LoyaltyProgramPage';
import SubscriptionPage from './pages/SubscriptionPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import AIFeaturesPage from './pages/AIFeaturesPage';
import SharedRecipesPage from './pages/SharedRecipesPage';
import SharedRecipesTrackingPage from './pages/SharedRecipesTrackingPage';
import IngredientSwapPage from './pages/IngredientSwapPage';
import NewHomePage from './pages/NewHomePage';
import HealthTrackingPage from './pages/HealthTrackingPage';
import HealthTrackingHomePage from './pages/HealthTrackingHomePage';
import SmartPantryPageWrapper from './pages/SmartPantryPageWrapper';
import CookingHistoryPage from './pages/CookingHistoryPage';
import CookingMode from './pages/CookingMode';
import MoodRecipesPage from './pages/MoodRecipesPage';
import SmartRecipeAdaptationPage from './pages/SmartRecipeAdaptationPage';
import MicronutrientTrackerPage from './pages/MicronutrientTrackerPage';
import ToolsPage from './pages/Tools';
import SettingsPage from './pages/Settings';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminRecipes from './pages/admin/AdminRecipes';
import AdminPage from './pages/AdminPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminSecurityPage from './pages/admin/AdminSecurityPage';
import AdminCommunicationsPage from './pages/admin/AdminCommunicationsPage';
import AdminRecipeApproval from './pages/admin/AdminRecipeApproval';
import AdminIngredients from './pages/admin/AdminIngredients';
import SupportTicketsPage from './pages/admin/SupportTicketsPage';
import AdminCommunityPage from './pages/admin/CommunityPage';
import AdminNotificationsPage from './pages/admin/NotificationsPage';
import AdvertisementPage from './pages/admin/AdvertisementPage';
import ImageControlPage from './pages/admin/ImageControlPage';
import ContentLibraryPage from './pages/admin/ContentLibraryPage';
import TranslationsPage from './pages/admin/TranslationsPage';
import LanguagesPage from './pages/admin/LanguagesPage';
import SubscriptionsPage from './pages/admin/SubscriptionsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <RTLProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen">
                  <Routes>
                    <Route path="/" element={<SplashScreen />} />
                    <Route path="/splash" element={<SplashScreen />} />
                    <Route path="/home" element={<NewHomePage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/recipes" element={<RecipesPage />} />
                    <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                    <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                    <Route path="/cooking/:id" element={<CookingMode />} />
                    <Route path="/create-recipe" element={<CreateRecipePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/edit" element={<EditProfilePage />} />
                    <Route path="/profile/dietary-preferences" element={<DietaryPreferencesPage />} />
                    <Route path="/dietary-preferences" element={<DietaryPreferencesPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/meal-plan" element={<MealPlanPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/scan-dish" element={<ScanDishPage />} />
                    <Route path="/scan-ingredients" element={<ScanIngredientsPage />} />
                    <Route path="/find-by-ingredients" element={<FindByIngredientsPage />} />
                    <Route path="/ai-find-by-ingredients" element={<AIFindByIngredientsPage />} />
                    <Route path="/pantry" element={<PantryPage />} />
                    <Route path="/smart-pantry" element={<SmartPantryPageWrapper />} />
                    <Route path="/shopping-list" element={<ShoppingListPage />} />
                    <Route path="/ai-chef" element={<AiChefPage />} />
                    <Route path="/cooking-history" element={<CookingHistoryPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/system-settings" element={<MainSettingsPage />} />
                    <Route path="/language" element={<LanguageSettingsPage />} />
                    <Route path="/appearance" element={<AppearancePage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/payment-methods" element={<PaymentMethodsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/body-information" element={<BodyInformationPage />} />
                    <Route path="/health-information" element={<HealthInformationPage />} />
                    <Route path="/nutrition-goals" element={<NutritionGoalsPage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/tools" element={<ToolsPage />} />
                    <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/connected-devices" element={<ConnectedDevicesPage />} />
                    <Route path="/loyalty-program" element={<LoyaltyProgramPage />} />
                    <Route path="/subscription" element={<SubscriptionPage />} />
                    <Route path="/payment-success" element={<PaymentSuccessPage />} />
                    <Route path="/ai-features" element={<AIFeaturesPage />} />
                    <Route path="/shared-recipes" element={<SharedRecipesPage />} />
                    <Route path="/shared-recipes-tracking" element={<SharedRecipesTrackingPage />} />
                    <Route path="/ingredient-swap" element={<IngredientSwapPage />} />
                    <Route path="/health-tracking" element={<HealthTrackingPage />} />
                    <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
                    <Route path="/mood-recipes" element={<MoodRecipesPage />} />
                    <Route path="/recipe-adaptation" element={<SmartRecipeAdaptationPage />} />
                    <Route path="/micronutrient-tracker" element={<MicronutrientTrackerPage />} />
                    <Route path="/delete-account" element={<NotFound />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route 
                      path="/admin" 
                      element={
                        <AdminAuthGuard>
                          <AdminPage />
                        </AdminAuthGuard>
                      }
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="users" element={<AdminUsers />} />
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
                      <Route path="image-control" element={<ImageControlPage />} />
                      <Route path="content-library" element={<ContentLibraryPage />} />
                      <Route path="translations" element={<TranslationsPage />} />
                      <Route path="languages" element={<LanguagesPage />} />
                      <Route path="subscriptions" element={<SubscriptionsPage />} />
                    </Route>
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <BottomToolbar />
                </div>
              </BrowserRouter>
            </AuthProvider>
          </RTLProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
