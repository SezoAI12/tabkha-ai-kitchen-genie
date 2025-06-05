
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
import RecipeDetailPage from './pages/RecipeDetailPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
import AdminIntegrationsPage from './pages/admin/AdminIntegrationsPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminSecurityPage from './pages/admin/AdminSecurityPage';
import AdminIntegrationsManager from './pages/admin/AdminIntegrationsManager';
import AdminUserTypesPage from './pages/admin/AdminUserTypesPage';
import AdminAccountingPage from './pages/admin/AdminAccountingPage';
import AdminSystemPage from './pages/admin/AdminSystemPage';
import AdminMaintenancePage from './pages/admin/AdminMaintenancePage';
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
              <Route path="/" element={<div className="p-8 text-center"><h1 className="text-2xl">Welcome to Wasfah</h1><p>Recipe management app</p></div>} />
              <Route path="/login" element={<div className="p-8 text-center"><h1 className="text-xl">Login Page</h1></div>} />
              <Route path="/register" element={<div className="p-8 text-center"><h1 className="text-xl">Register Page</h1></div>} />
              <Route path="/home" element={<div className="p-8 text-center"><h1 className="text-xl">Home Page</h1></div>} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<div className="p-8 text-center"><h1 className="text-xl">About Us</h1></div>} />
              <Route path="/contact" element={<div className="p-8 text-center"><h1 className="text-xl">Contact</h1></div>} />
              <Route path="/find-by-ingredients" element={<AIFindByIngredientsPage />} />
              <Route path="/scan-dish" element={<ScanDishPage />} />
              <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
              <Route path="/meal-plan" element={<MealPlanPage />} />
              <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
              <Route path="/pantry" element={<PantryPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>}>
                <Route index element={<div className="p-8"><h1 className="text-xl">Admin Dashboard</h1></div>} />
                <Route path="dashboard" element={<div className="p-8"><h1 className="text-xl">Admin Dashboard</h1></div>} />
                <Route path="users" element={<div className="p-8"><h1 className="text-xl">Admin Users</h1></div>} />
                <Route path="recipes" element={<div className="p-8"><h1 className="text-xl">Admin Recipes</h1></div>} />
                <Route path="ingredients" element={<div className="p-8"><h1 className="text-xl">Admin Ingredients</h1></div>} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="security" element={<AdminSecurityPage />} />
                <Route path="integrations" element={<AdminIntegrationsPage />} />
                <Route path="integrations-manager" element={<AdminIntegrationsManager />} />
                <Route path="user-types" element={<AdminUserTypesPage />} />
                <Route path="accounting" element={<AdminAccountingPage />} />
                <Route path="system" element={<AdminSystemPage />} />
                <Route path="maintenance" element={<AdminMaintenancePage />} />
                <Route path="community" element={<div className="p-8"><h1 className="text-xl">Community Management</h1></div>} />
                <Route path="content-library" element={<div className="p-8"><h1 className="text-xl">Content Library</h1></div>} />
                <Route path="translations" element={<div className="p-8"><h1 className="text-xl">Translations</h1></div>} />
                <Route path="languages" element={<div className="p-8"><h1 className="text-xl">Languages</h1></div>} />
                <Route path="images" element={<div className="p-8"><h1 className="text-xl">Image Control</h1></div>} />
                <Route path="notifications" element={<div className="p-8"><h1 className="text-xl">Notifications</h1></div>} />
                <Route path="subscriptions" element={<div className="p-8"><h1 className="text-xl">Subscriptions</h1></div>} />
                <Route path="advertisements" element={<div className="p-8"><h1 className="text-xl">Advertisements</h1></div>} />
                <Route path="support-tickets" element={<div className="p-8"><h1 className="text-xl">Support Tickets</h1></div>} />
              </Route>

              <Route path="*" element={<div className="p-8 text-center"><h1 className="text-xl">Page Not Found</h1></div>} />
            </Routes>
          </Router>
        </AuthProvider>
      </RTLProvider>
    </ThemeProvider>
  );
};

export default App;
