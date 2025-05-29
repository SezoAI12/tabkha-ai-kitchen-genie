
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

// New functions for AdminLoginPage
export const verifyAdminCredentials = async (email: string, password: string): Promise<{success: boolean, role?: string}> => {
  // Mock credential verification
  if (email === 'admin@wasfahai.com' && password === 'admin123') {
    return { success: true, role: 'admin' };
  }
  if (email === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    return { success: true, role: 'super-admin' };
  }
  return { success: false };
};

export const setAdminAuth = (role: string): void => {
  if (role === 'super-admin') {
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('isSuperAdmin', 'true');
  } else if (role === 'admin') {
    localStorage.setItem('isAdmin', 'true');
    localStorage.removeItem('isSuperAdmin');
  }
};
