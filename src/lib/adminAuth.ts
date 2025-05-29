
export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem('adminToken') === 'admin123' || localStorage.getItem('adminToken') === 'superadmin123';
};

export const setAdminAuth = (role: string): void => {
  if (role === 'superadmin') {
    localStorage.setItem('adminToken', 'superadmin123');
    localStorage.setItem('adminRole', 'superadmin');
  } else {
    localStorage.setItem('adminToken', 'admin123');
    localStorage.setItem('adminRole', 'admin');
  }
};

export const clearAdminAuth = (): void => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminRole');
};

export const adminLogout = (): void => {
  clearAdminAuth();
};

export const getAdminRole = (): string | null => {
  if (!isAdminAuthenticated()) return null;
  return localStorage.getItem('adminRole');
};

export const verifyAdminCredentials = (username: string, password: string): { success: boolean; role?: string } => {
  if (username === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    return { success: true, role: 'superadmin' };
  } else if (username === 'admin@wasfahai.com' && password === 'admin123') {
    return { success: true, role: 'admin' };
  }
  return { success: false };
};

export const getCurrentAdminUser = () => {
  if (isAdminAuthenticated()) {
    const role = getAdminRole();
    return {
      id: role === 'superadmin' ? 'superadmin-1' : 'admin-1',
      username: role === 'superadmin' ? 'superadmin' : 'admin',
      role: role === 'superadmin' ? 'super_admin' : 'admin'
    };
  }
  return null;
};
