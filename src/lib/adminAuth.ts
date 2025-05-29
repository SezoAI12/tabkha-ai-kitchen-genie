

// Mock admin authentication functions
export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem('adminAuth') === 'true';
};

export const adminLogin = (username: string, password: string): boolean => {
  // Mock authentication logic
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('adminAuth', 'true');
    return true;
  }
  return false;
};

export const adminLogout = (): void => {
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('adminRole');
};

export const getCurrentAdminUser = () => {
  return {
    id: '1',
    username: 'admin',
    role: 'superadmin',
    name: 'System Administrator'
  };
};

export const isSuperAdmin = (): boolean => {
  const user = getCurrentAdminUser();
  return user.role === 'superadmin';
};

export const getAdminRole = (): string | null => {
  if (!isAdminAuthenticated()) {
    return null;
  }
  const user = getCurrentAdminUser();
  return user.role;
};

// New functions needed by AdminLoginPage
export const verifyAdminCredentials = async (email: string, password: string): Promise<{ success: boolean; role?: string }> => {
  // Mock credential verification
  if (email === 'admin@wasfahai.com' && password === 'admin123') {
    return { success: true, role: 'admin' };
  }
  if (email === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    return { success: true, role: 'superadmin' };
  }
  return { success: false };
};

export const setAdminAuth = (role: string): void => {
  localStorage.setItem('adminAuth', 'true');
  localStorage.setItem('adminRole', role);
};

