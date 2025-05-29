
export const isAdminUser = () => {
  // Mock admin check - replace with actual admin logic
  return localStorage.getItem('isAdmin') === 'true';
};

export const loginAsAdmin = (username: string, password: string) => {
  // Mock admin login - replace with actual authentication
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('isAdmin', 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem('isAdmin');
};

export const requireAdmin = () => {
  if (!isAdminUser()) {
    throw new Error('Admin access required');
  }
};

// Add the missing exported functions
export const isAdminAuthenticated = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

export const adminLogout = () => {
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('adminRole');
};

export const getAdminRole = () => {
  return localStorage.getItem('adminRole') || null;
};

export const verifyAdminCredentials = async (email: string, password: string) => {
  // Mock verification - replace with actual API call
  if (email === 'admin@wasfahai.com' && password === 'admin123') {
    return { success: true, role: 'admin' };
  }
  if (email === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    return { success: true, role: 'superadmin' };
  }
  return { success: false, role: null };
};

export const setAdminAuth = (role: string) => {
  localStorage.setItem('isAdmin', 'true');
  localStorage.setItem('adminRole', role);
};
