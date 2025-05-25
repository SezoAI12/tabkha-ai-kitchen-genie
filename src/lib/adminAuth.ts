
/**
 * Admin Authentication Helper
 * 
 * This file provides functions for admin authentication.
 * In a real application, these would interact with a secure backend.
 */

// Default admin credentials for demo purposes only
// In a production environment, never hardcode credentials
const DEFAULT_ADMIN = {
  email: 'admin@wasfahai.com',
  password: 'admin123',
};

/**
 * Initialize admin account for demo purposes
 * This would not exist in a real application
 */
export function initializeAdminDemo() {
  // Check if this is a first run
  const adminInitialized = localStorage.getItem('adminInitialized');
  
  if (!adminInitialized) {
    // Store a flag indicating we've set up the demo admin
    localStorage.setItem('adminInitialized', 'true');
    console.log('Admin demo initialized with default credentials');
    console.log('Email:', DEFAULT_ADMIN.email);
    console.log('Password:', DEFAULT_ADMIN.password);
  }
}

/**
 * Verify admin login credentials
 * In a real application, this would make a secure API call
 */
export function verifyAdminCredentials(email: string, password: string): boolean {
  // This is only for demonstration purposes
  // In a real application, NEVER check credentials client-side
  return email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password;
}

/**
 * Check if a user is authenticated as an admin
 * In a real application, this would validate a token with the backend
 */
export function isAdminAuthenticated(): boolean {
  return localStorage.getItem('adminAuth') === 'true';
}

/**
 * Log out the admin user
 */
export function adminLogout(): void {
  localStorage.removeItem('adminAuth');
}
