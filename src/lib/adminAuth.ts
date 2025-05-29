
// Simple admin authentication utilities
export const getAdminRole = () => {
  return localStorage.getItem('adminRole') || 'user';
};

export const verifyAdminCredentials = (username: string, password: string) => {
  // Simple hardcoded credentials for demo
  return username === 'admin' && password === 'admin123';
};

export const setAdminAuth = (role: string) => {
  localStorage.setItem('adminRole', role);
};

export const clearAdminAuth = () => {
  localStorage.removeItem('adminRole');
};

export const isAdmin = () => {
  return getAdminRole() === 'admin';
};
