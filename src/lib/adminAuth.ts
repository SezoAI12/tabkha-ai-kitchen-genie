
// Mock admin authentication
export const mockAdminUser = {
  id: 'admin-1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin'
};

export const isAdminAuthenticated = (): boolean => {
  // Mock authentication check
  return localStorage.getItem('adminAuth') === 'true';
};

export const loginAdmin = (email: string, password: string): boolean => {
  // Mock login
  if (email === 'admin@example.com' && password === 'admin123') {
    localStorage.setItem('adminAuth', 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('adminRole');
};

// Fix: Add adminLogout as alias for logoutAdmin
export const adminLogout = logoutAdmin;

export const getCurrentAdmin = () => {
  return isAdminAuthenticated() ? mockAdminUser : null;
};

// Fix: Add getAdminRole function
export const getAdminRole = (): string | null => {
  return localStorage.getItem('adminRole');
};

// Fix: Add verifyAdminCredentials function
export const verifyAdminCredentials = async (email: string, password: string): Promise<{ success: boolean; role?: string }> => {
  // Mock verification with different roles
  if (email === 'admin@wasfahai.com' && password === 'admin123') {
    return { success: true, role: 'admin' };
  }
  if (email === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    return { success: true, role: 'superadmin' };
  }
  return { success: false };
};

// Fix: Add setAdminAuth function
export const setAdminAuth = (role: string): void => {
  localStorage.setItem('adminAuth', 'true');
  localStorage.setItem('adminRole', role);
};
