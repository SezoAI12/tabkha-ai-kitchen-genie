

export const adminLogout = () => {
  // Mock admin logout functionality
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminRole');
  window.location.href = '/admin/login';
};

export const isAdminAuthenticated = () => {
  // Mock admin authentication check
  return localStorage.getItem('adminToken') !== null;
};

export const isSuperAdmin = () => {
  // Mock super admin check
  const token = localStorage.getItem('adminToken');
  return token === 'super-admin-token';
};

export const loginAdmin = (username: string, password: string) => {
  // Mock admin login
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('adminToken', 'admin-token');
    return true;
  }
  if (username === 'superadmin' && password === 'superadmin') {
    localStorage.setItem('adminToken', 'super-admin-token');
    return true;
  }
  return false;
};

export const getAdminRole = () => {
  return localStorage.getItem('adminRole') || null;
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

