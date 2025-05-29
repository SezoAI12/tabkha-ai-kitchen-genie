
export const isAdmin = () => {
  // Simple admin check - in a real app this would check authentication
  return localStorage.getItem('isAdmin') === 'true';
};

export const loginAsAdmin = (password: string) => {
  // Simple password check - in a real app this would be more secure
  if (password === 'admin123') {
    localStorage.setItem('isAdmin', 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem('isAdmin');
};

export const requireAdmin = () => {
  if (!isAdmin()) {
    throw new Error('Admin access required');
  }
};

// Additional exports needed by other components
export const isAdminAuthenticated = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

export const adminLogout = () => {
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('adminRole');
};

export const getAdminRole = () => {
  return localStorage.getItem('adminRole') || 'admin';
};

export const setAdminAuth = (role: string) => {
  localStorage.setItem('isAdmin', 'true');
  localStorage.setItem('adminRole', role);
};

export const verifyAdminCredentials = async (email: string, password: string) => {
  // Mock verification - in a real app this would be a secure API call
  if (email === 'admin@wasfahai.com' && password === 'admin123') {
    return { success: true, role: 'admin' };
  }
  if (email === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    return { success: true, role: 'superadmin' };
  }
  return { success: false, role: null };
};
