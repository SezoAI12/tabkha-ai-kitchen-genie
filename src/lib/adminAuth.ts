
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
};

export const getCurrentAdmin = () => {
  return isAdminAuthenticated() ? mockAdminUser : null;
};
