
// Mock admin authentication functionality
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  name: string;
}

export const isAdminAuthenticated = (): boolean => {
  const adminToken = localStorage.getItem('admin_token');
  return !!adminToken;
};

export const isSuperAdmin = (): boolean => {
  const adminUser = getCurrentAdminUser();
  return adminUser?.role === 'super_admin';
};

export const getCurrentAdminUser = (): AdminUser | null => {
  const userStr = localStorage.getItem('admin_user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const getAdminRole = (): string | null => {
  const adminUser = getCurrentAdminUser();
  return adminUser?.role || null;
};

export const verifyAdminCredentials = async (email: string, password: string): Promise<{ success: boolean; role?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'admin@wasfah.com' && password === 'admin123') {
        resolve({ success: true, role: 'admin' });
      } else if (email === 'super@wasfah.com' && password === 'super123') {
        resolve({ success: true, role: 'superadmin' });
      } else {
        resolve({ success: false });
      }
    }, 1000);
  });
};

export const setAdminAuth = (role: string): void => {
  localStorage.setItem('adminRole', role);
  localStorage.setItem('admin_token', 'mock-admin-token');
  
  const adminUser: AdminUser = {
    id: role === 'superadmin' ? '2' : '1',
    email: role === 'superadmin' ? 'super@wasfah.com' : 'admin@wasfah.com',
    role: role === 'superadmin' ? 'super_admin' : 'admin',
    name: role === 'superadmin' ? 'Super Admin' : 'Admin User'
  };
  
  localStorage.setItem('admin_user', JSON.stringify(adminUser));
};

export const adminLogin = (email: string, password: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Mock authentication
    setTimeout(() => {
      if (email === 'admin@wasfah.com' && password === 'admin123') {
        const adminUser: AdminUser = {
          id: '1',
          email,
          role: 'admin',
          name: 'Admin User'
        };
        localStorage.setItem('admin_token', 'mock-admin-token');
        localStorage.setItem('admin_user', JSON.stringify(adminUser));
        resolve(true);
      } else if (email === 'super@wasfah.com' && password === 'super123') {
        const adminUser: AdminUser = {
          id: '2',
          email,
          role: 'super_admin',
          name: 'Super Admin'
        };
        localStorage.setItem('admin_token', 'mock-super-admin-token');
        localStorage.setItem('admin_user', JSON.stringify(adminUser));
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000);
  });
};

export const adminLogout = (): void => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
  localStorage.removeItem('adminRole');
};
