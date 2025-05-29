
// Mock admin authentication utilities
export const isAdmin = () => {
  // This is a mock implementation
  return localStorage.getItem('isAdmin') === 'true';
};

export const isSuperAdmin = () => {
  // This is a mock implementation
  return localStorage.getItem('isSuperAdmin') === 'true';
};

export const logout = () => {
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('isSuperAdmin');
};

export const login = (isAdminUser: boolean = false, isSuperAdminUser: boolean = false) => {
  if (isAdminUser) localStorage.setItem('isAdmin', 'true');
  if (isSuperAdminUser) localStorage.setItem('isSuperAdmin', 'true');
};

// Additional exports needed by components
export const adminLogout = logout; // Alias for logout
export const isAdminAuthenticated = () => isAdmin() || isSuperAdmin();
export const getAdminRole = () => {
  if (isSuperAdmin()) return 'super_admin';
  if (isAdmin()) return 'admin';
  return null;
};

export const verifyAdminCredentials = (username: string, password: string) => {
  // Mock verification - in real app this would validate against backend
  return username === 'admin' && password === 'admin123';
};

export const setAdminAuth = (role: 'admin' | 'super_admin') => {
  if (role === 'admin') {
    localStorage.setItem('isAdmin', 'true');
  } else if (role === 'super_admin') {
    localStorage.setItem('isSuperAdmin', 'true');
  }
};
