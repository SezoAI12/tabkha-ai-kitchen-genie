

// Mock admin authentication functions
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('adminToken') !== null;
};

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem('adminToken') !== null;
};

export const login = (username: string, password: string): boolean => {
  // Mock login logic
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('adminToken', 'mock-token');
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminRole');
};

export const adminLogout = (): void => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminRole');
};

export const getAdminUser = () => {
  return {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  };
};

export const getAdminRole = (): 'admin' | 'superadmin' | null => {
  const role = localStorage.getItem('adminRole');
  return role as 'admin' | 'superadmin' | null;
};

export const verifyAdminCredentials = async (email: string, password: string) => {
  // Mock verification based on email
  if (email === 'admin@wasfahai.com' && password === 'admin123') {
    return { success: true, role: 'admin' as const };
  } else if (email === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    return { success: true, role: 'superadmin' as const };
  }
  return { success: false, role: null };
};

export const setAdminAuth = (role: 'admin' | 'superadmin') => {
  localStorage.setItem('adminRole', role);
  localStorage.setItem('adminToken', 'mock-token');
};

export const requireAuth = () => {
  if (!isAuthenticated()) {
    throw new Error('Authentication required');
  }
};

