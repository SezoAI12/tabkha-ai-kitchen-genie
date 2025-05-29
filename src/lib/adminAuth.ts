
import { supabase } from '@/integrations/supabase/client';

export interface AdminUser {
  id: string;
  email: string;
  user_type: string;
}

export const checkAdminAuth = async (): Promise<AdminUser | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single();

    if (!profile || !['admin', 'super_admin'].includes(profile.user_type)) {
      return null;
    }

    return {
      id: user.id,
      email: user.email || '',
      user_type: profile.user_type
    };
  } catch (error) {
    console.error('Error checking admin auth:', error);
    return null;
  }
};

export const adminLogout = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const isAdmin = (userType: string): boolean => {
  return ['admin', 'super_admin'].includes(userType);
};

export const isSuperAdmin = (userType: string): boolean => {
  return userType === 'super_admin';
};
