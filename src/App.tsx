// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { RTLProvider } from './contexts/RTLContext';
import { AuthProvider } from './contexts/AuthContext';
import { initializeAdminDemo, isAdminAuthenticated } from './lib/adminAuth';
import ErrorBoundary from './components/monitoring/ErrorBoundary'; // <--- IMPORT ERRORBOUNDARY

// ... your page imports ...

const App = () => {
  const [loading, setLoading] = useState(true);

  // ... useEffect for loading and initializeAdminDemo ...

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    return isAdminAuthenticated() ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    // Wrap your main app content with ErrorBoundary
    <ErrorBoundary> {/* <--- WRAP HERE */}
      <RTLProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* ... all your Route definitions ... */}
            </Routes>
          </Router>
        </AuthProvider>
      </RTLProvider>
    </ErrorBoundary> {/* <--- END WRAP HERE */}
  );
};

export default App;
