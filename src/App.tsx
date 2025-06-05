
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
import { MainRoutes } from '@/routes/MainRoutes';
import { AdminRoutes } from '@/routes/AdminRoutes';

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
                    <Route path="/*" element={<MainRoutes />} />
                    <Route 
                      path="/admin/*" 
                      element={
                        <AdminAuthGuard>
                          <AdminRoutes />
                        </AdminAuthGuard>
                      } 
                    />
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
