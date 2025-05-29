export const isAdminUser = () => {
  // Mock admin check - replace with actual admin logic
  return localStorage.getItem('isAdmin') === 'true';
};

export const loginAsAdmin = (username: string, password: string) => {
  // Mock admin login - replace with actual authentication
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('isAdmin', 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem('isAdmin');
};

export const requireAdmin = () => {
  if (!isAdminUser()) {
    throw new Error('Admin access required');
  }
};
