
// Mock admin authentication functions
export const isAdmin = () => {
  // In a real app, this would check authentication status
  return localStorage.getItem('isAdmin') === 'true'
}

export const isSuperAdmin = () => {
  // In a real app, this would check super admin status
  return localStorage.getItem('isSuperAdmin') === 'true'
}

export const loginAsAdmin = () => {
  localStorage.setItem('isAdmin', 'true')
}

export const loginAsSuperAdmin = () => {
  localStorage.setItem('isAdmin', 'true')
  localStorage.setItem('isSuperAdmin', 'true')
}

export const logoutAdmin = () => {
  localStorage.removeItem('isAdmin')
  localStorage.removeItem('isSuperAdmin')
}

export const getAdminUser = () => {
  return {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@wasfah.com',
    role: isSuperAdmin() ? 'super-admin' : 'admin'
  }
}
