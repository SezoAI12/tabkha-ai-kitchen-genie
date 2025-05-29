
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  name?: string;
}

// Helper functions for admin authentication
export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem('adminAuth') === 'true';
};

export const getAdminRole = (): string | null => {
  return localStorage.getItem('adminRole');
};

export const setAdminAuth = (role: string): void => {
  localStorage.setItem('adminAuth', 'true');
  localStorage.setItem('adminRole', role);
};

export const adminLogout = (): void => {
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('adminRole');
};

export const verifyAdminCredentials = async (email: string, password: string): Promise<{ success: boolean; role?: string }> => {
  // Demo credentials
  if (email === 'admin@wasfahai.com' && password === 'admin123') {
    return { success: true, role: 'admin' };
  }
  if (email === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    return { success: true, role: 'superadmin' };
  }
  return { success: false };
};

export const adminAuth = {
  async signIn(email: string, password: string): Promise<{ user: AdminUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      // In a real app, you'd verify admin role from database
      const user: AdminUser = {
        id: data.user.id,
        email: data.user.email || '',
        role: 'admin',
        name: data.user.user_metadata?.name,
      };

      return { user, error: null };
    } catch (error) {
      return { user: null, error: 'Failed to sign in' };
    }
  },

  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    } catch (error) {
      return { error: 'Failed to sign out' };
    }
  },

  async getCurrentUser(): Promise<AdminUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      return {
        id: user.id,
        email: user.email || '',
        role: 'admin',
        name: user.user_metadata?.name,
      };
    } catch (error) {
      return null;
    }
  },

  onAuthStateChange(callback: (user: AdminUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user: AdminUser = {
          id: session.user.id,
          email: session.user.email || '',
          role: 'admin',
          name: session.user.user_metadata?.name,
        };
        callback(user);
      } else {
        callback(null);
      }
    });
  }
};

export default adminAuth;
