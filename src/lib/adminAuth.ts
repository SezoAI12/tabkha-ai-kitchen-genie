
export const adminLogout = () => {
  // Mock admin logout functionality
  localStorage.removeItem('adminToken');
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
