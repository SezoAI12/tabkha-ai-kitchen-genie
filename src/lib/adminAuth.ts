
// Mock admin authentication functions
export const isAuthenticated = (): boolean => {
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
};

export const getAdminUser = () => {
  return {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  };
};

export const requireAuth = () => {
  if (!isAuthenticated()) {
    throw new Error('Authentication required');
  }
};
