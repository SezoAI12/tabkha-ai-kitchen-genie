
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
  if (isSuperAdmin()) return 'superadmin'; // Changed to match expected type
  if (isAdmin()) return 'admin';
  return null;
};

export const verifyAdminCredentials = (username: string, password: string) => {
  // Mock verification - in real app this would validate against backend
  const result = { success: false, role: null as 'admin' | 'superadmin' | null };
  
  if (username === 'admin@wasfahai.com' && password === 'admin123') {
    result.success = true;
    result.role = 'admin';
  } else if (username === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    result.success = true;
    result.role = 'superadmin';
  }
  
  return result;
};

export const setAdminAuth = (role: 'admin' | 'superadmin') => {
  if (role === 'admin') {
    localStorage.setItem('isAdmin', 'true');
  } else if (role === 'superadmin') {
    localStorage.setItem('isSuperAdmin', 'true');
  }
};
