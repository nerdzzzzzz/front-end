import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@react-native-google-signin/google-signin';
import { configureGoogleSignIn, getCurrentUser, signInWithGoogle, signOutGoogle } from '../lib/google-auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    configureGoogleSignIn();
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userInfo = await getCurrentUser();
      if (userInfo) {
        setUser(userInfo);
      }
    } catch (error) {
      console.log('No user logged in', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (): Promise<boolean> => {
    try {
      const userInfo = await signInWithGoogle();
      
      // Usuário cancelou o login
      if (userInfo.type === 'cancelled') {
        console.log('User cancelled sign in');
        return false;
      }
      
      if (userInfo.data) {
        setUser(userInfo.data as any);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    await signOutGoogle();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
