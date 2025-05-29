
// Mock admin authentication utility
export const isAdmin = (): boolean => {
  // In a real app, this would check actual authentication state
  return localStorage.getItem('isAdmin') === 'true' || false;
};

export const isSuperAdmin = (): boolean => {
  // In a real app, this would check actual user roles
  return localStorage.getItem('isSuperAdmin') === 'true' || false;
};

export const signOut = (): void => {
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('isSuperAdmin');
  window.location.href = '/auth';
};

export const signInAsAdmin = (): void => {
  localStorage.setItem('isAdmin', 'true');
};

export const signInAsSuperAdmin = (): void => {
  localStorage.setItem('isAdmin', 'true');
  localStorage.setItem('isSuperAdmin', 'true');
};

// Additional exports that are being imported
export const isAdminAuthenticated = isAdmin;
export const adminLogout = signOut;
export const getAdminRole = (): string => {
  if (isSuperAdmin()) return 'super-admin';
  if (isAdmin()) return 'admin';
  return 'user';
};
