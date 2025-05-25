
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { RTLProvider } from "./contexts/RTLContext";
import NewHomePage from "./pages/NewHomePage";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import PantryPage from "./pages/PantryPage";
import MealPlanPage from "./pages/MealPlanPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import NotFound from "./pages/NotFound";
import SplashScreen from "./pages/SplashScreen";
import AuthPage from "./pages/AuthPage";
import NutritionGoalsPage from "./pages/NutritionGoalsPage";
import HealthTrackingPage from "./pages/HealthTrackingPage";
import IngredientSwapPage from "./pages/IngredientSwapPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import LoyaltyProgramPage from "./pages/LoyaltyProgramPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import SettingsPage from "./pages/SettingsPage";
import GlobalCuisinePage from "./pages/GlobalCuisinePage";
import SharedRecipesPage from "./pages/SharedRecipesPage";
import HealthInformationPage from "./pages/HealthInformationPage";
import DietaryPreferencesPage from "./pages/DietaryPreferencesPage";
import SharedRecipesTrackingPage from "./pages/SharedRecipesTrackingPage";
import HealthTrackingHomePage from "./pages/HealthTrackingHomePage";
import FindByIngredientsPage from "./pages/FindByIngredientsPage";
import LanguageSettingsPage from "./pages/LanguageSettingsPage";
import FavoritesPage from "./pages/FavoritesPage";
import MainSettingsPage from "./pages/MainSettingsPage";
import CommunityPage from "./pages/CommunityPage";
import ScanDishPage from "./pages/ScanDishPage";

// Admin Panel Routes
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRecipes from "./pages/admin/AdminRecipes";
import AdminSystemMonitoring from "./pages/admin/AdminSystemMonitoring";
import AdminContentLibrary from "./pages/admin/AdminContentLibrary";
import AdminLanguageManager from "./pages/admin/AdminLanguageManager";
import AdminRewardsManager from "./pages/admin/AdminRewardsManager";
import AdminAccountingManager from "./pages/admin/AdminAccountingManager";
import AdminIntegrationsManager from "./pages/admin/AdminIntegrationsManager";
import AdminUserTypesManager from "./pages/admin/AdminUserTypesManager";
import AdminSubscriptionManager from "./pages/admin/AdminSubscriptionManager";
import AdminAuthGuard from "./components/admin/AdminAuthGuard";

// Initialize admin demo
import { initializeAdminDemo } from "@/lib/adminAuth";
initializeAdminDemo(); // This sets up the demo admin account for testing

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RTLProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Splash and Auth Pages */}
              <Route path="/splash" element={<SplashScreen />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Main Pages in order */}
              <Route path="/" element={<HomePage />} />
              <Route path="/find-by-ingredients" element={<FindByIngredientsPage />} />
              <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
              <Route path="/meal-plan" element={<MealPlanPage />} />
              <Route path="/pantry" element={<PantryPage />} />
              <Route path="/shared-recipes-tracking" element={<SharedRecipesTrackingPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/scan-dish" element={<ScanDishPage />} />
              
              {/* Secondary Pages */}
              <Route path="/new-home" element={<NewHomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/create-recipe" element={<CreateRecipePage />} />
              <Route path="/nutrition-goals" element={<NutritionGoalsPage />} />
              <Route path="/health-tracking" element={<HealthTrackingPage />} />
              <Route path="/health-information" element={<HealthInformationPage />} />
              <Route path="/dietary-preferences" element={<DietaryPreferencesPage />} />
              <Route path="/ingredient-swap" element={<IngredientSwapPage />} />
              <Route path="/shopping-list" element={<ShoppingListPage />} />
              <Route path="/loyalty" element={<LoyaltyProgramPage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/history" element={<HealthTrackingPage />} />
              <Route path="/share-recipe" element={<CreateRecipePage />} />
              <Route path="/quick-access" element={<MainSettingsPage />} />
              <Route path="/language-settings" element={<LanguageSettingsPage />} />
              <Route path="/shared-recipes" element={<SharedRecipesPage />} />
              
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
                <Route path="users" element={<AdminUsers />} />
                <Route path="recipes" element={<AdminRecipes />} />
                <Route path="content" element={<AdminContentLibrary />} />
                <Route path="system" element={<AdminSystemMonitoring />} />
                <Route path="languages" element={<AdminLanguageManager />} />
                <Route path="rewards" element={<AdminRewardsManager />} />
                <Route path="accounting" element={<AdminAccountingManager />} />
                <Route path="integrations" element={<AdminIntegrationsManager />} />
                <Route path="user-types" element={<AdminUserTypesManager />} />
                <Route path="subscriptions" element={<AdminSubscriptionManager />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RTLProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
