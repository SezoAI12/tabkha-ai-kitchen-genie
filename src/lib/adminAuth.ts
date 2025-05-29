
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  name: string;
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
