
// Mock admin authentication utilities
export const isAdmin = () => {
  // Mock implementation - in real app this would check actual auth
  return false;
};

export const isSuperAdmin = () => {
  // Mock implementation - in real app this would check actual auth
  return false;
};

export const logoutAdmin = () => {
  // Mock implementation - in real app this would handle logout
  console.log('Admin logout');
};

export const getAdminUser = () => {
  // Mock implementation - returns null for now
  return null;
};

// Additional exports needed by components
export const isAdminAuthenticated = () => {
  return localStorage.getItem('adminAuth') === 'true';
};

export const adminLogout = () => {
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('adminRole');
  console.log('Admin logout');
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
  localStorage.setItem('adminAuth', 'true');
  localStorage.setItem('adminRole', role);
};
