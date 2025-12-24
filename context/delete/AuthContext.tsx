/*import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@react-native-google-signin/google-signin';
import { configureGoogleSignIn, getCurrentUser, signInWithGoogle, signOutGoogle } from '../lib/google-auth';
import { 
  FirebaseUser, 
  signInWithEmail, 
  signUpWithEmail, 
  signOutFirebase, 
  onAuthStateChanged,
  sendPasswordReset 
} from '../lib/firebase-auth';

// Tipo unificado para usuário (Google ou Firebase)
interface AppUser {
  id: string;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  provider: 'google' | 'email';
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<boolean>;
  signInWithEmailPassword: (email: string, password: string) => Promise<boolean>;
  signUpWithEmailPassword: (email: string, password: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Converte usuário do Google para o formato unificado
const mapGoogleUser = (googleUser: User): AppUser => ({
  id: googleUser.user.id,
  email: googleUser.user.email,
  displayName: googleUser.user.name,
  photoUrl: googleUser.user.photo,
  provider: 'google',
});

// Converte usuário do Firebase para o formato unificado
const mapFirebaseUser = (firebaseUser: FirebaseUser): AppUser => ({
  id: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName,
  photoUrl: firebaseUser.photoURL,
  provider: 'email',
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    configureGoogleSignIn();
    
    // Observa mudanças no estado de autenticação do Firebase
    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
      }
      // Não limpa o user aqui pois pode ser login do Google
    });

    checkGoogleUser();

    return () => unsubscribe();
  }, []);

  const checkGoogleUser = async () => {
    try {
      const userInfo = await getCurrentUser();
      if (userInfo) {
        setUser(mapGoogleUser(userInfo));
      }
    } catch (error) {
      console.log('No Google user logged in', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async (): Promise<boolean> => {
    try {
      const userInfo = await signInWithGoogle();
      
      // Usuário cancelou o login
      if (userInfo.type === 'cancelled') {
        console.log('User cancelled sign in');
        return false;
      }
      
      if (userInfo.data) {
        setUser(mapGoogleUser(userInfo.data as User));
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const handleSignInWithEmailPassword = async (email: string, password: string): Promise<boolean> => {
    try {
      const firebaseUser = await signInWithEmail(email, password);
      setUser(mapFirebaseUser(firebaseUser));
      return true;
    } catch (error: any) {
      console.error('Email sign in error:', error);
      throw error;
    }
  };

  const handleSignUpWithEmailPassword = async (email: string, password: string): Promise<boolean> => {
    try {
      const firebaseUser = await signUpWithEmail(email, password);
      setUser(mapFirebaseUser(firebaseUser));
      return true;
    } catch (error: any) {
      console.error('Email sign up error:', error);
      throw error;
    }
  };

  const handleResetPassword = async (email: string): Promise<void> => {
    await sendPasswordReset(email);
  };

  const handleSignOut = async () => {
    try {
      // Tenta deslogar de ambos os provedores
      await Promise.all([
        signOutGoogle().catch(() => {}),
        signOutFirebase().catch(() => {}),
      ]);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        signInWithGoogle: handleSignInWithGoogle,
        signInWithEmailPassword: handleSignInWithEmailPassword,
        signUpWithEmailPassword: handleSignUpWithEmailPassword,
        resetPassword: handleResetPassword,
        signOut: handleSignOut,
      }}
    >
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
*/