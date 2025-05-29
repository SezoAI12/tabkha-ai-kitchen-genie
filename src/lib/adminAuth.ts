
export interface AuthResult {
  success: boolean;
  role?: string;
  user?: any;
}

export const login = async (email: string, password: string): Promise<AuthResult> => {
  // Mock authentication logic
  if (email === 'admin@wasfah.com' && password === 'admin123') {
    return {
      success: true,
      role: 'admin',
      user: { email, name: 'Admin User' }
    };
  }
  
  if (email === 'superadmin@wasfah.com' && password === 'superadmin123') {
    return {
      success: true,
      role: 'superadmin',
      user: { email, name: 'Super Admin' }
    };
  }
  
  return {
    success: false
  };
};

export const verifyAdminCredentials = async (email: string, password: string): Promise<AuthResult> => {
  return login(email, password);
};

export const logout = () => {
  localStorage.removeItem('adminAuth');
  window.location.href = '/admin/login';
};

export const adminLogout = () => {
  logout();
};

export const setAdminAuth = (role: string) => {
  localStorage.setItem('adminAuth', JSON.stringify({ role }));
  localStorage.setItem('adminRole', role);
};

export const getCurrentAdmin = () => {
  const auth = localStorage.getItem('adminAuth');
  return auth ? JSON.parse(auth) : null;
};

export const isAuthenticated = () => {
  const admin = getCurrentAdmin();
  return admin && admin.role;
};

export const isAdminAuthenticated = () => {
  return isAuthenticated();
};

export const getAdminRole = () => {
  return localStorage.getItem('adminRole');
};

export const isSuperAdmin = () => {
  const admin = getCurrentAdmin();
  return admin && admin.role === 'superadmin';
};
