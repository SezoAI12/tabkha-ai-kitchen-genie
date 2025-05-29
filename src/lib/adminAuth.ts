

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  name: string;
}

export interface AuthResult {
  success: boolean;
  role?: 'admin' | 'super_admin';
  user?: AdminUser;
}

export const adminAuth = {
  login: async (email: string, password: string): Promise<AdminUser | null> => {
    // Mock authentication - replace with real implementation
    if (email === 'admin@example.com' && password === 'admin123') {
      const user: AdminUser = {
        id: '1',
        email: 'admin@example.com',
        role: 'admin',
        name: 'Admin User'
      };
      localStorage.setItem('adminUser', JSON.stringify(user));
      return user;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem('adminUser');
  },

  getCurrentUser: (): AdminUser | null => {
    const userStr = localStorage.getItem('adminUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return adminAuth.getCurrentUser() !== null;
  },

  isSuperAdmin: (): boolean => {
    const user = adminAuth.getCurrentUser();
    return user?.role === 'super_admin';
  }
};

// Additional exports for compatibility
export const isAdminAuthenticated = (): boolean => {
  return adminAuth.isAuthenticated();
};

export const adminLogout = () => {
  adminAuth.logout();
};

export const getAdminRole = (): string | null => {
  const user = adminAuth.getCurrentUser();
  return user?.role || null;
};

export const verifyAdminCredentials = async (email: string, password: string): Promise<AuthResult> => {
  // Mock authentication with different credentials
  if (email === 'admin@wasfahai.com' && password === 'admin123') {
    return {
      success: true,
      role: 'admin'
    };
  }
  if (email === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    return {
      success: true,
      role: 'super_admin'
    };
  }
  return {
    success: false
  };
};

export const setAdminAuth = (role: 'admin' | 'super_admin') => {
  const user: AdminUser = {
    id: '1',
    email: role === 'admin' ? 'admin@wasfahai.com' : 'superadmin@wasfahai.com',
    role,
    name: role === 'admin' ? 'Admin User' : 'Super Admin'
  };
  localStorage.setItem('adminUser', JSON.stringify(user));
};

