
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Navigate } from 'react-router-dom';

interface SuperAdminGuardProps {
  children: React.ReactNode;
}

export const SuperAdminGuard = ({ children }: SuperAdminGuardProps) => {
  const { user, loading: authLoading } = useAuth();

  const { data: hasRole, isLoading: roleLoading } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user?.id) return false;
      
      const { data, error } = await supabase
        .rpc('has_role', { _user_id: user.id, _role: 'super_admin' });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wasfah-orange"></div>
      </div>
    );
  }

  if (!user || !hasRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
