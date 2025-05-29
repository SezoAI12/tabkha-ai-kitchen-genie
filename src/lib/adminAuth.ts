
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

// Alias for logoutAdmin to match component imports
export const adminLogout = () => {
  localStorage.removeItem('isAdmin')
  localStorage.removeItem('isSuperAdmin')
  localStorage.removeItem('adminRole')
}

export const getAdminUser = () => {
  return {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@wasfah.com',
    role: isSuperAdmin() ? 'super-admin' : 'admin'
  }
}

// Additional functions required by components
export const isAdminAuthenticated = () => {
  return localStorage.getItem('isAdmin') === 'true'
}

export const getAdminRole = () => {
  return localStorage.getItem('adminRole') || (isSuperAdmin() ? 'superadmin' : 'admin')
}

export const setAdminAuth = (role: string) => {
  localStorage.setItem('isAdmin', 'true')
  localStorage.setItem('adminRole', role)
  if (role === 'superadmin') {
    localStorage.setItem('isSuperAdmin', 'true')
  }
}

export const verifyAdminCredentials = async (email: string, password: string) => {
  // Mock credential verification
  const validCredentials = [
    { email: 'admin@wasfahai.com', password: 'admin123', role: 'admin' },
    { email: 'superadmin@wasfahai.com', password: 'superadmin123', role: 'superadmin' }
  ]
  
  const credential = validCredentials.find(cred => 
    cred.email === email && cred.password === password
  )
  
  if (credential) {
    return { success: true, role: credential.role }
  }
  
  return { success: false, role: null }
}
