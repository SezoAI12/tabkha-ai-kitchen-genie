
interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'superadmin';
}

class AdminAuth {
  private currentUser: AdminUser | null = null;

  login(username: string, password: string): Promise<AdminUser> {
    return new Promise((resolve, reject) => {
      // Mock authentication - replace with real implementation
      if (username === 'admin' && password === 'admin123') {
        this.currentUser = {
          id: '1',
          username: 'admin',
          role: 'admin'
        };
        localStorage.setItem('adminUser', JSON.stringify(this.currentUser));
        resolve(this.currentUser);
      } else if (username === 'superadmin' && password === 'super123') {
        this.currentUser = {
          id: '2',
          username: 'superadmin',
          role: 'superadmin'
        };
        localStorage.setItem('adminUser', JSON.stringify(this.currentUser));
        resolve(this.currentUser);
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminRole');
  }

  getCurrentUser(): AdminUser | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('adminUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isSuperAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'superadmin';
  }

  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Superadmin has all permissions
    if (user.role === 'superadmin') return true;
    
    // Regular admin permissions (customize as needed)
    const adminPermissions = [
      'view_dashboard',
      'manage_recipes',
      'moderate_content'
    ];
    
    return adminPermissions.includes(permission);
  }
}

export const adminAuth = new AdminAuth();

// Export additional functions needed by components
export const adminLogout = () => {
  adminAuth.logout();
};

export const isAdminAuthenticated = () => {
  return adminAuth.isAuthenticated();
};

export const getAdminRole = (): 'admin' | 'superadmin' | null => {
  const user = adminAuth.getCurrentUser();
  return user?.role || null;
};

export const verifyAdminCredentials = async (email: string, password: string) => {
  // Mock verification based on email
  if (email === 'admin@wasfahai.com' && password === 'admin123') {
    return { success: true, role: 'admin' as const };
  } else if (email === 'superadmin@wasfahai.com' && password === 'superadmin123') {
    return { success: true, role: 'superadmin' as const };
  }
  return { success: false, role: null };
};

export const setAdminAuth = (role: 'admin' | 'superadmin') => {
  localStorage.setItem('adminRole', role);
  // Create a mock user based on role
  const user: AdminUser = {
    id: role === 'superadmin' ? '2' : '1',
    username: role === 'superadmin' ? 'superadmin' : 'admin',
    role: role
  };
  localStorage.setItem('adminUser', JSON.stringify(user));
  adminAuth['currentUser'] = user;
};
