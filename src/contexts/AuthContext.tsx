import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
  AuthError as FirebaseAuthError
} from 'firebase/auth';
import { toast } from 'sonner';

interface AuthContextType {
  user: FirebaseUser | null;
  session: FirebaseUser | null; // For compatibility, session is the same as user in Firebase
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('Attempting to sign up with email:', email);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: fullName,
        });
        console.log('User created successfully:', userCredential.user);
        toast.success('Account created successfully!');
      }

      return { error: null };
    } catch (error) {
      console.error('Sign up failed:', error);
      const firebaseError = error as FirebaseAuthError;
      
      // Provide more specific error messages
      let errorMessage = firebaseError.message || 'Failed to create account';
      
      if (firebaseError.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (firebaseError.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (firebaseError.code === 'auth/network-request-failed') {
        errorMessage = 'Cannot connect to authentication service. Please check your internet connection.';
      }
      
      toast.error(errorMessage);
      return { error: firebaseError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in with email:', email);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        console.log('User signed in successfully:', userCredential.user);
        toast.success('Welcome back!');
      }

      return { error: null };
    } catch (error) {
      console.error('Sign in failed:', error);
      const firebaseError = error as FirebaseAuthError;
      
      // Provide more specific error messages
      let errorMessage = firebaseError.message || 'Failed to sign in';
      
      if (firebaseError.code === 'auth/invalid-credential' || 
          firebaseError.code === 'auth/user-not-found' ||
          firebaseError.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (firebaseError.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled. Please contact support.';
      } else if (firebaseError.code === 'auth/network-request-failed') {
        errorMessage = 'Cannot connect to authentication service. Please check your internet connection.';
      }
      
      toast.error(errorMessage);
      return { error: firebaseError };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      const firebaseError = error as Error;
      toast.error(firebaseError.message || 'Failed to sign out');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset link sent to your email');
      return { error: null };
    } catch (error) {
      const firebaseError = error as FirebaseAuthError;
      
      let errorMessage = firebaseError.message || 'Failed to send reset email';
      
      if (firebaseError.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (firebaseError.code === 'auth/network-request-failed') {
        errorMessage = 'Cannot connect to authentication service. Please check your internet connection.';
      }
      
      toast.error(errorMessage);
      return { error: firebaseError };
    }
  };

  const value = {
    user,
    session: user, // For compatibility with existing code
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
