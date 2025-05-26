
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RTLProvider } from "@/contexts/RTLContext";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import NewHomePage from "./pages/NewHomePage";
import AuthPage from "./pages/AuthPage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import ScanIngredientsPage from "./pages/ScanIngredientsPage";
import ScanDishPage from "./pages/ScanDishPage";
import PantryPage from "./pages/PantryPage";
import MealPlanPage from "./pages/MealPlanPage";
import FindByIngredientsPage from "./pages/FindByIngredientsPage";
import GlobalCuisinePage from "./pages/GlobalCuisinePage";
import IngredientSwapPage from "./pages/IngredientSwapPage";
import CommunityPage from "./pages/CommunityPage";
import SharedRecipesPage from "./pages/SharedRecipesPage";
import SharedRecipesTrackingPage from "./pages/SharedRecipesTrackingPage";
import DietaryPreferencesPage from "./pages/DietaryPreferencesPage";
import HealthTrackingPage from "./pages/HealthTrackingPage";
import HealthTrackingHomePage from "./pages/HealthTrackingHomePage";
import HealthInformationPage from "./pages/HealthInformationPage";
import BodyInformationPage from "./pages/BodyInformationPage";
import NutritionGoalsPage from "./pages/NutritionGoalsPage";
import LoyaltyProgramPage from "./pages/LoyaltyProgramPage";
import PrivacyPage from "./pages/PrivacyPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import SplashScreen from "./pages/SplashScreen";
import NotFound from "./pages/NotFound";
import MainSettingsPage from "./pages/MainSettingsPage";
import SettingsPage from "./pages/SettingsPage";
import LanguageSettingsPage from "./pages/LanguageSettingsPage";
import MenuPage from "./pages/MenuPage";

// New pages
import PaymentMethodsPage from "./pages/PaymentMethodsPage";
import ConnectedDevicesPage from "./pages/ConnectedDevicesPage";
import HelpPage from "./pages/HelpPage";
import AppearancePage from "./pages/AppearancePage";
import NotificationsPage from "./pages/NotificationsPage";

// Admin pages
import AdminAuthGuard from "./components/admin/AdminAuthGuard";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRecipes from "./pages/admin/AdminRecipes";
import AdminSubscriptionManager from "./pages/admin/AdminSubscriptionManager";
import AdminRewardsManager from "./pages/admin/AdminRewardsManager";
import AdminLanguageManager from "./pages/admin/AdminLanguageManager";
import AdminContentLibrary from "./pages/admin/AdminContentLibrary";
import AdminUserTypesManager from "./pages/admin/AdminUserTypesManager";
import AdminIntegrationsManager from "./pages/admin/AdminIntegrationsManager";
import AdminAccountingManager from "./pages/admin/AdminAccountingManager";
import AdminSystemMonitoring from "./pages/admin/AdminSystemMonitoring";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RTLProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/new-home" element={<NewHomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/create-recipe" element={<CreateRecipePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/shopping-list" element={<ShoppingListPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/scan-ingredients" element={<ScanIngredientsPage />} />
            <Route path="/scan-dish" element={<ScanDishPage />} />
            <Route path="/pantry" element={<PantryPage />} />
            <Route path="/meal-plan" element={<MealPlanPage />} />
            <Route path="/find-by-ingredients" element={<FindByIngredientsPage />} />
            <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
            <Route path="/ingredient-swap" element={<IngredientSwapPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/shared-recipes" element={<SharedRecipesPage />} />
            <Route path="/shared-recipes-tracking" element={<SharedRecipesTrackingPage />} />
            <Route path="/dietary-preferences" element={<DietaryPreferencesPage />} />
            <Route path="/health-tracking" element={<HealthTrackingPage />} />
            <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
            <Route path="/health-information" element={<HealthInformationPage />} />
            <Route path="/body-information" element={<BodyInformationPage />} />
            <Route path="/nutrition-goals" element={<NutritionGoalsPage />} />
            <Route path="/loyalty" element={<LoyaltyProgramPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/settings" element={<MainSettingsPage />} />
            <Route path="/settings-old" element={<SettingsPage />} />
            <Route path="/language-settings" element={<LanguageSettingsPage />} />
            <Route path="/menu" element={<MenuPage />} />
            
            {/* New pages */}
            <Route path="/payment-methods" element={<PaymentMethodsPage />} />
            <Route path="/connected-devices" element={<ConnectedDevicesPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/appearance" element={<AppearancePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={
              <AdminAuthGuard>
                <AdminPage />
              </AdminAuthGuard>
            } />
            <Route path="/admin/dashboard" element={
              <AdminAuthGuard>
                <AdminDashboard />
              </AdminAuthGuard>
            } />
            <Route path="/admin/users" element={
              <AdminAuthGuard>
                <AdminUsers />
              </AdminAuthGuard>
            } />
            <Route path="/admin/recipes" element={
              <AdminAuthGuard>
                <AdminRecipes />
              </AdminAuthGuard>
            } />
            <Route path="/admin/subscriptions" element={
              <AdminAuthGuard>
                <AdminSubscriptionManager />
              </AdminAuthGuard>
            } />
            <Route path="/admin/rewards" element={
              <AdminAuthGuard>
                <AdminRewardsManager />
              </AdminAuthGuard>
            } />
            <Route path="/admin/languages" element={
              <AdminAuthGuard>
                <AdminLanguageManager />
              </AdminAuthGuard>
            } />
            <Route path="/admin/content" element={
              <AdminAuthGuard>
                <AdminContentLibrary />
              </AdminAuthGuard>
            } />
            <Route path="/admin/user-types" element={
              <AdminAuthGuard>
                <AdminUserTypesManager />
              </AdminAuthGuard>
            } />
            <Route path="/admin/integrations" element={
              <AdminAuthGuard>
                <AdminIntegrationsManager />
              </AdminAuthGuard>
            } />
            <Route path="/admin/accounting" element={
              <AdminAuthGuard>
                <AdminAccountingManager />
              </AdminAuthGuard>
            } />
            <Route path="/admin/monitoring" element={
              <AdminAuthGuard>
                <AdminSystemMonitoring />
              </AdminAuthGuard>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RTLProvider>
  </QueryClientProvider>
);

export default App;
