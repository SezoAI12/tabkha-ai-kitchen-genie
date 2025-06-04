
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth as useSupabaseAuth } from '@/hooks/useAuth';

interface AuthContextType {
  user: any;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithPhone: (phone: string, password: string) => Promise<void>;
  signUpWithPhone: (phone: string, password: string, fullName?: string) => Promise<void>;
  sendOTP: (phone: string) => Promise<void>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  hasRole: (role: 'admin' | 'super_admin') => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useSupabaseAuth();
  
  // Add mock implementations for missing methods
  const signInWithPhone = async (phone: string, password: string) => {
    console.log('Sign in with phone:', phone);
    // Mock implementation
  };
  
  const signUpWithPhone = async (phone: string, password: string, fullName?: string) => {
    console.log('Sign up with phone:', phone);
    // Mock implementation
  };
  
  const sendOTP = async (phone: string) => {
    console.log('Send OTP to:', phone);
    // Mock implementation
  };
  
  const verifyOTP = async (phone: string, otp: string) => {
    console.log('Verify OTP:', phone, otp);
    // Mock implementation
  };
  
  const signInWithGoogle = async () => {
    console.log('Sign in with Google');
    // Mock implementation
  };
  
  const signInWithFacebook = async () => {
    console.log('Sign in with Facebook');
    // Mock implementation
  };

  const extendedAuth = {
    ...auth,
    signInWithPhone,
    signUpWithPhone,
    sendOTP,
    verifyOTP,
    signInWithGoogle,
    signInWithFacebook
  };

  return (
    <AuthContext.Provider value={extendedAuth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
