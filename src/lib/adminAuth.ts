
export interface AdminUser {
  id: string;
  email: string;
  user_type: string;
}

// Mock admin credentials for demo purposes
const ADMIN_CREDENTIALS = {
  'admin@wasfahai.com': { password: 'admin123', role: 'admin' },
  'superadmin@wasfahai.com': { password: 'superadmin123', role: 'superadmin' }
};

export const checkAdminAuth = async (): Promise<AdminUser | null> => {
  try {
    const adminToken = localStorage.getItem('adminAuth');
    const adminRole = localStorage.getItem('adminRole');
    
    if (!adminToken || !adminRole) {
      return null;
    }

    // In a real app, you would validate the token with your backend
    return {
      id: 'admin-user-id',
      email: adminRole === 'superadmin' ? 'superadmin@wasfahai.com' : 'admin@wasfahai.com',
      user_type: adminRole
    };
  } catch (error) {
    console.error('Error checking admin auth:', error);
    return null;
  }
};

export const adminLogout = async (): Promise<void> => {
  try {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminRole');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const isAdmin = (userType: string): boolean => {
  return ['admin', 'super_admin', 'superadmin'].includes(userType);
};

export const isSuperAdmin = (userType: string): boolean => {
  return userType === 'super_admin' || userType === 'superadmin';
};

// Additional functions needed by the components
export const isAdminAuthenticated = (): boolean => {
  const adminToken = localStorage.getItem('adminAuth');
  return !!adminToken;
};

export const getAdminRole = (): string | null => {
  return localStorage.getItem('adminRole');
};

export const verifyAdminCredentials = async (email: string, password: string): Promise<{ success: boolean; role?: string }> => {
  const credentials = ADMIN_CREDENTIALS[email as keyof typeof ADMIN_CREDENTIALS];
  
  if (credentials && credentials.password === password) {
    return { success: true, role: credentials.role };
  }
  
  return { success: false };
};

export const setAdminAuth = (role: string): void => {
  localStorage.setItem('adminAuth', 'authenticated');
  localStorage.setItem('adminRole', role);
};
