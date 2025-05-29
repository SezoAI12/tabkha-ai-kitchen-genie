
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
