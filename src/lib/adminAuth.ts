
export const isAdmin = () => {
  // Simple admin check - in a real app this would check authentication
  return localStorage.getItem('isAdmin') === 'true';
};

export const loginAsAdmin = (password: string) => {
  // Simple password check - in a real app this would be more secure
  if (password === 'admin123') {
    localStorage.setItem('isAdmin', 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem('isAdmin');
};

export const requireAdmin = () => {
  if (!isAdmin()) {
    throw new Error('Admin access required');
  }
};
