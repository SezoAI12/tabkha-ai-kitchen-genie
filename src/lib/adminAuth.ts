
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
};

export const getCurrentAdminUser = () => {
  return {
    id: '1',
    username: 'admin',
    role: 'super_admin',
    name: 'System Administrator'
  };
};

export const isSuperAdmin = (): boolean => {
  const user = getCurrentAdminUser();
  return user.role === 'super_admin';
};
