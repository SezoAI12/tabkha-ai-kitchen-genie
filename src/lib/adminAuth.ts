
// src/lib/adminAuth.ts

// Simple admin authentication utility
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  name: string;
}

// Mock admin authentication - in a real app this would connect to your backend
export const adminAuth = {
  // Check if user is authenticated as admin
  isAuthenticated: (): boolean => {
    const adminToken = localStorage.getItem('admin_token');
    return !!adminToken;
  },

  // Get current admin user
  getCurrentUser: (): AdminUser | null => {
    const userStr = localStorage.getItem('admin_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Login admin user
  login: (email: string, password: string): Promise<AdminUser> => {
    return new Promise((resolve, reject) => {
      // Mock login - replace with real authentication
      if (email === 'admin@wasfah.com' && password === 'admin123') {
        const user: AdminUser = {
          id: '1',
          email,
          role: 'admin',
          name: 'Admin User'
        };
        localStorage.setItem('admin_token', 'mock_token');
        localStorage.setItem('admin_user', JSON.stringify(user));
        resolve(user);
      } else if (email === 'superadmin@wasfah.com' && password === 'super123') {
        const user: AdminUser = {
          id: '2',
          email,
          role: 'super_admin',
          name: 'Super Admin'
        };
        localStorage.setItem('admin_token', 'mock_token');
        localStorage.setItem('admin_user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  },

  // Logout admin user
  logout: (): void => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  // Check if user is super admin
  isSuperAdmin: (): boolean => {
    const user = adminAuth.getCurrentUser();
    return user?.role === 'super_admin';
  },

  // Set admin authentication status
  setAdminAuth: (status: boolean, user?: AdminUser): void => {
    if (status && user) {
      localStorage.setItem('admin_token', 'mock_token');
      localStorage.setItem('admin_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
  }
};

// Additional exported functions for compatibility
export const isAdminAuthenticated = (): boolean => {
  return adminAuth.isAuthenticated();
};

export const adminLogout = (): void => {
  adminAuth.logout();
};

export const getAdminRole = (): string | null => {
  const user = adminAuth.getCurrentUser();
  return user?.role === 'super_admin' ? 'superadmin' : user?.role === 'admin' ? 'admin' : null;
};

export const verifyAdminCredentials = async (email: string, password: string): Promise<{ success: boolean; role?: string }> => {
  try {
    const user = await adminAuth.login(email, password);
    return { 
      success: true, 
      role: user.role === 'super_admin' ? 'superadmin' : 'admin' 
    };
  } catch {
    return { success: false };
  }
};

export const setAdminAuth = (role: string): void => {
  if (role === 'superadmin') {
    const user: AdminUser = {
      id: '2',
      email: 'superadmin@wasfah.com',
      role: 'super_admin',
      name: 'Super Admin'
    };
    adminAuth.setAdminAuth(true, user);
    localStorage.setItem('adminRole', 'superadmin');
  } else if (role === 'admin') {
    const user: AdminUser = {
      id: '1',
      email: 'admin@wasfah.com',
      role: 'admin',
      name: 'Admin User'
    };
    adminAuth.setAdminAuth(true, user);
    localStorage.setItem('adminRole', 'admin');
  }
};
