
// Simple admin authentication utilities
export const getAdminRole = () => {
  return localStorage.getItem('adminRole') || 'user';
};

export const verifyAdminCredentials = async (email: string, password: string) => {
  // Mock implementation for demo
  if (email === 'admin@wasfahai.com' && password === 'admin123') {
    return { success: true, role: 'admin' };
  }
  if (email === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    return { success: true, role: 'superadmin' };
  }
  return { success: false, role: null };
};

export const setAdminAuth = (role: string) => {
  localStorage.setItem('adminToken', role === 'superadmin' ? 'super-admin-token' : 'admin-token');
  localStorage.setItem('adminRole', role);
};

export const clearAdminAuth = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminRole');
};

export const isAdmin = () => {
  return getAdminRole() === 'admin';
};

export const isAdminAuthenticated = () => {
  return localStorage.getItem('adminToken') !== null;
};

export const adminLogout = () => {
  clearAdminAuth();
  window.location.href = '/admin/login';
};

export const isSuperAdmin = () => {
  const role = getAdminRole();
  return role === 'superadmin';
};
