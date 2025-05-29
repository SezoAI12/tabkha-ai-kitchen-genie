
export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem('adminToken') === 'admin123';
};

export const setAdminAuth = (token: string): void => {
  localStorage.setItem('adminToken', token);
};

export const clearAdminAuth = (): void => {
  localStorage.removeItem('adminToken');
};

export const verifyAdminCredentials = (username: string, password: string): boolean => {
  return username === 'admin' && password === 'admin123';
};

export const getCurrentAdminUser = () => {
  if (isAdminAuthenticated()) {
    return {
      id: 'admin-1',
      username: 'admin',
      role: 'super_admin'
    };
  }
  return null;
};
