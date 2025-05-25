
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    // In a real application, you would check the validity of the admin token/session
    const checkAdminAuth = () => {
      const adminAuth = localStorage.getItem('adminAuth');
      setIsAdmin(adminAuth === 'true');
    };
    
    checkAdminAuth();
  }, []);

  // Show nothing while checking authentication
  if (isAdmin === null) {
    return null;
  }

  // Redirect to admin login if not authenticated
  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default AdminAuthGuard;
